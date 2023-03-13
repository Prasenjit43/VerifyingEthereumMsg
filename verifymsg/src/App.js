import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { loadContract } from "./utils/load-contract";
import detectEthereumProvider from "@metamask/detect-provider";
const Web3 = require("web3");

function App() {
  let accounts;
  let web3;

  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [signature, setSignature] = useState(null);

  const [verifyMsg, setVerifyMsg] = useState("");
  const [signerAddress, setSignerAddress] = useState("");
  const [signatureCode, setSignatureCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("NA");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    hashing();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmitVerify = (event) => {
    event.preventDefault();
    console.log("Message to verify :", verifyMsg);
    console.log("Signature Address :", signerAddress);
    console.log("Signature Hash :", signatureCode);
    verify();
  };

  const handleVerifyMsgChange = (event) => {
    signature && setVerifyMsg(event.target.value);
  };

  const handleSignerMessageChange = (event) => {
    signature && setSignerAddress(event.target.value);
  };

  const handleSignatureCodeChange = (event) => {
    signature && setSignatureCode(event.target.value);
  };





  const hashing = async () => {
    console.log("Input Value : ", inputValue);
    const message = inputValue;
    console.log("Message :", message);
    const hashedMessage = await web3Api.web3.utils.keccak256(
      web3Api.web3.eth.abi.encodeParameters(["string"], [message])
    );

    console.log("Hashed Message : ", hashedMessage);
    web3Api.web3.eth.personal.sign(hashedMessage, account).then(console.log);
    const sign = await web3Api.web3.eth.personal.sign(hashedMessage, account);
    console.log("sign : ", sign);
    setSignature(sign);
  };





  const verify = async () => {
    console.log("Inside verify function");
    const { web3, contract } = web3Api;
    console.log("Contract Address :", contract);
    const status = await contract.methods
      .verify(verifyMsg, signerAddress, signatureCode)
      .call({ from: account }, function (error, result) {
        console.log("Error :", error);
        console.log("result :", result);
      });
    console.log("Verify Status : ", status);
    setVerificationStatus(status.toString());
  };





  useEffect(() => {
    const loadprovider = async () => {
      console.log(window.web3);
      console.log(window.ethereum);
      //accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      //console.log(accounts);

      const provider = await detectEthereumProvider();
      const verifyMsgContract = await loadContract(provider);
      console.log("Verify Msg contract : ", verifyMsgContract);

      if (provider) {
        await provider.request({ method: "eth_requestAccounts" });

        setWeb3Api({
          web3: new Web3(provider),
          provider: provider,
          contract: verifyMsgContract,
        });
      } else {
        console.error("Please install MetaMask!");
      }
    };
    loadprovider();
  }, []);





  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
      console.log("Account[0] : ", accounts);
    };
    web3Api.web3 && getAccount();
  }, [web3Api]);



  

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Original Message Signer : {account ? account : "Not Connected"}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Enter Message:
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </label>
            <br></br>
            <button type="submit">Generate Signature</button>
          </form>

          <div className="App">
            <h6>
              <p className="ow-break-word">Signature : {signature}</p>
            </h6>
          </div>

          <div>
            <form onSubmit={signature && handleSubmitVerify}>
              <label>
                Message to Verify :
                <input
                  type="text"
                  value={verifyMsg}
                  onChange={handleVerifyMsgChange}
                />
              </label>
              <br></br>
              <label>
                Signer address :
                <input
                  type="text"
                  value={signerAddress}
                  onChange={handleSignerMessageChange}
                />
              </label>{" "}
              <br></br>
              <label>
                Signature :
                <input
                  type="text"
                  value={signatureCode}
                  onChange={handleSignatureCodeChange}
                />
              </label>
              <br></br>
              <button type="submit">Verify</button>
            </form>

            <div className="App">
              <h6>
                <p className="ow-break-word">
                  Verification Status : {verificationStatus}
                </p>
              </h6>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
