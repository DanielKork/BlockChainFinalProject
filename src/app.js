const web3 = new Web3(window.ethereum);

async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Metamask connected');
        } catch (error) {
            console.error('User denied account access:', error);
        }
    } else {
        console.error('Metamask not found');
    }
}

const tokenAddress = '0xf5D34B9024a2c2eD19F126411BeA741055b40fF4';
const nftAddress = '0xA1b4eFE150FE76aD400f4e1aD02DF907ECb3AA25';

const tokenABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
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
        "inputs": [],
        "name": "getTokenCounter",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
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

const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
const nftContract = new web3.eth.Contract(nftABI, nftAddress);

async function getBalance() {
    console.log('getBalance function called');
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);
    if (accounts.length === 0) {
        console.error('No accounts found');
        alert('Please connect to Metamask');
        return;
    }
    try {
        const balance = await tokenContract.methods.balanceOf(accounts[0]).call();
        console.log('Balance:', balance);
        alert(`Balance: ${balance}`);
    } catch (error) {
        console.error('Error getting balance:', error);
        alert('Error getting balance: ' + error.message);
    }
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
    try {
        await nftContract.methods.createNFT().send({ from: accounts[0] });
        console.log('NFT created');
        alert('NFT created');
        displayNFTs();
    } catch (error) {
        console.error('Error creating NFT:', error);
        alert('Error creating NFT: ' + error.message);
    }
}

async function displayNFTs() {
    console.log('displayNFTs function called');
    try {
        const totalSupply = await nftContract.methods.getTokenCounter().call();
        console.log('Total supply:', totalSupply);
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        const marketplace = document.getElementById('marketplace');
        marketplace.innerHTML = '';

        for (let i = 0; i < totalSupply; i++) {
            const owner = await nftContract.methods.ownerOf(i).call();
            console.log(`NFT #${i} owner:`, owner);
            if (owner.toLowerCase() === userAddress.toLowerCase()) {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">NFT #${i}</h5>
                            <p class="card-text">Owner: ${owner}</p>
                        </div>
                    </div>
                `;
                marketplace.appendChild(card);
            }
        }
    } catch (error) {
        console.error('Error displaying NFTs:', error);
        alert('Error displaying NFTs: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM content loaded');
    await connectMetamask();
    await displayNFTs(); // Display NFTs immediately upon page load
    document.getElementById('getBalance').addEventListener('click', getBalance);
    document.getElementById('createNFT').addEventListener('click', createNFT);
});







// const web3 = new Web3(window.ethereum);

// async function connectMetamask() {
//     if (window.ethereum) {
//         try {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             console.log('Metamask connected');
//         } catch (error) {
//             console.error('User denied account access:', error);
//         }
//     } else {
//         console.error('Metamask not found');
//     }
// }

// const tokenAddress = '0xf5D34B9024a2c2eD19F126411BeA741055b40fF4';
// const nftAddress = '0xA1b4eFE150FE76aD400f4e1aD02DF907ECb3AA25';

// const tokenABI = [
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "initialSupply",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Approval",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Transfer",
//         "type": "event"
//     },
//     {
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "recipient",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];

// const nftABI = [
//     {
//         "inputs": [],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "approved",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Approval",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "approved",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "ApprovalForAll",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Transfer",
//         "type": "event"
//     },
//     {
//         "inputs": [],
//         "name": "createNFT",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getTokenCounter",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "ownerOf",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "operator",
//                 "type": "address"
//             }
//         ],
//         "name": "setApprovalForAll",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transferFrom",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "tokenPrices",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
// ];

// const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
// const nftContract = new web3.eth.Contract(nftABI, nftAddress);

// async function getAccounts() {
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//         alert('Please connect to Metamask');
//         return [];
//     }
//     return accounts;
// }

// async function getBalance() {
//     const accounts = await getAccounts();
//     if (accounts.length === 0) return;

//     try {
//         const balance = await tokenContract.methods.balanceOf(accounts[0]).call();
//         alert(`Balance: ${balance}`);
//     } catch (error) {
//         console.error('Error getting balance:', error);
//         alert('Error getting balance: ' + error.message);
//     }
// }

// async function createNFT() {
//     const accounts = await getAccounts();
//     if (accounts.length === 0) return;

//     try {
//         await nftContract.methods.createNFT().send({ from: accounts[0] });
//         alert('NFT created');
//         displayNFTs();
//     } catch (error) {
//         console.error('Error creating NFT:', error);
//         alert('Error creating NFT: ' + error.message);
//     }
// }

// async function setTokenPrice(tokenId, price) {
//     const accounts = await getAccounts();
//     if (accounts.length === 0) return;

//     try {
//         await nftContract.methods.setTokenPrice(tokenId, web3.utils.toWei(price, 'ether')).send({ from: accounts[0] });
//         alert(`Price set for NFT #${tokenId}`);
//         displayNFTs();
//     } catch (error) {
//         console.error('Error setting price:', error);
//         alert('Error setting price: ' + error.message);
//     }
// }

// async function buyNFT(tokenId, price) {
//     const accounts = await getAccounts();
//     if (accounts.length === 0) return;

//     try {
//         await nftContract.methods.buyNFT(tokenId).send({ from: accounts[0], value: web3.utils.toWei(price, 'ether') });
//         alert(`NFT #${tokenId} purchased`);
//         displayNFTs();
//     } catch (error) {
//         console.error('Error buying NFT:', error);
//         alert('Error buying NFT: ' + error.message);
//     }
// }

// async function displayNFTs() {
//     try {
//         const totalSupply = await nftContract.methods.getTokenCounter().call();
//         const accounts = await getAccounts();
//         if (accounts.length === 0) return;

//         const userAddress = accounts[0];
//         const marketplace = document.getElementById('marketplace');
//         marketplace.innerHTML = '';

//         for (let i = 0; i < totalSupply; i++) {
//             let owner, price;
//             try {
//                 owner = await nftContract.methods.ownerOf(i).call();
//             } catch (error) {
//                 console.error(`Error getting owner of NFT #${i}:`, error);
//                 continue;
//             }

//             try {
//                 price = await nftContract.methods.tokenPrices(i).call();
//             } catch (error) {
//                 console.error(`Error getting price of NFT #${i}:`, error);
//                 continue;
//             }

//             const priceInEther = web3.utils.fromWei(price, 'ether');

//             const card = document.createElement('div');
//             card.className = 'col-md-4';
//             card.innerHTML = `
//                 <div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">NFT #${i}</h5>
//                         <p class="card-text">Owner: ${owner}</p>
//                         <p class="card-text">Price: ${priceInEther} ETH</p>
//                         ${owner.toLowerCase() === userAddress.toLowerCase() ? `
//                         <input type="number" id="price-${i}" placeholder="Set price in ETH" />
//                         <button onclick="setTokenPrice(${i}, document.getElementById('price-${i}').value)">Set Price</button>
//                         ` : `
//                         <button onclick="buyNFT(${i}, '${priceInEther}')">Buy</button>
//                         `}
//                     </div>
//                 </div>
//             `;
//             marketplace.appendChild(card);
//         }
//     } catch (error) {
//         console.error('Error displaying NFTs:', error);
//         alert('Error displaying NFTs: ' + error.message);
//     }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     await connectMetamask();
//     await displayNFTs();
//     document.getElementById('getBalance').addEventListener('click', getBalance);
//     document.getElementById('createNFT').addEventListener('click', createNFT);
// });