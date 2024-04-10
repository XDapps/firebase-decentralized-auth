// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, computed, makeAutoObservable } from 'mobx';
import { ethers } from 'ethers'; 
import { Buffer } from 'buffer';
import app from '..';
window.Buffer = Buffer;

export interface IWeb3Store {
	chainId: string;
	network: string;
	address: string;
	defaultRPC: string;
}

export class Web3Store implements IWeb3Store {
	chainId = '';
	network = '';
	defaultChainIdHex = '0x13881'
	defaultRPC = 'https://polygon-mumbai-bor.publicnode.com';
	address = "";
	ethersProvider = this._getProvider();

	constructor() {
		makeAutoObservable(this);
	}

	_getProvider(): ethers.JsonRpcProvider | ethers.BrowserProvider {
		if (window.ethereum !== undefined) {
			return new ethers.BrowserProvider(window.ethereum, 'any');
		} else {
			return new ethers.JsonRpcProvider(this.defaultRPC);
		}
	}

	@action initializeWeb3 = async (): Promise<void> => {
		if (window.ethereum) {
			window.ethereum.autoRefreshOnNetworkChange = false;
			await this.setNetworkDetails();
		}
	}
	@computed isConnected = (): boolean => {
		return this.address.length > 0;
	}
	@action setAddress = (address: string): void => {
		this.address = address;
	}
	@action connectWallet = async (): Promise<void> => {
		if (window.ethereum) {
			const tempAccounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			if (tempAccounts && tempAccounts.length > 0 && this.address.toLowerCase() !== tempAccounts[0].toLowerCase()) {
				this.setAddress(tempAccounts[0]);
				app.fb.checkIfUserChanged(tempAccounts[0]);
			}
		}
	}
	@action disconnectWallet = (): void => {
		this.setAddress("");
	}

	@action setChainId = async (): Promise<void> => {
		if (window.ethereum) {
			try {
				this.chainId = await window.ethereum.request({
					method: 'eth_chainId',
				});
				this.network = this.getNetworkName();
			} catch (err) {
				console.error(err);
			}
		}
	}

	@action setNetworkDetails = async (): Promise<void> => {
		await this.setChainId();
		await this.connectWallet();
	}

	signPersonalMessage = async (signingAddress: string, messageToSign: string): Promise<string> => {
		try {
			const msg = `0x${Buffer.from(messageToSign, 'utf8').toString('hex')}`;
			const signature = await window.ethereum.request({
				method: 'personal_sign',
				params: [msg, signingAddress, 'Decentralized Login Phrase'],
			});
			return signature;
		} catch (error) {
			console.log("Error Signing Message", error);
			return '';
		}
	}
	@computed getNetworkName = () => {
		switch (this.chainId) {
			case '0x1':
				return 'Ethereum';
			case '0x32':
				return 'XDC';
			case '0xe':
				return 'Flare';
			case '0x13':
				return 'Songbird';
			case '0x38':
				return 'Binance';
			case '0x89':
				return 'Polygon';
			case '0x13881':
				return 'Mumbai';
			default:
				return 'Unknown';
		}
	};

	windowHasWeb3Wallet = (): boolean => {
		return window.ethereum && window.ethereum.on !== undefined;
	}
}

export const web3Store = new Web3Store();
