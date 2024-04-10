import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import Web3 from "web3";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import contractABI from "../MatzipABI.json";
import bgPage from "../image/bgPage.png";
import image1 from "../image/nftImage/1.png";
import image2 from "../image/nftImage/2.png";
import image3 from "../image/nftImage/3.png";
import image4 from "../image/nftImage/4.png";
import image5 from "../image/nftImage/5.png";
import image6 from "../image/nftImage/6.png";

const nftImageArray = [image1, image2, image3, image4, image5, image6];

const clientId =
  "BB1s5KTZ1_VhejYP4hX4thugMCW3ISbufpkuuogDZwYeV2trLmHGMsil49UIBzSq2D7-xm1Bq6zYr9vNlxjCsjI";
const contractAddress = "0x71985009d3Cc9A5F5E474C681Ad660720dCD26e0";

const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0xaa36a7",
  rpcTarget: process.env.REACT_APP_API,
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
});

const etherscan = "https://sepolia.etherscan.io/address/";

function Web3Auths() {
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [web3authprovider, setWeb3authprovider] = useState();
  const [userAddress, setUserAddress] = useState();
  const [isSendingETH, setIsSendingETH] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMintingComplete, setIsMintingComplete] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        if (!web3auth.connected) {
          const web3authProvider = await web3auth.connect();
          setProvider(web3authProvider);
          await getAccounts(web3authProvider); // 지갑 연결 후 계정 가져오기
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  // 토큰 ID를 URL에서 추출하는 함수
  const getTokenIdFromURL = () => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();
    return parseInt(id, 10);
  };

  // NFT 민팅 => 컨트랙트 call
  const mintNFT = async () => {
    if (!loggedIn) {
      alert("소셜 로그인을 먼저 진행해주세요!");
      return;
    }

    setIsSendingETH(true);
    setIsModalOpen(true);
    setIsMintingComplete(false);

    const web3 = new Web3(
      Web3.givenProvider ||
        "https://sepolia.infura.io/v3/4bc46d21f741449c981aa74ba6d10b1d"
    );
    if (!web3) {
      console.error("Web3 is not initialized");
      setIsSendingETH(false);
      setIsModalOpen(false);
      return;
    }

    const fromAccount = web3.eth.accounts.privateKeyToAccount(
      process.env.REACT_APP_KEY
    );
    if (!fromAccount || !web3.utils.isAddress(fromAccount.address)) {
      console.error("Invalid fromAccount address");
      setIsSendingETH(false);
      setIsModalOpen(false);
      return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const tokenId = getTokenIdFromURL();
    const data = contract.methods.mint(userAddress, tokenId).encodeABI();

    const txParams = {
      from: fromAccount.address,
      to: contractAddress,
      data: data,
      gasPrice: web3.utils.toWei("10", "gwei"),
      gas: 300000,
    };

    try {
      const signedTx = await web3.eth.accounts.signTransaction(
        txParams,
        process.env.REACT_APP_KEY
      );
      await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log("민팅 완료");
      setIsMintingComplete(true);
    } catch (error) {
      console.error("Error sending transaction:", error);
    } finally {
      setIsSendingETH(false);
    }
  };

  // web3auth 소셜 로그인
  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  // 사용자 지갑 주소 확인
  const getAccounts = async (web3Provider) => {
    if (!web3Provider) {
      console.error("Provider is not initialized yet.");
      return;
    }
    const web3 = new Web3(web3Provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setUserAddress(accounts[0]);
    } else {
      console.error("No accounts found.");
    }
  };

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: "1000",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  return (
    <div className="w-[360px] h-[800px] relative bg-white">
      {/* 배경 이미지의 z-index를 0으로 설정 */}
      <img
        className="absolute w-full h-full object-cover z-0"
        src={bgPage}
        alt="Background"
      />
      {/* 지갑 주소 */}
      <div>
        <div>
          <div>div</div>
        </div>
      </div>
      <div className="text-white my-custom-font relative z-10 flex justify-center text-2xl pt-6">
        Wallet Address
      </div>
      <div className="z-10 flex justify-center relative text-[12.8px] font-bold text-gray-400">
        {userAddress}
      </div>
      <div className="text-white my-custom-font relative z-10 flex justify-center text-xl pt-6">
        Contract Address
      </div>
      <div className="z-10 flex justify-center relative text-[12.3px] font-bold text-gray-400">
        {contractAddress}
      </div>

      <div className="z-10 relative h-[294px] w-[318px] flex justify-center ml-[20px] mt-20">
        <img src={nftImageArray[getTokenIdFromURL() - 1]} alt="nft" />
      </div>

      <div className="flex justify-center mr-[22px]">
        {/* 민팅 버튼 */}
        <button
          onClick={mintNFT}
          className={`mt-4 ml-[21px] z-10 relative my-custom-font ${
            isSendingETH ? "bg-gray-500" : "bg-blue-500"
          } text-white py-2 px-4 rounded`}
          disabled={isSendingETH}
        >
          {isSendingETH ? "Minting..." : "Mint NFT"}
        </button>

        {/* nft 페이지 링크 */}

        <button
          className={`mt-4 ml-[21px] z-10 relative my-custom-font ${
            isSendingETH ? "bg-gray-500" : "bg-blue-500"
          } text-white py-2 px-4 rounded`}
        >
          <Link to={"/nft"}>My Page</Link>
        </button>
      </div>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        contentLabel="Minting NFT"
      >
        {/* 모달 내용 */}
        {isMintingComplete ? (
          <div className="w-full h-full">
            <h2 className="text-lg font-semibold text-gray-900">
              NFT 민팅 완료!
            </h2>
            <p className="text-sm text-gray-600">
              입맛 월드컵 NFT가 성공적으로 민팅되었습니다.
            </p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                window.location.href = "https://wepublic.com/c/matzip?tab=feed";
              }}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              matzipDAO로 돌아가기
            </button>
          </div>
        ) : (
          <div className="w-full h-full">
            <h2 className="text-lg font-semibold text-gray-900">
              입맛 월드컵 NFT 민팅 중...
            </h2>
            <p className="text-sm text-gray-600">
              민팅 완료까지 최대 15초가 소요될 수 있습니다.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
export default Web3Auths;
