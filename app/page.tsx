"use client";
import { generatePassword } from "@/libs/passwordGenerator";
import { reducer } from "@/reducers/reducer";
import { useEffect, useRef, useReducer } from "react";

const initialState = {
  length: 8,
  numbersAllowed: true,
  charactersAllowed: true,
  password: "",
};

function generateNewPassword(
  length: number,
  numbersAllowed: boolean,
  charactersAllowed: boolean,
  dispatch: {
    (value: any): void;
    (arg0: { type: string; payload: string }): void;
  }
) {
  const pass = generatePassword(length, numbersAllowed, charactersAllowed);
  dispatch({ type: "SET_PASSWORD", payload: pass });
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { length, numbersAllowed, charactersAllowed, password } = state;

  const passwordRef = useRef(null);
  const copyBtnRef = useRef(null);
  const timeoutRef = useRef(null);

  const copyPasswordToClipboard = () => {
    (passwordRef.current as HTMLInputElement | null)?.select();
    window.navigator.clipboard.writeText(password);
    (copyBtnRef.current as HTMLButtonElement | null)!.innerText = "Copied";

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current as NodeJS.Timeout);
      setTimeout(() => {
        (copyBtnRef.current as HTMLButtonElement | null)!.innerText = "Copy";
      }, 1000);
    }
  };

  useEffect(() => {
    generateNewPassword(length, numbersAllowed, charactersAllowed, dispatch);
  }, [length, numbersAllowed, charactersAllowed, dispatch]);

  return (
    <div className="w-full py-4 max-w-md mx-auto rounded-lg px-4 my-8 text-orange-600 bg-gray-700 ">
      <h1 className="text-center text-2xl mb-2 text-white">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <button
          type="button"
          className="bg-green-600 px-3 py-0.5 text-white outline-none shrink-0"
          onClick={() => dispatch({ type: "GENERATE_PASSWORD" })}
        >
          New
        </button>
        <input
          type="text"
          name="password"
          id="password"
          defaultValue={password}
          placeholder="password"
          readOnly
          className="outline-none w-full py-1 px-3"
          ref={passwordRef}
        />
        <button
          id="copyBtn"
          type="button"
          className="bg-blue-700 px-3 py-0.5 text-white outline-none shrink-0"
          onClick={copyPasswordToClipboard}
          ref={copyBtnRef}
        >
          Copy
        </button>
      </div>
      <div className="flex gap-x-2 text-sm">
        <div className="flex items-center gap-x-1">
          <small className="text-white">6</small>
          <input
            type="range"
            min={6}
            max={60}
            value={length}
            className="cursor-pointer"
            onChange={(e) =>
              dispatch({ type: "SET_LENGTH", payload: +e.target.value })
            }
          />
          <small className="text-white">60</small>
          <label className="w-20">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="numberInput"
            id="numberinput"
            defaultChecked={numbersAllowed}
            onChange={() => dispatch({ type: "TOGGLE_NUMBERS" })}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="numberInput"
            id="numberinput"
            defaultChecked={charactersAllowed}
            onChange={() => dispatch({ type: "TOGGLE_CHARACTERS" })}
          />
          <label htmlFor="numberInput">Characters</label>
        </div>
      </div>
    </div>
  );
}
