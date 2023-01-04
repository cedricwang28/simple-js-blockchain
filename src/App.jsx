import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Trade from "./Trade";
import Footer from "./Footer";
import { BlockchainProvider } from "./BlockchainContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BlockchainProvider>
        <Header />
        <Trade />
        <Footer />
      </BlockchainProvider>
    </div>
  );
}

export default App;
