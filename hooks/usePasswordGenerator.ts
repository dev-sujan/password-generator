"use client"
import { generatePassword } from "@/libs/passwordGenerator";
import { reducer } from "@/reducers/reducer";
import { useEffect, useReducer } from "react";


const initialState = {
  length: 8,
  numbersAllowed: true,
  charactersAllowed: true,
  password: "",
};

const [state, dispatch] = useReducer(reducer, initialState);

export function usePasswordGenerator(length: number, numbersAllowed: boolean, charactersAllowed: boolean) {
  
  const { password } = state;

  useEffect(() => {
    const pass = generatePassword(length, numbersAllowed, charactersAllowed);
    dispatch({ type: "SET_PASSWORD", payload: pass });
  }, [length, numbersAllowed, charactersAllowed]);

  return password;
}

