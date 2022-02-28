import './App.css';
import doodleDoodsABI from "./doodleDoodsABI.json";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";

const doodleMinterAddress = 'this is where you would put the contract address';

function App() {
    // connect app to blockchain
    //hooks
    const [accounts, setAccounts] = useState([]);

    // connect to metamask
    async function connectAccounts(){
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      setAccounts(accounts)
    }
    useEffect(() =>{
      connectAccounts();
    }, []);

    // minting functionality

    const [mintAmount, setMintAmount] = useState(1);

    async function handleMint(){
      // check for metamask window
      if (window.ethereum) {
        // ethers providers allow me to connect to
        //different providers are different ways to connect to the blockchain web3 is for metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // a signer will prompt purchaser to approve/sign for transaction
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          doodleMinterAddress,
          doodleDoodsABI.abi, 
          signer
        );
        try{
          const response = await contract.mint(BigNumber.from(mintAmount));
          console.log("response: ", response);
        } catch(err){
          console.log("error: ", err);
        }
      }
    }


    return (
    <div className="App"> 
      This is a mint button
      {accounts.length && (
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
            {mintAmount}
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
    );
}

export default App;
