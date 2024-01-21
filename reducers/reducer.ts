import { generatePassword } from "@/libs/passwordGenerator";

export function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_LENGTH":
      return { ...state, length: action.payload };
    case "TOGGLE_NUMBERS":
      return { ...state, numbersAllowed: !state.numbersAllowed };
    case "TOGGLE_CHARACTERS":
      return { ...state, charactersAllowed: !state.charactersAllowed };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "GENERATE_PASSWORD":
      const pass = generatePassword(
        state.length,
        state.numbersAllowed,
        state.charactersAllowed
      );
      return { ...state, password: pass };
    default:
      return state;
  }
}