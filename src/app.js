const web3 = new Web3(window.ethereum);

async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Metamask connected');
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('Metamask not found');
    }
}

const tokenAddress = '0x023031E9B7E4556897C9576e933b681A28713C55';
const nftAddress = '0xDe930BfD586eFC8377Ee1148009325D8DED49159';

const tokenABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const nftABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "createNFT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


async function getBalance() {
    console.log('getBalance function called'); 
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts); 
    if (accounts.length === 0) {
        console.error('No accounts found');
        alert('Please connect to Metamask');
        return;
    }
    const balance = await tokenContract.methods.balanceOf(accounts[0]).call();
    console.log('Balance:', balance); 
    alert(`Balance: ${balance}`);
}

async function createNFT() {
    console.log('createNFT function called'); 
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts); 
    if (accounts.length === 0) {
        console.error('No accounts found');
        alert('Please connect to Metamask');
        return;
    }
    await nftContract.methods.createNFT().send({ from: accounts[0] });
    console.log('NFT created'); 
    alert('NFT created');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded'); 
    document.getElementById('getBalance').addEventListener('click', getBalance);
    document.getElementById('createNFT').addEventListener('click', createNFT);
});

// const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
// const nftContract = new web3.eth.Contract(nftABI, nftAddress);

// async function getBalance() {
//     const accounts = await web3.eth.getAccounts();
//     const balance = await tokenContract.methods.balanceOf(accounts[0]).call();
//     console.log('Balance:', balance);
// }

// async function createNFT() {
//     const accounts = await web3.eth.getAccounts();
//     await nftContract.methods.createNFT().send({ from: accounts[0] });
//     console.log('NFT created');
// }

// document.getElementById('getBalance').addEventListener('click', getBalance);
// document.getElementById('createNFT').addEventListener('click', createNFT);





// const web3 = new Web3(window.ethereum);

// async function connectMetamask() {
//     if (window.ethereum) {
//         try {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             console.log('Metamask connected');
//         } catch (error) {
//             console.error('User denied account access');
//         }
//     } else {
//         console.error('Metamask not found');
//     }
// }

// const tokenAddress = 'YOUR_ERC20_CONTRACT_ADDRESS';
// const nftAddress = 'YOUR_NFT_CONTRACT_ADDRESS';

// const tokenABI = [];
// const nftABI = [];

// const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
// const nftContract = new web3.eth.Contract(nftABI, nftAddress);

