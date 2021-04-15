import firebase from 'firebase';
var firebaseui = require('firebaseui');

const firebaseConfig = {
  apiKey: 'AIzaSyDVif7bF3L4aCVpkq62gcAfnhCusfn3BQM',
  authDomain: 'fitter-7c869.firebaseapp.com',
  projectId: 'fitter-7c869',
  storageBucket: 'fitter-7c869.appspot.com',
  messagingSenderId: '165182432628',
  appId: '1:165182432628:web:a0703658d6be3966cb3821',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
  },
});

export default firebase;
