export function generatePassword(
  length: number,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  let charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numerics: string = "0123456789";
  const symbols: string = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  if (includeNumbers) charset += numerics;
  if (includeSymbols) charset += symbols;

  let retVal: string = "";
  let hasNumber: boolean = false;
  let hasSymbol: boolean = false;

  for (let i = 0, n = charset.length; i < length; ++i) {
    const randomChar: string = charset.charAt(Math.floor(Math.random() * n));
    retVal += randomChar;
    if (includeNumbers && numerics.includes(randomChar)) {
      hasNumber = true;
    }
    if (includeSymbols && symbols.includes(randomChar)) {
      hasSymbol = true;
    }
  }
  if (includeNumbers && !hasNumber) {
    const randomNumeric: string = numerics.charAt(
      Math.floor(Math.random() * numerics.length)
    );
    const randomIndex: number = Math.floor(Math.random() * retVal.length);
    retVal =
      retVal.slice(0, randomIndex) +
      randomNumeric +
      retVal.slice(randomIndex + 1);
  }
  if (includeSymbols && !hasSymbol) {
    const randomSymbol: string = symbols.charAt(
      Math.floor(Math.random() * symbols.length)
    );
    const randomIndex: number = Math.floor(Math.random() * retVal.length);
    retVal =
      retVal.slice(0, randomIndex) +
      randomSymbol +
      retVal.slice(randomIndex + 1);
  }
  return retVal;
}