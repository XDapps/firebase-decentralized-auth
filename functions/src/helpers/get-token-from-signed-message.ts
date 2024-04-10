import { recoverPersonalSignature } from "eth-sig-util";
import * as admin from "firebase-admin";

export const getTokenFromSignedMessage = async (address: string, signedMessage: string, signature: string): Promise<string> => {
	const token = "Not Valid";
	if (signatureIsValid(address, signedMessage, signature)) {
		try {
			//  Get custom Firebase Auth Token
			const token = await admin.auth().createCustomToken(address);
			return token;
		} catch (error) {
			console.log("Error Getting Token From Signed Message: ", error);
			return token;
		}
	}
	return token;
};

const signatureIsValid = (address: string, signedMessage: string, signature: string): boolean => {
	const recoveredAddr = recoverPersonalSignature({
		data: signedMessage,
		sig: signature,
	});
	return recoveredAddr.toLowerCase() === address.toLowerCase();
};
