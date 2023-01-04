import React from "react";
import { useBlockchain } from "./BlockchainContext";

export default function Trade() {
  const { transactions, blocks } = useBlockchain();
  const myBlocks = [...blocks];
  myBlocks.splice(0, 1);
  return (
    <div>
      Unpublished Transactions
      <ul>
        {transactions.map((transaction, index) => {
          return <li key={index}>{transaction}</li>;
        })}
      </ul>
      Published Transactions
      <ul>
        {myBlocks.map((block) => {
          return (
            <li key={block.hash}>
              {block.hash}
              {block.transactions.map((transaction, index) => {
                return <span key={index}>{transaction}</span>;
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
