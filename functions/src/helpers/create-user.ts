import * as admin from "firebase-admin";

export const createNewUser = async (userAddress: string, db: admin.firestore.Firestore): Promise<void> => {
	const userRef = db.collection("users").doc(userAddress.toLowerCase());
	await userRef.set({
		uid: userAddress.toLowerCase(),
		userName: "",
	});
};

export const userExists = async (userAddress: string, db: admin.firestore.Firestore): Promise<boolean> => {
	const userRef = db.collection("users").doc(userAddress.toLowerCase());
	const user = await userRef.get();
	return user.exists;
};

export const createUserIfNotExist = async (userAddress: string, db: admin.firestore.Firestore): Promise<void> => {
	const exists = await userExists(userAddress, db);
	if (!exists) {
		await createNewUser(userAddress, db);
	}
	return;
};


