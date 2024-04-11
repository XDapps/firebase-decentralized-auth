# Decentralized Auth Firebase Cloud Functions

This is the cloud functions back-end of a working example demonstrating how to use signed messages with Firebase auth to manage login credentials in a decentralized way.

[Live Demo](https://decentralized-auth-1b3f3.web.app/)
*Demo may run slow on first call due to function cold starts.

## Back-End Setup

1. Update your service account permissions.
2. [Google IAM](https://console.cloud.google.com/projectselector2/iam-admin)
3. Click on the project you created.
4. Add the Service Account Token Creator Role to the App Engine default service account.
5. Init functions

```shell
firebase init functions
```

Install dependencies.

```shell
cd functions
npm install
```

Deploy functions

```shell
firebase deploy --only functions
```
