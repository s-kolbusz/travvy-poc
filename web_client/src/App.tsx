import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/authContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Trips from './pages/Trips';
import Bookings from './pages/Bookings';

import Nav from './components/Navigation/Nav';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <header>
          <Nav />
        </header>
        <main className="flex flex-1">
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/trips">
            <Trips />
          </Route>
          <Route path="/bookings">
            <Bookings />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>
        </main>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
