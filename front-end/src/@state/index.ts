
import { makeAutoObservable } from "mobx";
import { FirebaseStore } from "./firebase/firebaseStore";
import { Web3Store } from "./web3/web3Store";

class AppState {
	fb: FirebaseStore;
	web3: Web3Store;

	constructor() {
		makeAutoObservable(this);
		this.fb = new FirebaseStore();
		this.web3 = new Web3Store();
	}
}

const app = new AppState();
export default app;
