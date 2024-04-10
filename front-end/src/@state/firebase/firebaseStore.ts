import { action, makeAutoObservable } from "mobx";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Functions, getFunctions, httpsCallable } from "firebase/functions";
import { Auth, User, getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth';
import { getFirestore, Firestore, getDoc, doc } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../configs/firebaseConfig";
import { sleep } from "../../utils/sleep";
import app from "..";

export interface IFirebaseStore {
	app: FirebaseApp;
	firebaseAppDefined: boolean;
	db?: Firestore;
	auth?: Auth;
	user: User | null;
	functions?: Functions;
}

export class FirebaseStore implements IFirebaseStore {
	app = initializeApp(firebaseConfig);
	db?: Firestore;
	auth?: Auth;
	functions?: Functions;
	user: User | null = null;
	firebaseAppDefined = false;
	userName = "";

	constructor() {
		makeAutoObservable(this);
		this.initializeFB();
	}

	private _setFirebaseAppDefined = () => {
		if (this.app) {
			this.firebaseAppDefined = true;
		}
	}

	userIsLoggedIn(): boolean {
		return this.user !== null;
	}

	getUserObject(): User | null {
		return this.user;
	}

	getLoggedInUid(): string {
		if (this.user) {
			return this.user.uid;
		} else {
			return "";
		}
	}

	checkIfUserChanged(addressToCheck: string): void {
		if (this.user) {
			if (this.user.uid.toLowerCase() !== addressToCheck.toLowerCase()) {
				this.processLogoutRequest();
			}
		}
	}

	@action setUser = (user: User | null): void => {
		this.user = user;
	}

	@action setUserName = (name: string): void => {
		this.userName = name;
	}

	@action initializeFB = async (): Promise<unknown> => {
		while (!this.firebaseAppDefined) {
			await sleep(100);
			if (!this.firebaseAppDefined) {
				if (this.app) {
					this.db = getFirestore(this.app);
					this.auth = getAuth(this.app);
					this.functions = getFunctions(this.app);
					this._startAuthListener();
					this._setFirebaseAppDefined();
					return;
				}
			}
		}
	};


	private _startAuthListener = (): void => {
		if (!this.auth) throw new Error("Auth not defined");
		onAuthStateChanged(this.auth, async (user) => {
			if (user) {
				// User is signed in
				this.setUser(user);
				await this._loadUserName();
			} else {
				// User is signed out
				this.setUser(null);
			}
		});
	};

	private _getLoginToken = async (): Promise<string> => {
		const address = app.web3.address;
		const messageToSign = "Decentralized Login Phrase";
		const messageSignature = await app.web3.signPersonalMessage(
			address,
			messageToSign
		);
		try {
			if (!this.functions) throw new Error("Functions not defined");
			const validateLoginMessage = httpsCallable(this.functions, 'validateSignedLoginMessage');
			const result = await validateLoginMessage({
				address: address,
				signature: messageSignature,
			});
			const validationResult = result.data as Record<string, unknown>;
			const token = validationResult.token as string;
			return token;
		} catch (err) {
			console.error(err);
			return "Error";
		}
	}


	@action processLoginRequest = async (): Promise<unknown> => {
		if (!this.auth) throw new Error("Auth not defined");
		const token = await this._getLoginToken();
		if (token === "error") return console.error("Error getting token");
		try {
			const loginResult = await signInWithCustomToken(this.auth, token);
			const user = loginResult.user;
			this.setUser(user);
			const uid = loginResult?.user?.uid;
			return uid ? uid : "";
		} catch (error) {
			console.error("LOGIN_ERROR", error);
			return "";
		}
	};

	@action processLogoutRequest = async (): Promise<unknown> => {
		if (!this.auth) throw new Error("Auth not defined");
		try {
			signOut(this.auth);
			this.setUser(null);
			window.location.href = "/";
		} catch (err) {
			console.log("LOGOUT_ERROR", err);
		}
		return;
	};

	async _loadUserName(): Promise<void> {
		if (!this.db) throw new Error("DB not defined");
		if (!app.web3.address) throw new Error("Address not defined");
		const docRef = doc(this.db, "users", app.web3.address.toLowerCase());
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				if (data) {
					this.setUserName(data.userName);
				}
			}
		} catch (error) {
			console.error("Error getting document:", error);
		}
	}

	async saveUserName(newUserName: string): Promise<void> {
		if (!this.functions) throw new Error("Functions not defined");
		try {
			this.setUserName(newUserName);
			const updateUserName = httpsCallable(this.functions, 'updateUserName');
			await updateUserName({
				userName: newUserName,
			});
		} catch (err) {
			console.error("Error Saving User Name: ", err);
		}
	}
}
