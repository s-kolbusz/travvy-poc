import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Trips from './pages/Trips';
import Bookings from './pages/Bookings';

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
