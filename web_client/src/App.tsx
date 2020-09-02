import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/authContext';

import Home from './views/Home';
import Login from './views/Login';
import Trips from './views/Trips';
import Bookings from './views/Bookings';

import Nav from './components/navigation';

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
