import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useDispatch } from 'react-redux'
// import { selectUserEmail,selectUserName } from '../slices/userSlice'
import {useSelector} from "react-redux"
import { set } from 'immer/dist/internal'
import { setUserData, selectUserName,setSignOutUser } from '../slices/userSlice'
import { userAgent } from 'next/server'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import Profile from "../components/Profile"
//import firebase authentication
import {auth,provider, usersCollectionRef} from "../firestore/firebase"
import { addDoc } from 'firebase/firestore'




const Home: NextPage = () => {
  // const userName = useSelector(selectUserName)
  const dispatch = useDispatch()
  
  const userName = useSelector(selectUserName)
 

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(setSignOutUser())
    }).catch((err:any) => alert(err.message))

  }

  const handleSignIn = () => {
    signInWithPopup(auth,provider)
    .then((result) =>{
      const credential = GoogleAuthProvider.credentialFromResult(result)
      dispatch(setUserData({
        userName:result.user.displayName,
        userEmail:result.user.email
      }))
      const createUser = async () => {
        await addDoc(usersCollectionRef, {
          name:result.user.displayName,
          email:result.user.email
        })
      }
      createUser()


    })

  }

  console.log(userName)

  return (
    <div className={styles.container}>
      <h1>Hello</h1>

      {
        userName ? (
        <div>
          <Profile /> 
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )



      }
      
    </div>
  )
}

export default Home
