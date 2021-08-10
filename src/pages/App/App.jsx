import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import * as footballService from '../../utilities/football-service'
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import HomePage from '../HomePage/HomePage'
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [id, setId] = useState(2021);
  
  return (
    <main className="App">
        <>
          <NavBar user={user} setUser={setUser} setId={setId}/>
          <Switch>
            <Route path="/orders/new">
              <NewOrderPage />
            </Route>
            <Route path="/">
              <HomePage id={id}/>
            </Route>
            {/* <Redirect to="/home" /> */}
          </Switch>
        </>
        {/* <AuthPage setUser={setUser} /> */}
      
    </main>
  );
}
