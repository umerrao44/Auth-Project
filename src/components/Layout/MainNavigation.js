import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import classes from './MainNavigation.module.css';
import { useDispatch } from 'react-redux/es/exports';
import { tokenFecth } from '../../reduxSetup/tokenSlice';

const MainNavigation = () => {
  // let token = useSelector((state) => state.token.token)
  let token =localStorage.getItem("token")
  console.log('token in main',token)
  const dispatch = useDispatch()
  console.log('token in selctor===>',token)
  const logoutHandler = ()=>{
dispatch(tokenFecth(token =""))
localStorage.clear()
  }
//   let token =localStorage.getItem("token")
// console.log('token in appjs==>',token)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!token &&
          <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {token &&
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
}
{token &&
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
