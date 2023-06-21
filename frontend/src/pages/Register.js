import React,{useState} from 'react'
import "./styles.css"
import AddProfile from "../images/AddProfile.jpg";
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth,db} from "../Firebase.js"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useNavigate} from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
  const navigate=useNavigate();
//const storage = getStorage();
  const handlesubmit =async(e)=>{
  e.preventDefault();
  const displayName=e.target[0].value;
  const email=e.target[1].value;
  const password=e.target[2].value;
  const repassword=e.target[3].value;
  let file=e.target[4].files[0];
  
  console.log(file)
  if(repassword!==password)
    alert("Passwords entered Dont match");

   else {

try{
  //create a new username
  const user=await createUserWithEmailAndPassword(auth, email, password)
alert("all fine")

  const storage = getStorage();
  const metadata = {
    contentType: 'image/jpeg'
  };
  
  const date = new Date().getTime();
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, `${displayName + date}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;

    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateProfile(user.user,{  displayName,
        photoURL: downloadURL,

      })
      console.log('File available at', downloadURL);
//user
      await setDoc(doc(db,"users",user.user.uid),{
        uid:user.user.uid,
        displayName,
        email,
        photoURL: downloadURL
      })

      navigate('/home')
//chats of user
      await setDoc(doc(db,"userChats",user.user.uid),{
      })





    });
  }
);
;
}
catch(err)
{
  alert(err.message)
}

   } 
  }
 
  
  return (
    <div>
        <div className="registerbox">
            
            
            <form className="form" onSubmit={handlesubmit}>
                  <div className="formcomponent">
                  <input type="text" placeholder="UserName" />
                  </div>
                <div className="formcomponent">
                <input type="email" placeholder="email" />
                </div>
                <div className="formcomponent">
                <input type="password" placeholder="Enter Your Password" />
                </div>
                <div className="formcomponent">
                <input type="password" placeholder="Confirm Password" />
                </div>
                 <div className="formcomponent imagefile">
                   
                 <input style={{display:'none'}}type="file" id="file"/><label htmlFor='file'>
                 <div className="inputimg">
                 <img src={AddProfile}  alt=""/>
                        </div>
                    <div className="inputname">
                    Profile Image
                    </div>
                   
                    </label>
                 </div>
                <div className="formcomponent">
                <button>Sign up</button>
                </div>
                
            </form>
            <p onClick={()=>navigate('/login')}>Already Have an Account ? Login</p>
            
        </div>
      
    </div>
  )
}

export default Register
