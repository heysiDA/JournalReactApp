import {types} from "../types/types";
import {firebase, googleAthProvider} from "../firebase/firebase-config";
import {finishLoading, startLoading} from "./ui";

export const startLoginUser = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user})=> {
                dispatch(finishLoading());
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch( e => {
            console.log(e);
            dispatch(finishLoading());
        });
    }
}

export const startRegisterUser = (email, password, name) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({user})=> {
                await user.updateProfile({displayName: name});
                dispatch(finishLoading());
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch( e => {
            console.log(e);
            dispatch(finishLoading());
        });
    }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
      firebase.auth().signInWithPopup(googleAthProvider)
          .then( ({user})=> {
              dispatch(
                  login(user.uid, user.displayName)
              )
       }).catch( e => console.log(e));
  }
}

export const login = (uid, displayName) => ({
      type: types.login,
      payload: {
          uid,
          displayName
      }
});

export const startLogout = () => {
  return async (dispatch) => {
      await firebase.auth().signOut();
      dispatch(logout());
  }
}

export const logout = () => ({
    type: types.logout
});
