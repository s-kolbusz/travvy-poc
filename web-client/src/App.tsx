import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/authContext';

import Home from './views/Home';
import Login from './views/Login';
import UserLogin from './views/Login/UserLogin';
import Administration from './views/Login/Administration';
import Trips from './views/Trips';
import Bookings from './views/Bookings';

import Nav from './components/navigation';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/login" exact>
          <header>
            <Nav />
          </header>
          <main className="flex flex-1">
            <Login />
          </main>
        </Route>
        <Route path="/trips">
          <header>
            <Nav />
          </header>
          <main className="flex flex-1">
            <Trips />
          </main>
        </Route>
        <Route path="/bookings">
          <header>
            <Nav />
          </header>
          <main className="flex flex-1">
            <Bookings />
          </main>
        </Route>

        <Route path="/" exact>
          <header>
            <Nav />
          </header>
          <main className="flex flex-1">
            <Home />
          </main>
        </Route>

        <Route path="/login/administration">
          <Administration />
        </Route>
        <Route path="/login/user">
          <UserLogin />
        </Route>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
