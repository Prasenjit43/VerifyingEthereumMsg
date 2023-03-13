# VerifyingEthereumMsg
Signing and Verifying message on Ethereum blockchain

Signing and Verifying Signatures
--------------------------------
Each account in the Ethereum network has a public key and a private key. An Ethereum address is essentially a hashed version of the public key.
Accounts can use their private key to sign a piece of data, returning a signature of that data.

Anyone can verify the generated signature to:
--Recover the public key / address of the signer, and
--Verify the integrity of the message, that it is the same message that was signed by the signer.
 
The two keys are mathematically related
·         You can generate an encrypted version of a piece of data on signing it with your private key. Others can verify i.e. decrypt it with your public key.
·         Others can use your public key to sign a piece of data only intended for you. You can decrypt the same with your private key.
 

Application needs to be installed:
----------------------------------
1.   Metamask Wallet
2.   Ganache
3.   Truffle
 
Execution Steps:
 
1.   Install all dependencies from ‘/VerifyingEthereumMsg/package.json’
"create-react-app": "^5.0.1"

2.   Install all dependencies from ‘/VerifyingEthereumMsg/verify/package.json’
 "@metamask/detect-provider": "^2.0.0",
   "@testing-library/jest-dom": "^5.16.5",
   "@testing-library/react": "^13.4.0",
   "@testing-library/user-event": "^13.5.0",
   "@truffle/contract": "^4.6.17",
   "react": "^18.2.0",
   "react-dom": "^18.2.0",
   "react-scripts": "5.0.1",
   "web-vitals": "^2.1.4",
   "web3": "^1.8.2"

3. To start, navigate to “/VerifyingEthereumMsg/verifymsg” 
after that,
npm start
