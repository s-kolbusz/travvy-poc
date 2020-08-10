import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold">Home page</h1>
      <div className="flex flex-row space-x-4">
        <Link
          to="/login"
          className="text-xl font font-semibold text-blue-700 hover:underline hover:text-blue-500 transition-color duration-300"
        >
          Login!
        </Link>

        <Link
          to="/trips"
          className="text-xl font font-semibold text-blue-700 hover:underline hover:text-blue-500 transition-color duration-300"
        >
          Trips
        </Link>
        <Link
          to="/bookings"
          className="text-xl font font-semibold text-blue-700 hover:underline hover:text-blue-500 transition-color duration-300"
        >
          Bookings
        </Link>
      </div>
    </div>
  );
}
