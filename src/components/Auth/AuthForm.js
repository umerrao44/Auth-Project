import { useState } from 'react';
import { useDispatch } from 'react-redux'
import classes from './AuthForm.module.css';
import axios from 'axios';
import { tokenFecth } from '../../reduxSetup/tokenSlice';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [enterEmail, setEnterEmail] = useState('')
  const [enterPassword, setEnterPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e)=>{
    e.preventDefault()
    console.log("in function ")
    setIsLoading(true)
    if(isLogin){
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqs13nOkobtFRvUiAlS6XjdcR04lmPqOY', 
      {
        email: enterEmail,
        password: enterPassword,
        returnSecureToken: true
      })
      .then((response) =>{
        setIsLoading(false)
        // console.log('response=========>', response.data.idToken);
        let token = response.data.idToken
        // console.log("token=>>",token)
        dispatch(tokenFecth(token))
        setEnterEmail('')
        setEnterPassword('')
        history.replace('/')
        
        
        // console.log('enterEmail ==>>',enterEmail)
      })
      .catch( (error)=> {
        console.log(error);
        setIsLoading(false)
        alert(error.message)
    
      });
    }else{
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqs13nOkobtFRvUiAlS6XjdcR04lmPqOY', 
      {
        email: enterEmail,
        password: enterPassword,
        returnSecureToken: true
      })
      .then((response) =>{
        setIsLoading(false)
        // console.log('response=========>', response);
        setEnterEmail('')
        setEnterPassword('')
      })
      .catch( (error)=> {
        console.log(error);
        setIsLoading(false)
        alert(error.message)
      
      });
    }

  
  }
// console.log(enterEmail,enterPassword,'enterEmail, EenterPassword')
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required 
           onChange={(e)=>setEnterEmail(e.target.value)}
           value={enterEmail}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  
          onChange={(e)=>setEnterPassword(e.target.value)}
          value={enterPassword}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading  && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
