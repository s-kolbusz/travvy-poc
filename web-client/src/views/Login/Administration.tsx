import React from 'react';
import { Link } from 'react-router-dom';

const Administration = () => {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="flex flex-col p-8 text-primary bg-light">
        <Link to="/">
          <h1 className="relative text-secondary uppercase text-8xl">
            <span className="absolute font-semibold text-primary top-1 left-1.5">viaggio</span>
            <span className="absolute font-semibold">viaggio</span>
          </h1>
        </Link>
        <div className="flex-1 flex flex-col justify-center text-5xl leading-tight">
          <div>
            Zaloguj sie w{' '}
            <div className="relative inline-block h-14 w-40 leading-relaxed">
              <span className="absolute text-primary top-0.5 left-1">viaggio</span>
              <span className="absolute text-secondary top-0">viaggio</span>
            </div>
            ,
          </div>
          <p>i przezyj swoja pierwsza przygode</p>
        </div>
        <div className="flex flex-row">
          <div />
          <a className="flex-1 text-center text-xl" href="#">
            Polityka prywatnosci
          </a>
          <div className="text-sm">2020 viaggio</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-12 bg-primary">
        <div className="flex flex-col space-y-16">
          <h2 className="text-5xl text-light">Witaj ponownie</h2>
          <form className="flex flex-col space-y-9 pl-11">
            <input
              type="text"
              placeholder="Login"
              className="appearance-none bg-primary text-4xl text-light placeholder-light focus:placeholder-secondary focus:text-secondary hover:text-secondary border border-b border-t-0 border-r-0 border-l-0 foucs:border-l-0 foucs:border-t-0 foucs:border-r-0 outline-none border-light"
            />
            <input
              type="password"
              placeholder="Haslo"
              className="appearance-none bg-primary text-4xl text-light placeholder-light focus:placeholder-secondary focus:text-secondary hover:text-secondary border border-b border-t-0 border-r-0 border-l-0 foucs:border-l-0 foucs:border-t-0 foucs:border-r-0 outline-none border-light"
            />
            <div className="flex flex-row justify-between items-center">
              <a href="#" className="text-4xl text-secondary hover:opacity-75 underline cursor-pointer">
                zarejestruj
              </a>
              <button className="bg-secondary hover:opacity-75 text-3xl text-primary cursor-pointer rounded-lg px-7 py-3">
                zaloguj
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Administration;
