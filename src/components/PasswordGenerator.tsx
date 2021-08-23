import React, { ChangeEvent, useRef, useState } from 'react';
import GeneratorOptions from './GeneratorOptions'
import { PasswordOptions } from '../utils/interfaces'
import { generatePassword, copyToClipboard, passwordStrength } from '../utils/password';
import clipboardIcon from '../assets/clip.svg'
import infoIcon from '../assets/information.svg'

const defaultOptions: PasswordOptions = {
  passwordLength: "20",
  uppercaseLetters: true,
  lowercaseLetters: true,
  numbers: true,
  symbols: false
}


const PasswordGenerator = (): JSX.Element => {

  const [generatedPassword, setPassword] = useState<string>('')
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions)
  const [copied, setCopied] = useState<boolean>(false)
  const [score, setScore] = useState<number>(-1)
  const [riskPhrase, setRiskPhrase] = useState({shortRisk: '', longRisk: ''})
  const [seeInfo, setSeeInfo] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const passwordInput = useRef<HTMLInputElement>(null)


  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { target } = e
    const { name } = target

    if (name !== "passwordLength") {
      setOptions({
        ...options,
        [name]: !options[name as keyof PasswordOptions]
      })
    } else {
      setOptions({
        ...options,
        [name]: target.value
      })
    }
  }

  const generateNewPassword = (): void => {
    try {
      setError('')
      const pwd = generatePassword(options.lowercaseLetters, options.uppercaseLetters, options.numbers, options.symbols, parseInt(options.passwordLength));

      setPassword(pwd)
      const [score, risk, warns] = passwordStrength(pwd)
      setScore(score)
      setRiskPhrase({shortRisk: risk, longRisk: warns})
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }

  }

  const handleCopyPassword = ():void => {
    if (!generatedPassword) {
      return;
    }
    if (passwordInput.current) {
      copyToClipboard(passwordInput?.current)
      setCopied(true)
      setTimeout((): void => {
        setCopied(false)
      }, 3000)
    }
  }


  return (
    <div className="md:w-1/2 bg-indigo-500 shadow-lg rounded-md  w-3/4 mx-auto p-2">
      <h2 className="text-center text-xl">Generate your password</h2>
      <div className="md:w-1/2 mx-auto my-2">
        <div className="flex">
          <input 
            type="text" 
            placeholder="Your password gonna be here" 
            className="p-2 w-full rounded-md bg-indigo-400 placeholder-purple-700" 
            readOnly
            value={generatedPassword}
            ref={passwordInput}
          />
          <button type="button" onClick={handleCopyPassword}>
            <img height="32" width="32" src={clipboardIcon} />
          </button>
        </div>
        {
          copied &&
          <p className="text-center text-white font-bold fade-in">Copied!</p>
        }
        {
            error && <p className="text-center text-red-500 font-bold fade-in">{error}</p>
        }
        {
          generatedPassword !== '' &&
          <>
            <div className="my-2 h-2  bg-white rounded-md">
              <div className={`password-strength ${score >= 0 && `password-strength-${score}`} `}></div>
            </div>
            <div className="flex justify-center">
                <p className={`strength-${score}`}>{riskPhrase.shortRisk}</p>
                <button type="button" onClick={() => {setSeeInfo(!seeInfo); setTimeout(() => setSeeInfo(false), 3000)}}>
                  <img src={infoIcon} height="18" width="18" />
                </button>
                {seeInfo &&
                  <span className={`md:-mt-8 md:ml-20 absolute tooltip rounded shadow-lg p-1 opacity-90 strength-${score} -mt-10`}>{riskPhrase.longRisk}</span>}
            </div>
          </>
        }
        <GeneratorOptions
          options={options}
          handleOptionChange={handleOptionChange}
        />
        <button 
          onClick={generateNewPassword}
          type="button" 
          className="md:w-full md:m-2 md:text-xl w-3/4 block mx-auto bg-indigo-600 p-2 font-bold rounded-md hover:bg-gray-200 hover:text-gray-800"
        >
          Generate
        </button>
      </div>
    </div>
  )
};

export default PasswordGenerator