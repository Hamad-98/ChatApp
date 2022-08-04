import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase.config";
import Login from "../pages/login";
import Loading from "../components/Loading";
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const userCollectionRef = collection(db, "user");

  useEffect(() => {
    const addUserToDB = async () => {
      if (user) {
        const id = user.uid;
        const docRef = doc(db, "user", id);

        // create a doc, if one already exists just edit the laseSeen
        await setDoc(
          docRef,
          {
            name: user.displayName,
            email: user.email,
            lastSeen: serverTimestamp(),
            photoURL: user.photoURL,
          },
          { merge: true }
        );
      }
    };

    addUserToDB();
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
