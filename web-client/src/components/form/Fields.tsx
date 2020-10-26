import React from 'react';

type InputProps = { label: string } & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        type={props.type}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

{
  /* 
  <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
Password
</label>
<input
className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
id="password"
type="password"
placeholder="******************"
/>
<p className="text-red-500 text-xs italic">Please choose a password.</p> 
*/
}
