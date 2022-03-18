import firebase from 'firebase/compat/app';

const authorizedUserEmail = process.env.REACT_APP_AUTHORIZED_EMAIL;

async function doSignIn() {
    const socialProvider = new firebase.auth.GoogleAuthProvider();
    const user = await firebase.auth().signInWithPopup(socialProvider);
    if(user.user.email !== authorizedUserEmail) {
      await doSignOut();
      throw new Error();
    }
}

async function doSignOut() {
  await firebase.auth().signOut();
}

export {
  doSignIn,
  doSignOut
};