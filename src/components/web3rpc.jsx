import Web3 from "web3";

export default class EthereumRpc {
  constructor(provider) {
    this.provider = provider;
  }

  async getChainId() {
    try {
      const web3 = new Web3(this.provider);

      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error;
    }
  }

  async getAccounts() {
    try {
      const web3 = new Web3(this.provider);

      const address = await web3.eth.getAccounts();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance() {
    try {
      const web3 = new Web3(this.provider);

      const address = (await web3.eth.getAccounts())[0];

      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address),
        "ether"
      );

      return balance;
    } catch (error) {
      return error;
    }
  }

  async sendTransaction() {
    try {
      const web3 = new Web3(this.provider);

      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = fromAddress;

      const amount = web3.utils.toWei("0.001", "ether");

      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: amount,
        maxPriorityFeePerGas: "5000000000",
        maxFeePerGas: "6000000000000",
      });

      return receipt;
    } catch (error) {
      return error;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider);

      const fromAddress = (await web3.eth.getAccounts())[0];

      const originalMessage = "YOUR_MESSAGE";

      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        fromAddress,
        "test password!"
      );

      return signedMessage;
    } catch (error) {
      return error;
    }
  }

  async readContract() {
    try {
      const web3 = new Web3(this.provider);

      const contractABI = [
        {
          inputs: [
            { internalType: "string", name: "initMessage", type: "string" },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "message",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "string", name: "newMessage", type: "string" },
          ],
          name: "update",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const contractAddress = "0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334";
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const message = await contract.methods.message().call();
      return message;
    } catch (error) {
      return error;
    }
  }

  async writeContract() {
    try {
      const web3 = new Web3(this.provider);

      const contractABI = [
        {
          inputs: [
            { internalType: "string", name: "initMessage", type: "string" },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "message",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "string", name: "newMessage", type: "string" },
          ],
          name: "update",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const contractAddress = "0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334";
      const myContract = new web3.eth.Contract(contractABI, contractAddress);

      const randomNumber = Math.floor(Math.random() * 9000) + 1000;

      const receipt = await myContract.methods
        .update(`Web3Auth is awesome ${randomNumber} times!`)
        .send({
          from: `${(await web3.eth.getAccounts())[0]}`,
        });

      return receipt;
    } catch (error) {
      return error;
    }
  }

  async getPrivateKey() {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error;
    }
  }
}
