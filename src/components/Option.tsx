import React, { ChangeEvent } from 'react';

type Input = "checkbox" | "text"

interface OptionProps {
  title: string
  name: string
  type: Input
  value?: string
  checked?: boolean
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Option = ({title, type, checked, name, value, handleOnChange}: OptionProps): JSX.Element => (
  <div className="flex justify-between items-center p-2">
    <p>{title}</p>
    {
      (checked !== undefined) ?
      (
        <input 
        type={type}
        name={name}
        checked={checked}
        onChange={handleOnChange}
        className="form-tick appearance-none h-6 w-6 bg-indigo-600 rounded-md 
        hover:text-indigo-600 checked:bg-indigo-600 checked:text-indigo-600 checked:border-transparent 
        focus:outline-none focus:text-indigo-600 focus:border-transparent focus:ring-0 focus:ring-transparent" 
      />
      )
      :
      (
        <input 
        type={type}
        name={name} 
        value={value} 
        onChange={handleOnChange}
        className="p-2 w-2/12 rounded-md bg-indigo-400 placeholder-purple-700" 
      />
      )
    }
  </div>
);

export default Option;