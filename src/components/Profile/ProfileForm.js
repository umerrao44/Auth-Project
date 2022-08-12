import classes from './ProfileForm.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ProfileForm = () => {
const [enterPassword,setEnterPassword] = useState('')
const token = useSelector((state)=>state.token.token)
const history = useHistory()
const submitHandler = (e)=>{
  e.preventDefault()
  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDqs13nOkobtFRvUiAlS6XjdcR04lmPqOY', 
  {
    idToken:token,
    password: enterPassword,
    returnSecureToken: false
  })
  .then((response) =>{
    // setIsLoading(false)
    console.log('response=========>', response);
    history.replace('/')
    
  })
  .catch( (error)=> {
    console.log(error);
    // setIsLoading(false)
    alert(error.message)

  });
}


  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} onChange={(e)=>setEnterPassword(e.target.value)} />
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
