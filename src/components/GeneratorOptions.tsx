import React, { ChangeEvent } from 'react';
import { PasswordOptions } from '../utils/interfaces';
import Option from './Option';

interface Props {
  options: PasswordOptions
  handleOptionChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const GeneratorOptions = ({ options, handleOptionChange }: Props): JSX.Element => {
  
  return (
    <div className="flex flex-col mx-auto">
      <Option 
        title="Password Length"
        name="passwordLength"
        type="text"
        value={options.passwordLength}
        handleOnChange={handleOptionChange}
      />
      <Option 
        title="Include uppercase letters"
        name="uppercaseLetters"
        type="checkbox"
        checked={options.uppercaseLetters}
        handleOnChange={handleOptionChange}
      />
      <Option 
        title="Include lowercase letters"
        name="lowercaseLetters"
        type="checkbox"
        checked={options.lowercaseLetters}
        handleOnChange={handleOptionChange}
      />
      <Option 
        title="Include numbers"
        name="numbers"
        type="checkbox"
        checked={options.numbers}
        handleOnChange={handleOptionChange}
      />
      <Option 
        title="Include symbols"
        name="symbols"
        type="checkbox"
        checked={options.symbols}
        handleOnChange={handleOptionChange}
      />
    </div>
  )

}

export default GeneratorOptions;