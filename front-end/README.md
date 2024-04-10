# Decentralized Auth React

This is the React front-end of a working example demonstrating how to use signed messages with Firebase auth to manage login credentials in a decentralized way.

[Live Demo](https://decentralized-auth-1b3f3.web.app/){:target="_blank"}
*Demo may run slow on first call due to function cold starts.

## Front-End Setup

1. Update your project config in the src/configs/firebaseConfig.ts file.

```ts
export const firebaseConfig = {
    apiKey: "YOUR_CONFIG_DATA",
    authDomain: "YOUR_CONFIG_DATA",
    projectId: "YOUR_CONFIG_DATA",
    storageBucket: "YOUR_CONFIG_DATA",
    messagingSenderId: "YOUR_CONFIG_DATA",
    appId: "YOUR_CONFIG_DATA"
};
```

3. Install Dependencies

```ts
npm install
or 
yarn
```

4. Run Locally

```
npm run dev
```

## Deploy with Firebase Hosting

1. Install Firebase Tools

```ts
npm install -g firebase-tools
```

2. Initialize Hosting

```
firebase init hosting
```

3. Deploy

```ts
firebase deploy --only hosting
```

## Note
Backend cloud functions repository must also be deployed and configured for this to work properly.

## Security Rules

Firebase security rules should be configured so that users may only read their own user record(if logged in).

Here is an example on how you'd structure security rules if you wanted to allow an authenticated user to update their own data in a collection named "profiles".

```ts
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}{     
    allow read: if userIDMatches(userId) == true;
    }
    match /profiles/{userId}{     
    allow create: if userIDMatches(userId) == true;
    allow read: if userIDMatches(userId) == true;
    allow update: if userIDMatches(userId) == true;
    allow delete: if false;
    }   
  }    
      
  function userIDMatches(userId){
    return request.auth.uid == userId;
  }
}
```
