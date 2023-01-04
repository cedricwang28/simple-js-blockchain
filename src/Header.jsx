import React, { useRef } from "react";
import { useBlockchain } from "./BlockchainContext";

export default function Header() {
  const { addTransaction, writeBlock, hack, isValid } = useBlockchain();
  const inputRef = useRef(null);
  return (
    <div>
      <h1>My Blockchain</h1>
      <div>
        <input ref={inputRef} />{" "}
        <button
          onClick={() => {
            addTransaction(inputRef.current.value);
            inputRef.current.value = "";
          }}
        >
          Add Transaction
        </button>
        <button onClick={() => writeBlock()}>Publish</button>
        <button onClick={() => hack()}>Hack</button>
        {isValid ? "Correct data" : "Data has been hacked!"}
      </div>
    </div>
  );
}
