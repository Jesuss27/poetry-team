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
import { addDoc, getDoc, getDocs } from 'firebase/firestore'




const Home: NextPage = () => {
  // const userName = useSelector(selectUserName)
  const dispatch = useDispatch()
  
  const userName = useSelector(selectUserName)
 

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(setSignOutUser({
        name:null,
        email:null,
      }))
    }).catch((err:any) => alert(err.message))

  }

  const handleSignIn = () => {

    const checkUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      const arr = data.docs.map((doc) => ({
        ...doc.data(),
      }))
      return arr      
    }
    
    signInWithPopup(auth,provider)
    .then((result) =>{
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const userEmail = result.user.email
      //TODO check users to see if user is already in database
      const arr = checkUsers()
      arr.then((res) =>{
        //scan arr returned as a promise
        const isUser = res.find(user => user.email === userEmail)
        if(isUser){
          // logic for if the user already exists
          console.log(`${userEmail} already exists`)
          //set active userData
          dispatch(setUserData({
            userName:result.user.displayName,
            userEmail:result.user.email
          }))

        }else{
          //logic for a new user
          console.log(`this is a new user`)
          //add user to firestore db
          const createUser = async () => {
            await addDoc(usersCollectionRef, {
              name:result.user.displayName,
              email:result.user.email
            })
            //set active userData
            dispatch(setUserData({
              userName:result.user.displayName,
              userEmail:result.user.email
            }))
          }

          createUser()
        }
      })
    })

  }

  return (
    <div className={styles.container}>
      <h1>Poetry Team</h1>

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
