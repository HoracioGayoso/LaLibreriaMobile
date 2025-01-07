import auth, { getAuth, fetchSignInMethodsForEmail } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { WEB_CLIENT_ID } from '@env';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
});

const signUp = async (email, password, fullname) => {
    if (!fullname || !email || !password) {
        alert('Please enter data!');
        return;
    }
    try {
        const cred = await auth().createUserWithEmailAndPassword(email.trim(), password);
        const { uid } = cred.user;
        await auth().currentUser.updateProfile({
            displayName: fullname,
        });
        return uid;
    } catch (err) {
        console.error("Sign Up Error:", err.code, err.message);
        alert(`Error: ${err.message}`);
    }
};

const signIn = async (email, password) => {
    if (!email || !password) {
        alert('Please enter data!');
        return;
    }
    try {
        await auth().signInWithEmailAndPassword(email.trim(), password);
        console.log('User signed in with UID:', auth().currentUser.uid);
    } catch (err) {
        console.error("Sign In Error:", err.code, err.message);
        alert(`Error: ${err.message}`);
    }
};

const signOut = async () => {
    try {
        await auth().signOut();
        console.log('User signed out!');
    } catch (err) {
        console.error("Sign Out Error:", err.message);
        alert(`Error: ${err.message}`);
    }
};

const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const signInResult = await GoogleSignin.signIn();
        console.log("signIn Result:", signInResult);
        let idToken = signInResult.data?.idToken;
        console.log("idToken: ", idToken);
        if (!idToken) {
            idToken = signInResult.idToken; // Fallback for older versions
        }
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        return userCredential.user; // Ensure the user object is returned
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        alert(`Error: ${error.message}`);
    }
};

const fetchUserByEmail = async (email) => {
    try {
        const auth = getAuth();
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return methods.length > 0; // Returns true if the user exists
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return false; // Return false on error
    }
};

const getCurrentUser = async () => {
    console.log(auth.CurrentUser, "usuario")
    return auth().CurrentUser; // Devuelve el usuario actual si está autenticado
};
const Auth = {
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    fetchUserByEmail,
    getCurrentUser
};

export default Auth;
