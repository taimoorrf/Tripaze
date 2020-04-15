import firebase from 'firebase';

export const signIn = (credentials) => {
    // getFirebase is to communicate with our firebase project to sign a use
    return (dispatch, getState, {_, getFirestore}) => {
        // this variable will have a reference to our database
        const firestore = getFirestore();
        var uid;
        firebase
        .auth().signInWithEmailAndPassword(
            credentials.email,  
            credentials.password
        ).then((returnedUser) => {
            uid = returnedUser.user.uid
            return firestore.collection('UserTypes').doc(returnedUser.user.uid).get()
        }).then((doc) => {
            const currProfile = doc.data()
            if (currProfile.userType === "Company") {
                return firestore.collection('Companies').doc(uid).get()
            } else {
                return firestore.collection('Users').doc(uid).get()
            }
        }).then((doc) => {
            const currProfile = doc.data()
            dispatch({ type: 'SIGNIN_SUCCESS', currProfile})
        }).catch((err) => {
            dispatch({type: 'SIGNIN_ERROR', err })
        })
    }
}

export const authProfileLoad = (user) => {
  // getFirebase is to communicate with our firebase project to sign a use
  return (dispatch, getState, {_, getFirestore}) => {
      // this variable will have a reference to our database
      dispatch({ type: 'PROFILE_LOADING' })
      const firestore = getFirestore();
      firestore
      .collection('UserTypes')
      .doc(user.uid)
      .get()
      .then((doc) => {
          const currProfile = doc.data()
          if (currProfile.userType === "Company") {
              return firestore.collection('Companies').doc(user.uid).get()
          } else {
              return firestore.collection('Users').doc(user.uid).get()
          }
      }).then((doc) => {
          const currProfile = doc.data()
          dispatch({ type: 'PROFILE_LOAD_SUCCESS', currProfile})
      }).catch((err) => {
          dispatch({type: 'PROFILE_LOAD_ERROR', err })
      })
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

// newUser contains all the information obtained from the sign up form
export const signUpUser = (newUser) => {
  return (dispatch, getState, { getFirestore }) => {
    var uid;
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        // Note: we are not using add over here like we did for creating trips because we want to assign the id given by firebase auth (i.e. resp.user.uid)
        uid = resp.user.uid;
        return firestore.collection('UserTypes').doc(uid).set({
          userType: 'User',
        });
      })
      .then((resp) => {
        // Note: we are not using add over here like we did for creating trips because we want to assign the id given by firebase auth (i.e. resp.user.uid)
        return firestore.collection('Users').doc(uid).set({
          userName: newUser.userName,
          type: "User"
        });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

// newCompany contains all the information obtained from the sign up form
export const signUpCompany = (newUser) => {
  return (dispatch, getState, { getFirestore }) => {
      var uid;
      const firestore = getFirestore();
      firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password,
      ).then(resp => {
          // Note: we are not using add over here like we did for creating trips because we want to assign the id given by firebase auth (i.e. resp.user.uid)
          uid = resp.user.uid;
          return firestore.collection('UserTypes').doc(uid).set({
              userType: "Company"
          })
      }).then(resp => {
          // Note: we are not using add over here like we did for creating trips because we want to assign the id given by firebase auth (i.e. resp.user.uid)
          return firestore.collection('Companies').doc(uid).set({
              companyName: newUser.companyName,
              contact: newUser.contact,
              type: "Company"
          })
      }).then(() => {
          dispatch({ type: 'SIGNUP_SUCCESS'})
      })
    }
  };