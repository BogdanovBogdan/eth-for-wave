import React, { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';
import './App.css';
import abi from './utils/WavePortal.json';
import { findMetaMaskAccount, connectWallet } from './MetaMaskUtils';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [allWaves, setAllWaves] = useState([]);
  const [totalWaves, setTotalWaves] = useState(null);
  const [message, setMessage] = useState('');

  const contractAddress = '0x37A8434791365b3308E4D3F792b1ec18997Cd259';
  const contractABI = abi.abi;

  const connectMetaMask = async () => {
    try {
      const connectedAccount = await connectWallet();
      setCurrentAccount(connectedAccount);
    } catch (error) {
      console.error(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log('Retrieved total wave count...', count);

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });
        console.log('Mining...', waveTxn.hash);

        await waveTxn.wait();
        console.log('Mined -- ', waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log('Retrieved total wave count...', count.toNumber());

        if (typeof count.toNumber() === 'number') {
          setTotalWaves(count.toNumber());
        }
      } else {
        console.log('Ethereum object does not exist!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = waves.map((wave) => ({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        }));

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let wavePortalContract;

    const onNewWave = (form, timestamp, message) => {
      console.log('NewWave', from, timestamp, message);
      setAllWave((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on('NewWave', onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off('NewWave', onNewWave);
      }
    };
  }, []);

  useEffect(() => {
    const findAccount = async () => {
      const account = await findMetaMaskAccount();

      if (account !== null) {
        setCurrentAccount(account);
        getAllWaves();
      }
    };

    findAccount();
  }, []);

  return (
    <div className='mainContainer'>
      <div className='dataContainer'>
        <div className='header'>👋 Hey there! And there</div>

        <div className='bio'>
          I am Bogdan and I working on myself! Connect your Ethereum wallet and
          wave at me!
        </div>

        {!currentAccount ? (
          <button className='waveButton' onClick={connectMetaMask}>
            Connect Wallet
          </button>
        ) : (
          <>
            <input
              type='text'
              className='waveInput'
              value={message}
              placeholder='Input your message and then wave me'
              onInput={(event) => {
                setMessage(event.target.value);
              }}
            />
            <button className='waveButton' onClick={wave}>
              Wave at Me
            </button>
          </>
        )}

        {totalWaves && <p>Total waves: {totalWaves}</p>}

        {allWaves.map((wave, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: 'OldLace',
                marginTop: '16px',
                padding: '8px',
              }}
            >
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
