import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { getTokenFromSignedMessage } from "./helpers/get-token-from-signed-message";
import { createUserIfNotExist } from "./helpers/create-user";

admin.initializeApp();
const db = admin.firestore();

exports.validateSignedLoginMessage = functions.https
	.onCall(async (data) => {
		const signedMessageData = "Decentralized Login Phrase";
		const signingAddress = data.address;
		const signature = data.signature;
		const token = await getTokenFromSignedMessage(signingAddress, signedMessageData, signature);
		if (token === "Not Valid") {
			return {
				token: "error",
				error: "Not Valid Signature",
			};
		} else {
			await createUserIfNotExist(signingAddress, db);
			return {
				token: token,
			};
		}
	});

exports.updateUserName = functions.https.onCall(async (data, context) => {
	// Check if the user is authenticated
	if (!context.auth) {
		// Throwing an HTTPs error since it's an HTTPs callable function
		throw new functions.https.HttpsError(
			"unauthenticated",
			"The function must be called while authenticated."
		);
	}
	// Extract the user uid from the context
	const uid = context.auth.uid.toLowerCase();
	const user = await db.collection("users").doc(uid).get();
	if (!user.exists) {
		return {
			error: "User does not exist",
		};
	}
	// Save the new user name
	await db.collection("users").doc(uid).update({
		userName: data.userName,
	});
	return {
		success: true,
	};
});
