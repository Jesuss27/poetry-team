import React from 'react'
import {useEffect,useState} from "react"
import { getDocs } from "firebase/firestore"
import {usersCollectionRef} from "../firestore/firebase"
import { useDispatch,useSelector } from 'react-redux'
import {setUsersArray, selectUsersArray} from "../slices/usersSlice"



function Profile() {
  const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        const getUsers = async () =>{
            const data = await getDocs(usersCollectionRef)
            const arr = data.docs.map((doc)=> ({...doc.data(),id:doc.id}))
            dispatch(setUsersArray(arr))
        }
        getUsers()
        setIsLoaded(true)


    },[])
    const usersArray = useSelector(selectUsersArray)
   
    
    
    

  return (
    <div>
      { isLoaded &&
      <div>
        <h3>Profile</h3>
        {
          usersArray.map((user:any,i:number) =>{
            return(
              <div key={i}>
                <h3 >{user.name}</h3>
              </div>
            )
          })
        }
      </div>

    }
      
    </div>
  )
}

export default Profile