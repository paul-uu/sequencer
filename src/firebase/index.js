import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './firebaseConfig';

firebase.initializeApp(config);

// init firestore db
firebase.firestore().settings({ timestampsInSnapshots: true }); 

export default firebase;