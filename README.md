# Decentralized Auth Using Firebase & React

This is a demo application showing how to use signed messages with Firebase auth to manage login credentials in a decentralized way.

[Live Demo](https://decentralized-auth-1b3f3.web.app/)
*Demo may run slow on first call due to function cold starts.

It uses a React front-end to allow users to sign messages using a web3 browser wallet and then calls a Firebase cloud function to validate the signature and return login credentials.

> [!NOTE]
> There is a hard coded variable in the front and and back end with a value of "Decentralized Login Phrase". Think of this as a seed, you may change it at any time, but it needs to be the same in both places.
>
> The reason you'd want to change this is because a signed message's signature will always remain the same if the message being signed is the same, so you should rotate the login phrase regularly.
> [!IMPORTANT]
> You MUST configure the service account permissions via the instructions in the back-end ReadMe file.

## Front-End

The front-end is built in React and requires you to set the firebase project configuration. See the front-end ReadMe file for instructions.

## Back-End

The back-end is built in Typescript using Firebase cloud functions. The back-end requires you to configure service account permissions. See back-end ReadMe file for instructions.

## Setup

1. Create a Firebase project. [Tutorial](https://www.youtube.com/watch?v=SAwxUq0kiZY)
2. Deploy the back-end (Firebase Functions) per instructions in functions ReadMe file.
3. Deploy the front-end per instructions in the front-end ReadMe file.
