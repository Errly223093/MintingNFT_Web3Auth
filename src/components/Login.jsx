import { useEffect, useState } from "react";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../src/components/web3rpc"; // for using web3.js
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

// Providers
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

// Wallet Services
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

// Adapters
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

const clientId =
  "BB1s5KTZ1_VhejYP4hX4thugMCW3ISbufpkuuogDZwYeV2trLmHGMsil49UIBzSq2D7-xm1Bq6zYr9vNlxjCsjI";

const chainConfig = {
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  uiConfig: {
    uxMode: "redirect",
    appName: "W3A Heroes",
    appUrl: "https://web3auth.io/",
    theme: {
      primary: "#7ed6df",
    },
    logoLight: "https://web3auth.io/images/web3authlog.png",
    logoDark: "https://web3auth.io/images/web3authlogodark.png",
    defaultLanguage: "en",
    mode: "auto",
    useLogoLoader: true,
  },
  privateKeyProvider: privateKeyProvider,
  sessionTime: 86400,
};

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [walletServicesPlugin, setWalletServicesPlugin] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth(web3AuthOptions);

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            uxMode: "redirect",
            whiteLabel: {
              logoLight: "https://web3auth.io/images/web3authlog.png",
              logoDark: "https://web3auth.io/images/web3authlogodark.png",
              defaultLanguage: "en",
              mode: "dark",
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        const walletServicesPlugin = new WalletServicesPlugin();
        setWalletServicesPlugin(walletServicesPlugin);
        web3auth.addPlugin(walletServicesPlugin);

        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter) => {
          web3auth.configureAdapter(adapter);
        });

        // adding metamask adapter
        const metamaskAdapter = new MetamaskAdapter();
        web3auth.configureAdapter(metamaskAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.connect();
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setLoggedIn(false);
  };

  const showWCM = async () => {
    if (!walletServicesPlugin) {
      console.log("torus plugin not initialized yet");
      return;
    }
    await walletServicesPlugin.showWalletConnectScanner();
    console.log();
  };

  const showCheckout = async () => {
    if (!walletServicesPlugin) {
      console.log("torus plugin not initialized yet");
      return;
    }
    console.log(web3auth?.connected);
    await walletServicesPlugin.showCheckout();
  };

  const showWalletUi = async () => {
    if (!walletServicesPlugin) {
      console.log("torus plugin not initialized yet");
      return;
    }
    await walletServicesPlugin.showWalletUi();
  };

  const getChainId = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };

  const addChain = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }

    const newChain = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x89",
      rpcTarget: "https://rpc.ankr.com/polygon",
      displayName: "Polygon Mainnet",
      blockExplorerUrl: "https://polygonscan.com",
      ticker: "MATIC",
      tickerName: "MATIC",
      logo: "https://images.toruswallet.io/polygon.svg",
    };

    await web3auth?.addChain(newChain);
    console.log("New Chain Added");
  };

  const switchChain = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    await web3auth?.switchChain({ chainId: "0x89" });
    console.log("Chain Switched");
  };

  const getAccounts = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const readContract = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const message = await rpc.readContract();
    console.log(message);
  };

  const writeContract = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const receipt = await rpc.writeContract();
    console.log(receipt);
    if (receipt) {
      setTimeout(async () => {
        await readContract();
      }, 2000);
    }
  };

  const getPrivateKey = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={showWalletUi} className="card">
            Show Wallet UI
          </button>
        </div>
        <div>
          <button onClick={showWCM} className="card">
            Show Wallet Connect
          </button>
        </div>
        <div>
          <button onClick={showCheckout} className="card">
            Show Checkout
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={addChain} className="card">
            Add Chain
          </button>
        </div>
        <div>
          <button onClick={switchChain} className="card">
            Switch Chain
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={readContract} className="card">
            Read Contract
          </button>
        </div>
        <div>
          <button onClick={writeContract} className="card">
            Write Contract
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a
          target="_blank"
          href="https://web3auth.io/docs/sdk/pnp/web/modal"
          rel="noreferrer"
        >
          Web3Auth{" "}
        </a>
        & ReactJS Ethereum Example
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/blockchain-connection-examples/evm-modal-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
}

export default App;
