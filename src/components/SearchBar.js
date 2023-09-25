import React, { useState } from "react";
import "../assets/tailwind.css";

const SearchBar = ({ onChildSubmit }) => {
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState("");

  const keyPress = (e) => {
    if (e.keyCode === 13 && input!== "") {
      onChildSubmit("%" + input + "%");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChildSubmit("%" + input + "%");
  };

  return (
    <div className="flex w-10/12">
      <div className="flex relative w-full">
        <input
          onKeyDown={keyPress}
          onFocus={() => setFocus(!focus)}
          onBlur={() => setFocus(!focus)}
          className="rounded-full appearance-none border w-full float-none py-2 px-10 text-gray-700 leading-tight flex text-start focus:outline-none focus:border-teal-800 focus:bg-gray-200"
          id="search"
          placeholder="search beer, breweries..."
          // value={input}
          onInput={(e) => setInput(e.target.value)}
        ></input>
        <div className="pointer-events-none absolute inset-y-0 left-0 px-3 flex items-center text-gray-500">
          <svg
            className="fill-current h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z" />
          </svg>
        </div>
      </div>
      {input !== "" && (
        <button
          onClick={handleSubmit}
          className="flex-end px-4 font-semibold text-teal-900"
        >
          search
        </button>
      )}
    </div>
  );
};

export default SearchBar;
