import { Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux'




function App() {
//   const [token,setToken] = useState('')
const token = useSelector((state)=>state.token.token)
// setToken(tokena)
// console.log('type===>',typeof token)

// let token =localStorage.getItem("token")
// console.log('token in appjs==>',token)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        
        <Route path='/auth'>
          <AuthPage />
        </Route>
        
        <Route path='/profile'>
        {token && <UserProfile />}
        {!token && <Redirect to='auth' /> }
        </Route>
        <Route path='*'>
<Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
