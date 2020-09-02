import React from 'react';

import { Input } from 'travvy/components/form/Fields';
import { useAuthContext } from 'travvy/context/authContext';

const Login = () => {
  const [error, setError] = React.useState<{ field: string; message: string }>();
  const [values, setValues] = React.useState<{ email: string; password: string }>({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = React.useState<{ isAuth: boolean; user?: string }>({ isAuth: false });

  const context = useAuthContext();

  const submitHandler = () => {
    setError(undefined);

    if (values.email.trim().length === 0) {
      setError((error) => ({ ...error, field: 'email', message: 'Please fill your email' }));
      return;
    }

    if (values.password.trim().length === 0) {
      setError((error) => ({ ...error, field: 'password', message: 'Please fill your password' }));
      return;
    }

    const requestBody = {
      query: `
        query {
          login(email: "${values.email}", password: "${values.password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    };

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Fetching from graphql failed!');
        }

        return res.json();
      })
      .then((res) => {
        if (!res.data && res.errors) {
          console.error(res.errors);
          setError({ field: 'form', message: res.errors[0].message });
          return;
        }

        const id = res.data.login.token;
        const token = res.data.login.userId;

        if (id && token) {
          setLoggedIn({ isAuth: true, user: res.data.login.userId });
          context.user = { id, token };
        }

        console.log(context);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 text-shadow-dark">
      <h1 className="text-6xl text-blue-500 font-bold"> TraVVy </h1>
      <form
        className="bg-gray-100 shadow-lg rounded px-8 pt-6 pb-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <Input
          label="E-mail"
          type="text"
          placeholder="E-mail"
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
        <Input
          label="Password"
          type="password"
          placeholder="******************"
          onChange={(e) => {
            setValues({ ...values, password: e.target.value });
          }}
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
      {loggedIn.isAuth && <div className="text-5xl text-green-700 font-extrabold">User {loggedIn.user} loged in!</div>}
      {!loggedIn.isAuth && error && <div className="text-5xl text-red-700 font-extrabold">{error.message}</div>}
    </div>
  );
};

export default Login;
