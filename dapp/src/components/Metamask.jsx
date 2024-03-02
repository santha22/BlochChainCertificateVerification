import React, { useState } from 'react';
import { ethers } from 'ethers';

const Metamask = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);


    
    const connectWallet = () => {
        if(window.ethereum) {
            console.log("connected");
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChanged([result[0]])
            })
        } else {
            setErrorMessage("Install Metamask please");
        }
    }

    const accountChanged = (accountName) => {
        setDefaultAccount(accountName);
        getUserBalance(accountName);
    }

    const getUserBalance = (accountAddress) => {
        window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
        .then(balance => {
            setUserBalance(ethers.formatEther(balance));
        })
    }
    
  return (
    <div>
        <h1>Metamask connection</h1>
       
        <button onClick={connectWallet}>connect</button>
        <h3>Address: {defaultAccount}</h3>
        <h3>Balance: ${userBalance}</h3>
        {errorMessage}
    </div>
  )
}

export default Metamask
