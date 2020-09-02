import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className="flex flex-row space-x-4 appearance-none">
        <li className="text-xl font-semibold text-blue-500 hover:text-blue-800 hover:underline transition-color duration-300">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-xl font-semibold text-blue-500 hover:text-blue-800 hover:underline transition-color duration-300">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="text-xl font-semibold text-blue-500 hover:text-blue-800 hover:underline transition-color duration-300">
          <NavLink to="/trips">Trips</NavLink>
        </li>
        <li className="text-xl font-semibold text-blue-500 hover:text-blue-800 hover:underline transition-color duration-300">
          <NavLink to="/bookings">Booking</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
