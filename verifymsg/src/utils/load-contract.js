import VerifyMsg from "../contracts/VerifyMsg.json";
const Web3 = require("web3");

export const loadContract = async (provider) => {
  let instance;
  try {
    console.log("VerifyMsg:", VerifyMsg);
    console.log("VerifyMsg.abi:", VerifyMsg.abi);
    const web3 = new Web3(provider);
    console.log("Web3:", web3);
    const networkId = await web3.eth.net.getId();
    console.log("network id :", networkId);
    const deployedNetwork = VerifyMsg.networks[networkId];

    console.log("Contract Address:", deployedNetwork.address);
    instance = new web3.eth.Contract(
      VerifyMsg.abi,
      deployedNetwork && deployedNetwork.address
    );
    console.log("Instance", instance);
  } catch (error) {
    alert("Falied to load web3 or contract.");
    console.log(error);
  }

  return instance;
};
