import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import contract from './contracts/abis/Token.json'
import contractAddress from './contracts/contracts-address.json'

export default function App() {
  const [allWaves, setAllWaves] = React.useState([])
  const [currAccount, setCurrentAccount] = React.useState("")
  const checkIfWalletIsConnected = () => {
    // First make sure we have access to windo.ethereum
    const { ethereum } = window;
    if(!ethereum) {
      console.log("Make sure you have metamask!")
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }

    // Check if we're authorized to use the user's wallet
  ethereum.request({ method: 'eth_accounts'})
  .then(accounts => {
    console.log(accounts)
    if(accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account', account)
      setCurrentAccount(account)
    } else {
      console.log('No authorized account found')
    }
  })
}

  const connectWallet = () => {
    const { ethereum } = window;
    if(!ethereum) {
      alert("Getmetamask")
    }
  ethereum.request({ method: 'eth_requestAccounts'})
  .then(accounts => {
    console.log("Connected", accounts[0])
    setCurrentAccount(accounts[0])
  })
  .catch(err => console.log(err))
}

  const wave = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const waveportalContract = new ethers.Contract(contractAddress.WavePortal, contract.abi, signer)

    let count = await waveportalContract.getTotalWaves()
    console.log("Retrieved total wave count...", count.toNumber())

    const waveTxn = await waveportalContract.wave('Boom', { gasLimit: 300000 })
    console.log("Mining...", waveTxn.hash)
    await waveTxn.wait()
    console.log("Mined --", waveTxn.hash)

    count = await waveportalContract.getTotalWaves()
    console.log("Retreived total wave count...", count.toNumber())
  }

  async function getAllWaves() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const waveportalContract = new ethers.Contract(contractAddress.WavePortal, contract.abi, signer)

    let waves = await waveportalContract.getAllWaves()
    console.log(waves)

    let wavesCleaned = []
    waves.forEach(wave => {
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message
      })
    })
    setAllWaves(wavesCleaned)
    waveportalContract.on("NewWave", (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message)
      setAllWaves(oldArray => [...oldArray, {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message: message
      }])
    })
    console.log(allWaves[0])
  }
  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])



  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        blah blah blah
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        <button className="getWaveButton" onClick={getAllWaves}>
          Waves
        </button>

        {currAccount ? null : (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
