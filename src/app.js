const web3 = new Web3(window.ethereum);

async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Metamask connected');
            checkCreator();
        } catch (error) {
            console.error('User denied account access:', error);
        }
    } else {
        console.error('Metamask not found');
    }
}

const tokenAddress = '0x8a7260Ebd63b730BAe9627Fe99FDfEdB54Bfe335';
const nftAddress = '0x033cE78A3E9816EAB2F6D3bD17Df712333E15bcF';
const creatorAddress = '0x57697C8b21d6C1Af31CEdf3523E8Fa7Dae9add03';

// const tokenAddress = '0x8d3c1c862735CCe598a7b9c274F59Fe38A717304';
// const nftAddress = '0x2A5695Af405B3a4b57cB332B358E6655B04EC5Eb';
// const creatorAddress = '0x57697C8b21d6C1Af31CEdf3523E8Fa7Dae9add03';

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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "setTokenPrice",
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
        "name": "buyNFT",
        "outputs": [],
        "stateMutability": "payable",
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
        "name": "getTokenPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
const nftContract = new web3.eth.Contract(nftABI, nftAddress);

async function checkCreator() {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0].toLowerCase() === creatorAddress.toLowerCase()) {
        document.getElementById('createNFT').style.display = 'inline-block';
    }
}

async function getBalance() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        alert('Please connect to Metamask');
        return;
    }
    try {
        const balance = await web3.eth.getBalance(accounts[0]);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        alert(`Balance: ${balanceInEth} ETH`);
    } catch (error) {
        console.error('Error getting balance:', error);
        alert('Error getting balance: ' + error.message);
    }
}

// async function createNFT() {
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//         alert('Please connect to Metamask');
//         return;
//     }

//     const tokenURI = "https://example.com/metadata/nft_metadata.json";
//     try {
//         await nftContract.methods.createNFT(tokenURI).send({ from: accounts[0] });
//         alert('NFT created');
//         displayUserNFTs();
//     } catch (error) {
//         console.error('Error creating NFT:', error);
//         alert('Error creating NFT: ' + error.message);
//     }
// }


async function createNFT() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        alert('Please connect to Metamask');
        return;
    }
    try {
        await nftContract.methods.createNFT().send({ from: accounts[0] });
        alert('NFT created');
        displayUserNFTs();
    } catch (error) {
        console.error('Error creating NFT:', error);
        alert('Error creating NFT: ' + error.message);
    }
}

async function displayMarketplaceNFTs() {
    try {
        console.log('Fetching total supply of NFTs');
        const totalSupply = await nftContract.methods.getTokenCounter().call();
        console.log('Total supply:', totalSupply);
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        const marketplace = document.getElementById('marketplace');
        marketplace.innerHTML = '';

        for (let i = 0; i < totalSupply; i++) {
            try {
                console.log(`Fetching owner of NFT #${i}`);
                const owner = await nftContract.methods.ownerOf(i).call();
                console.log(`Owner of NFT #${i}: ${owner}`);
                if (owner.toLowerCase() !== userAddress.toLowerCase()) {
                    console.log(`Fetching price of NFT #${i}`);
                    const price = await nftContract.methods.getTokenPrice(i).call();
                    const priceInEther = web3.utils.fromWei(price, 'ether');
                    console.log(`Price of NFT #${i}: ${priceInEther}`);

                    console.log(`Fetching URI of NFT #${i}`);
                    const tokenURI = await nftContract.methods.tokenURI(i).call();
                    console.log(`URI of NFT #${i}: ${tokenURI}`);
                    
                    const metadata = await fetch(tokenURI).then(response => response.json());

                    const card = document.createElement('div');
                    card.className = 'col-md-4';
                    card.innerHTML = `
                        <div class="card">
                            <img src="${metadata.image}" class="card-img-top" alt="NFT Image">
                            <div class="card-body">
                                <h5 class="card-title">NFT #${i}</h5>
                                <p class="card-text">Owner: ${owner}</p>
                                <p class="card-text">Price: ${priceInEther} ETH</p>
                                <button class="btn btn-success" onclick="buyNFT(${i}, '${priceInEther}')">Buy</button>
                            </div>
                        </div>
                    `;
                    marketplace.appendChild(card);
                }
            } catch (error) {
                console.error(`Error displaying NFT #${i}:`, error);
            }
        }
    } catch (error) {
        console.error('Error displaying NFTs:', error);
        alert('Error displaying NFTs: ' + error.message);
    }
}
async function displayUserNFTs() {
    try {
        const totalSupply = await nftContract.methods.getTokenCounter().call();
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        const myNFTs = document.getElementById('myNFTs');
        myNFTs.innerHTML = '';

        for (let i = 0; i < totalSupply; i++) {
            try {
                const owner = await nftContract.methods.ownerOf(i).call();
                if (owner.toLowerCase() === userAddress.toLowerCase()) {
                    const price = await nftContract.methods.getTokenPrice(i).call();
                    const priceInEther = web3.utils.fromWei(price, 'ether');

                    let tokenURI;
                    try {
                        tokenURI = await nftContract.methods.tokenURI(i).call();
                    } catch (error) {
                        console.error(`Error fetching URI for NFT #${i}:`, error);
                        continue; // אם אין URI, דלג על ה-NFT הזה
                    }

                    const metadata = await fetch(tokenURI).then(response => response.json());

                    const card = document.createElement('div');
                    card.className = 'col-md-4';
                    card.innerHTML = `
                        <div class="card">
                            <img src="${metadata.image}" class="card-img-top" alt="NFT Image">
                            <div class="card-body">
                                <h5 class="card-title">NFT #${i}</h5>
                                <p class="card-text">Owner: ${owner}</p>
                                <input type="number" id="price-${i}" placeholder="Set price in ETH" />
                                <button class="btn btn-primary" onclick="setTokenPrice(${i}, document.getElementById('price-${i}').value)">Set Price</button>
                            </div>
                        </div>
                    `;
                    myNFTs.appendChild(card);
                }
            } catch (error) {
                console.error(`Error displaying NFT #${i}:`, error);
            }
        }
    } catch (error) {
        console.error('Error displaying NFTs:', error);
        alert('Error displaying NFTs: ' + error.message);
    }
}

async function displayTransactionHistory() {
    try {
        const events = await nftContract.getPastEvents('allEvents', {
            fromBlock: 0, // תחילת הבלוקצ'יין
            toBlock: 'latest' // הבלוק האחרון
        });

        console.log('Events fetched:', events.length); // הדפסת מספר האירועים שנמצאו

        if (events.length === 0) {
            console.log('No events found in the contract.');
            return;
        }

        const tableBody = document.querySelector('#transactionHistoryTable tbody');
        tableBody.innerHTML = ''; // נקה את התוכן הנוכחי

        for (let event of events) {
            const { event: eventType, returnValues, transactionHash, blockNumber } = event;
            console.log(`Processing event: ${eventType}`); // הדפסת סוג האירוע
            let eventDetails = '';
            let nftId = returnValues.tokenId || 'N/A';
            let details = '';

            // קבלת התאריך של הבלוק
            const block = await web3.eth.getBlock(blockNumber);
            const timestamp = Number(block.timestamp); // המרה למספר רגיל
            const date = new Date(timestamp * 1000).toLocaleString();

            if (eventType === 'NFTCreated') {
                eventDetails = 'NFT Created';
                details = `Creator: ${returnValues.owner}`;
            } else if (eventType === 'Transfer') {
                eventDetails = 'NFT Transferred';
                details = `From: ${returnValues.from} <br> To: ${returnValues.to}`;
            } else if (eventType === 'TokenPriceSet') {
                eventDetails = 'NFT Price Set';
                details = `Price: ${web3.utils.fromWei(returnValues.price, 'ether')} ETH`;
            } else {
                console.log(`Unknown event type: ${eventType}`); // הדפסת סוג אירוע לא מוכר
                continue; // אם זה אירוע שאינו רלוונטי, דלג
            }

            const transactionLink = `https://etherscan.io/tx/${transactionHash}`; // עדכן לפי הרשת (Mainnet/Testnet)

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td>${eventDetails}</td>
                <td>${nftId}</td>
                <td>${details}</td>
                <td><a href="${transactionLink}" target="_blank">View on Etherscan</a></td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching transaction history:', error);
    }
}




async function setTokenPrice(tokenId, price) {
    const accounts = await web3.eth.getAccounts();
    try {
        await nftContract.methods.setTokenPrice(tokenId, web3.utils.toWei(price, 'ether')).send({ from: accounts[0] });
        displayUserNFTs();
    } catch (error) {
        console.error('Error setting price:', error);
        alert('Error setting price: ' + error.message);
    }
}

async function buyNFT(tokenId, price) {
    const accounts = await web3.eth.getAccounts();
    try {
        await nftContract.methods.buyNFT(tokenId).send({ from: accounts[0], value: web3.utils.toWei(price, 'ether') });
        alert(`NFT #${tokenId} purchased`);
        displayMarketplaceNFTs();
    } catch (error) {
        console.error('Error buying NFT:', error);
        alert('Error buying NFT: ' + error.message);
    }
}

// document.addEventListener('DOMContentLoaded', async () => {
//     await connectMetamask();
//     await displayMarketplaceNFTs();
//     document.getElementById('getBalance').addEventListener('click', getBalance);
//     document.getElementById('createNFT').addEventListener('click', createNFT);
//     document.getElementById('showMyNFTs').addEventListener('click', async () => {
//         document.getElementById('marketplace').style.display = 'none';
//         document.getElementById('myNFTs').style.display = 'flex';
//         await displayUserNFTs();
//     });
//     document.getElementById('showMarketplace').addEventListener('click', async () => {
//         document.getElementById('myNFTs').style.display = 'none';
//         document.getElementById('marketplace').style.display = 'flex';
//         await displayMarketplaceNFTs();
//     });
// });
document.addEventListener('DOMContentLoaded', async () => {
    await connectMetamask();
    await displayMarketplaceNFTs();

    // כפתורים אחרים...
    document.getElementById('getBalance').addEventListener('click', getBalance);
    document.getElementById('createNFT').addEventListener('click', createNFT);
    
    document.getElementById('showMyNFTs').addEventListener('click', async () => {
        document.getElementById('marketplace').style.display = 'none';
        document.getElementById('myNFTs').style.display = 'flex';
        document.getElementById('transactionHistoryPage').style.display = 'none';
        await displayUserNFTs();
    });

    document.getElementById('showMarketplace').addEventListener('click', async () => {
        document.getElementById('myNFTs').style.display = 'none';
        document.getElementById('marketplace').style.display = 'flex';
        document.getElementById('transactionHistoryPage').style.display = 'none';
        await displayMarketplaceNFTs();
    });

    // כפתור להצגת היסטוריית עסקאות
    document.getElementById('showTransactionHistory').addEventListener('click', async () => {
        document.getElementById('myNFTs').style.display = 'none';
        document.getElementById('marketplace').style.display = 'none';
        document.getElementById('transactionHistoryPage').style.display = 'flex';
        await displayTransactionHistory();
    });
});












// const web3 = new Web3(window.ethereum);

// async function connectMetamask() {
//     if (window.ethereum) {
//         try {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             console.log('Metamask connected');
//             checkCreator();
//         } catch (error) {
//             console.error('User denied account access:', error);
//         }
//     } else {
//         console.error('Metamask not found');
//     }
// }

// const tokenAddress = '0x8d3c1c862735CCe598a7b9c274F59Fe38A717304';
// const nftAddress = '0x2A5695Af405B3a4b57cB332B358E6655B04EC5Eb';
// const creatorAddress = '0x57697C8b21d6C1Af31CEdf3523E8Fa7Dae9add03';

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
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "price",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setTokenPrice",
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
//         "name": "buyNFT",
//         "outputs": [],
//         "stateMutability": "payable",
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
//         "name": "getTokenPrice",
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

// async function checkCreator() {
//     const accounts = await web3.eth.getAccounts();
//     if (accounts[0].toLowerCase() === creatorAddress.toLowerCase()) {
//         document.getElementById('createNFT').style.display = 'inline-block';
//     }
// }

// async function getBalance() {
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//         alert('Please connect to Metamask');
//         return;
//     }
//     try {
//         const balance = await web3.eth.getBalance(accounts[0]);
//         const balanceInEth = web3.utils.fromWei(balance, 'ether');
//         alert(`Balance: ${balanceInEth} ETH`);
//     } catch (error) {
//         console.error('Error getting balance:', error);
//         alert('Error getting balance: ' + error.message);
//     }
// }

// // async function createNFT() {
// //     const accounts = await web3.eth.getAccounts();
// //     if (accounts.length === 0) {
// //         alert('Please connect to Metamask');
// //         return;
// //     }

// //     const tokenURI = "https://example.com/metadata/nft_metadata.json";
// //     try {
// //         await nftContract.methods.createNFT(tokenURI).send({ from: accounts[0] });
// //         alert('NFT created');
// //         displayUserNFTs();
// //     } catch (error) {
// //         console.error('Error creating NFT:', error);
// //         alert('Error creating NFT: ' + error.message);
// //     }
// // }


// async function createNFT() {
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//         alert('Please connect to Metamask');
//         return;
//     }
//     try {
//         await nftContract.methods.createNFT().send({ from: accounts[0] });
//         alert('NFT created');
//         displayUserNFTs();
//     } catch (error) {
//         console.error('Error creating NFT:', error);
//         alert('Error creating NFT: ' + error.message);
//     }
// }

// async function displayMarketplaceNFTs() {
//     try {
//         const totalSupply = await nftContract.methods.getTokenCounter().call();
//         const accounts = await web3.eth.getAccounts();
//         const userAddress = accounts[0];
//         const marketplace = document.getElementById('marketplace');
//         marketplace.innerHTML = '';

//         for (let i = 0; i < totalSupply; i++) {
//             try {
//                 const owner = await nftContract.methods.ownerOf(i).call();
//                 if (owner.toLowerCase() !== userAddress.toLowerCase()) {
//                     const price = await nftContract.methods.getTokenPrice(i).call();
//                     const priceInEther = web3.utils.fromWei(price, 'ether');

//                     const card = document.createElement('div');
//                     card.className = 'col-md-4';
//                     card.innerHTML = `
//                         <div class="card">
//                             <div class="card-body">
//                                 <h5 class="card-title">NFT #${i}</h5>
//                                 <p class="card-text">Owner: ${owner}</p>
//                                 <p class="card-text">Price: ${priceInEther} ETH</p>
//                                 <button class="btn btn-success" onclick="buyNFT(${i}, '${priceInEther}')">Buy</button>
//                             </div>
//                         </div>
//                     `;
//                     marketplace.appendChild(card);
//                 }
//             } catch (error) {
//                 console.error(`Error displaying NFT #${i}:`, error);
//             }
//         }
//     } catch (error) {
//         console.error('Error displaying NFTs:', error);
//         alert('Error displaying NFTs: ' + error.message);
//     }
// }


// async function displayUserNFTs() {
//     try {
//         const totalSupply = await nftContract.methods.getTokenCounter().call();
//         const accounts = await web3.eth.getAccounts();
//         const userAddress = accounts[0];
//         const myNFTs = document.getElementById('myNFTs');
//         myNFTs.innerHTML = '';

//         for (let i = 0; i < totalSupply; i++) {
//             try {
//                 const owner = await nftContract.methods.ownerOf(i).call();
//                 if (owner.toLowerCase() === userAddress.toLowerCase()) {
//                     const price = await nftContract.methods.getTokenPrice(i).call();
//                     const priceInEther = web3.utils.fromWei(price, 'ether');

//                     const card = document.createElement('div');
//                     card.className = 'col-md-4';
//                     card.innerHTML = `
//                         <div class="card">
//                             <div class="card-body">
//                                 <h5 class="card-title">NFT #${i}</h5>
//                                 <p class="card-text">Owner: ${owner}</p>
//                                 <input type="number" id="price-${i}" placeholder="Set price in ETH" />
//                                 <button class="btn btn-primary" onclick="setTokenPrice(${i}, document.getElementById('price-${i}').value)">Set Price</button>
//                             </div>
//                         </div>
//                     `;
//                     myNFTs.appendChild(card);
//                 }
//             } catch (error) {
//                 console.error(`Error displaying NFT #${i}:`, error);
//             }
//         }
//     } catch (error) {
//         console.error('Error displaying NFTs:', error);
//         alert('Error displaying NFTs: ' + error.message);
//     }
// }

// async function setTokenPrice(tokenId, price) {
//     const accounts = await web3.eth.getAccounts();
//     try {
//         await nftContract.methods.setTokenPrice(tokenId, web3.utils.toWei(price, 'ether')).send({ from: accounts[0] });
//         displayUserNFTs();
//     } catch (error) {
//         console.error('Error setting price:', error);
//         alert('Error setting price: ' + error.message);
//     }
// }

// // async function buyNFT(tokenId, price) {
// //     const accounts = await web3.eth.getAccounts();
// //     const buyerAddress = accounts[0];
// //     const approvalAmount = web3.utils.toWei(price, 'ether'); // Adjust to your token's decimals if different

// //     try {
// //         // Approve the NFT contract to spend the specified amount of MyToken
// //         await tokenContract.methods.approve(nftAddress, approvalAmount).send({ from: buyerAddress });

// //         // Buy the NFT with MyToken
// //         await nftContract.methods.buyNFT(tokenId).send({ from: buyerAddress });
// //         alert(`NFT #${tokenId} purchased successfully!`);
// //         displayMarketplaceNFTs();
// //     } catch (error) {
// //         console.error('Error buying NFT:', error.message);
// //         alert('Error buying NFT: ' + error.message);
// //     }
// // }
// async function buyNFT(tokenId, price) {
//     const accounts = await web3.eth.getAccounts();
//     try {
//         await nftContract.methods.buyNFT(tokenId).send({ from: accounts[0], value: web3.utils.toWei(price, 'ether') });
//         alert(`NFT #${tokenId} purchased`);
//         displayMarketplaceNFTs();
//     } catch (error) {
//         console.error('Error buying NFT:', error);
//         alert('Error buying NFT: ' + error.message);
//     }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     await connectMetamask();
//     await displayMarketplaceNFTs();
//     document.getElementById('getBalance').addEventListener('click', getBalance);
//     document.getElementById('createNFT').addEventListener('click', createNFT);
//     document.getElementById('showMyNFTs').addEventListener('click', async () => {
//         document.getElementById('marketplace').style.display = 'none';
//         document.getElementById('myNFTs').style.display = 'flex';
//         await displayUserNFTs();
//     });
//     document.getElementById('showMarketplace').addEventListener('click', async () => {
//         document.getElementById('myNFTs').style.display = 'none';
//         document.getElementById('marketplace').style.display = 'flex';
//         await displayMarketplaceNFTs();
//     });
// });