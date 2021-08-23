export enum PasswordScorePhrase {
  Score0 = 'too guessable: risky password.',
  Score1 = 'very guessable: protection from throttled online attacks.',
  Score2 = 'somewhat guessable: protection from unthrottled online attacks.',
  Score3 = 'safely unguessable: moderate protection from offline slow-hash scenario.',
  Score4 = 'very unguessable: strong protection from offline slow-hash scenario.'
}