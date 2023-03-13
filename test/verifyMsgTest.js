const VerifyMsg = artifacts.require("VerifyMsg");

contract("VerifyMsg", () => {
  let verifyMsg;
  let hashMsg;
  //const originalMessage = "hello";
  //const originalMessageSigner = "0x3ff5C2B17651d3380710c2088D0e336928b66B86";
  const signature =
    "0xe17b2baa8d5ea65c71870ad00387064a36c5ef53add9b01cfea6cb95a27c888718e820c785b3bcc79e96a606fa199f8527e5145e2c82bcfb199ce4ab8b09e6631c";

  const messageToVerify = "hello";
  const verifySigner = "0x3ff5C2B17651d3380710c2088D0e336928b66B86";

  before(async () => {
    verifyMsg = await VerifyMsg.deployed();
  });

  it("Should Deploy Smart Contract properly", async () => {
    console.log("Contract Address:", verifyMsg.address);
    assert(verifyMsg.address != "");
  });

  it("should return hashed message", async () => {
    hashMsg = await verifyMsg.getHashedMsg(messageToVerify);
    console.log("Hashed Msg :", hashMsg);
    assert(hashMsg != null);
  });

  it("should return ethereum padded message", async () => {
    const ethHashMsg = await verifyMsg.getEthSignedHashedMsg(hashMsg);
    console.log("Ethereum Hashed Msg :", ethHashMsg);
    assert(ethHashMsg != null);
  });

  it("should authenticate message for true case ", async () => {
    const status = await verifyMsg.verify(
      messageToVerify,
      verifySigner,
      signature
    );
    console.log("Verification Status :", status);
    assert(status == true);
  });

  it("should authenticate message for false case ", async () => {
    const status = await verifyMsg.verify("secret", verifySigner, signature);
    console.log("Verification Status :", status);
    assert(status == false);
  });
});
