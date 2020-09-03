import * as admin from 'firebase-admin';

const serviceAccount: string | admin.ServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT || require("travvy-mock-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://travvy-mock.firebaseio.com'
});

export default admin;