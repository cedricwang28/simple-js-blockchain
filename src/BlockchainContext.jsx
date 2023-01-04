import { createContext, useContext, useState, useMemo } from "react";
import { SHA256 } from "crypto-js";

const BlockchainContext = createContext();

const GenesisBlock = {
  hash: "",
  transactions: [],
};

export function BlockchainProvider({ children }) {
  const [transactions, setTranctions] = useState([]);
  const [blocks, setBlocks] = useState([GenesisBlock]);

  const addTransaction = (tranction) => {
    setTranctions([...transactions, tranction]);
  };

  const writeBlock = () => {
    const prevBlock = blocks[blocks.length - 1];

    const block = {
      hash: SHA256(prevBlock.hash + JSON.stringify(transactions)).toString(),
      transactions: [...transactions],
    };
    setBlocks([...blocks, block]);
    setTranctions([]);
  };

  const hack = () => {
    const fakeBlocks = [...blocks];
    fakeBlocks.splice(0, 1);
    const index = Math.floor(Math.random() * fakeBlocks.length);
    fakeBlocks[index].transactions = [
      "Hacked1" + Math.random(),
      "Hacked2" + Math.random(),
    ];
    setBlocks([GenesisBlock, ...fakeBlocks]);
  };

  const isValid = useMemo(() => {
    return blocks.every((block, index) => {
      if (index === 0) return block.hash === "";
      const hash = SHA256(
        blocks[index - 1].hash + JSON.stringify(block.transactions)
      ).toString();
      return block.hash === hash;
    });
  }, [blocks]);

  return (
    <BlockchainContext.Provider
      value={{
        transactions,
        blocks,
        addTransaction,
        writeBlock,
        hack,
        isValid,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}

export const useBlockchain = () => useContext(BlockchainContext);
