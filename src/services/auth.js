import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { WEB_CLIENT_ID } from '@env';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
});


const signUp = (email, password, fullname) => {
    if (!fullname || !email || !password) {
        alert('Please enter data!');
        return;
    }
    return auth()
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(cred => {
            const { uid } = cred.user;
            auth().currentUser.updateProfile({
                displayName: fullname,
            });
            return uid;
        })
        .catch(err => alert(err.code, err.message));
};

const signIn = (email, password) => {
    if (!email || !password) {
        alert('Please enter data!');
        return;
    }
    return auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(() => {
            console.log(auth().currentUser.uid);
        })
        .catch(err => alert(err.code, err.message));
};

const signOut = () => {
    return auth()
        .signOut()
        .then(() => console.log('User signed out!'));
};

const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        return userCredential.user; // Asegúrate de retornar el usuario aquí
    } catch (error) {
        console.error("Error during Google sign-in:", error); // Agregar este log
        alert(error.message);
    }
};
const fetchUserByEmail = async (email) => {
    const auth = getAuth();
    const methods = await fetchSignInMethodsForEmail(auth, email);

    // Si hay métodos de inicio de sesión para el correo electrónico, significa que el usuario ya existe
    return methods.length > 0; // Devuelve verdadero si el usuario existe
};
const Auth = {
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    fetchUserByEmail
};

export default Auth;
