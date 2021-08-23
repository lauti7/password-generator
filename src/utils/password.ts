import zxcvbn from 'zxcvbn';
import { PasswordScorePhrase } from './constants';

const PASSWORD_KEY_LS = 'generated_passwords'

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

function getValueFromType(type: string): string | number  {
  switch (type) {
    case 'lower':
      return getRandomLower()
    case 'upper':
      return getRandomUpper()
    case 'number':
      return getRandomNumber()
    case 'symbol':
      return getRandomSymbol()
    default:
      return ''
  }
}

export const generatePassword = (lower: boolean, upper: boolean, number: boolean, symbol: boolean, length: number): string | never => {
  
  let password = '';
  const setup = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

  if (setup.length === 0) {
    throw new Error('At least 1 option must be selected')
  }

  if (length < 4) {
    throw new Error('Passowrd length must be 4 or greater');
  }


  for (let i = 0; i < length; i++) {
    setup.forEach((type) => {
      if (password.length == length){
        return
      }
      const key = Object.keys(type)[0]
      const char = getValueFromType(key)
      console.log(char)
      password += char
    })
  }


  return password
}

export const copyToClipboard = (element: HTMLInputElement | null):void => {
  if (element != null) {
    element.select()
    document.execCommand('copy')
  }
}

const passwordStrengthRisk = (score:zxcvbn.ZXCVBNScore): string =>  {
  const scoreParam = `Score${score}`
  const riskPhrase = PasswordScorePhrase[scoreParam]
  return riskPhrase
} 

export const passwordStrength = (str: string): [zxcvbn.ZXCVBNScore, string, string]  => {
  const {score, feedback} = zxcvbn(str)
  const warns = feedback.warning
  const [shortScorehrase, longScorePhrase] =  passwordStrengthRisk(score).split(':')
  const info = warns !== '' ? warns : longScorePhrase
  return [score, shortScorehrase, info]
}