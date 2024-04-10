import Web3Auths from "../src/components/Web3Auths";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NftPage } from "../src/components/Nftpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/1" element={<Web3Auths />} />
        <Route path="/2" element={<Web3Auths />} />
        <Route path="/3" element={<Web3Auths />} />
        <Route path="/4" element={<Web3Auths />} />
        <Route path="/5" element={<Web3Auths />} />
        <Route path="/6" element={<Web3Auths />} />
        <Route path="/nft" element={<NftPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
