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

// const tokenAddress = '0x8d3c1c862735CCe598a7b9c274F59Fe38A717304';
const nftAddress = '0xdd303Bd0586EF33Dc8b8ec9a10edb6d9ca0026d4'; 
// const nftAddress = '0x2A5695Af405B3a4b57cB332B358E6655B04EC5Eb';
const creatorAddress = '0x57697C8b21d6C1Af31CEdf3523E8Fa7Dae9add03';

let userCarts = {};

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
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

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

async function createNFT(uri) {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        alert('Please connect to Metamask');
        return;
    }
    try {
        await nftContract.methods.createNFT(uri).send({
            from: accounts[0],
        });
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
                const owner = await nftContract.methods.ownerOf(i).call();
                if (owner.toLowerCase() !== userAddress.toLowerCase()) {
                    const price = await nftContract.methods.getTokenPrice(i).call();
                    const priceInEther = web3.utils.fromWei(price, 'ether');

                    const tokenURI = await nftContract.methods.tokenURI(i).call();

                    if (!tokenURI.startsWith('http')) {
                        console.error(`Invalid URI for NFT #${i}: ${tokenURI}`);
                        continue;
                    }

                    let metadata;
                    try {
                        const response = await fetch(tokenURI);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const textResponse = await response.text();

                        try {
                            metadata = JSON.parse(textResponse);
                        } catch (jsonError) {
                            throw new Error(`Failed to parse JSON for NFT #${i}: ${jsonError.message}`);
                        }
                    } catch (error) {
                        console.error(`Error fetching or parsing JSON for NFT #${i}:`, error);
                        continue; 
                    }

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
                                <button class="btn btn-primary" onclick="addToCart(${i}, '${priceInEther}', '${metadata.image}')">Add to Cart</button>
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
                        continue;
                    }

                    let metadata;
                    try {
                        const response = await fetch(tokenURI);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        metadata = await response.json();
                    } catch (error) {
                        console.error(`Error fetching or parsing JSON for NFT #${i}:`, error);
                        continue;
                    }

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
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0].toLowerCase();

        const events = await nftContract.getPastEvents('allEvents', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        console.log('Events fetched:', events.length);

        if (events.length === 0) {
            console.log('No events found in the contract.');
            return;
        }

        const tableBody = document.querySelector('#transactionHistoryTable tbody');
        tableBody.innerHTML = '';

        const networkId = await web3.eth.net.getId();
        let etherscanBaseUrl;

        switch (networkId) {
            case 1: 
                etherscanBaseUrl = 'https://etherscan.io';
                break;
            case 3: 
                etherscanBaseUrl = 'https://ropsten.etherscan.io';
                break;
            case 4: 
                etherscanBaseUrl = 'https://rinkeby.etherscan.io';
                break;
            case 5: 
                etherscanBaseUrl = 'https://goerli.etherscan.io';
                break;
            case 11155111n: 
                etherscanBaseUrl = 'https://sepolia.etherscan.io';
                break;
            default:
                etherscanBaseUrl = 'https://etherscan.io'; 
        }

        for (let event of events) {
            let eventType = event.event;
            const { returnValues, transactionHash, blockNumber } = event;

            if (!eventType && event.topics && event.topics.length > 0) {
                const topic0 = event.topics[0];
                switch (topic0) {
                    case "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef":
                        eventType = "Transfer";
                        break;
                    default:
                        continue;
                }
            }

            let nftId = returnValues.tokenId !== undefined ? returnValues.tokenId.toString() : 'N/A';
            let relevantEvent = false;
            let eventDetails = '';
            let details = '';

            if (eventType === 'Transfer' && returnValues.from === "0x0000000000000000000000000000000000000000") {
                eventType = "NFTCreated";
            }

            if (eventType === 'NFTCreated' && returnValues.to.toLowerCase() === userAddress) {
                relevantEvent = true;
                eventDetails = 'NFT Created';
                details = `Creator: ${returnValues.to}`;
            } else if (eventType === 'Transfer' && (returnValues.from.toLowerCase() === userAddress || returnValues.to.toLowerCase() === userAddress)) {
                relevantEvent = true;
                eventDetails = 'NFT Transferred';
                details = `From: ${returnValues.from} <br> To: ${returnValues.to}`;
            }

            if (!relevantEvent) {
                continue;
            }

            const block = await web3.eth.getBlock(blockNumber);
            const timestamp = Number(block.timestamp);
            const date = new Date(timestamp * 1000).toLocaleString();

            const transactionLink = `${etherscanBaseUrl}/tx/${transactionHash}`;

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

async function addToCart(tokenId, price, image) {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0].toLowerCase();
    if (!userCarts[userAddress]) {
        userCarts[userAddress] = [];
    }
    userCarts[userAddress].push({ tokenId, price, image });
    alert(`NFT #${tokenId} added to cart.`);
}

async function displayCart() {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0].toLowerCase();
    const cartPage = document.getElementById('cartPage');
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = '';

    const cart = userCarts[userAddress] || [];

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="NFT Image" style="width: 50px; height: 50px;"></td>
            <td>${item.tokenId}</td>
            <td>${item.price}</td>
            <td><button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('marketplace').style.display = 'none';
    document.getElementById('myNFTs').style.display = 'none';
    document.getElementById('transactionHistoryPage').style.display = 'none';
    cartPage.style.display = 'block';
}

async function removeFromCart(index) {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0].toLowerCase();
    userCarts[userAddress].splice(index, 1);
    displayCart();
}

async function purchaseCart() {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0].toLowerCase();
    try {
        const cart = userCarts[userAddress] || [];
        for (let item of cart) {
            await nftContract.methods.buyNFT(item.tokenId).send({
                from: accounts[0],
                value: web3.utils.toWei(item.price, 'ether')
            });
        }
        alert('Purchase successful!');
        userCarts[userAddress] = []; // Clear cart after purchase
        displayCart();
        displayMarketplaceNFTs(); // Refresh the marketplace
    } catch (error) {
        console.error('Error purchasing NFTs:', error);
        alert('Error purchasing NFTs: ' + error.message);
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

document.addEventListener('DOMContentLoaded', async () => {
    await connectMetamask();
    await displayMarketplaceNFTs();

    document.getElementById('getBalance').addEventListener('click', getBalance);
    document.getElementById('createNFT').addEventListener('click', function () {
        createNFT("https://aqua-left-koala-294.mypinata.cloud/ipfs/QmVbUiCP6K1f9QKYVtQFr6Mu3xLiN7ojB8JezskzCL75pa");
    });

    document.getElementById('showMyNFTs').addEventListener('click', async () => {
        document.getElementById('marketplace').style.display = 'none';
        document.getElementById('myNFTs').style.display = 'flex';
        document.getElementById('transactionHistoryPage').style.display = 'none';
        document.getElementById('cartPage').style.display = 'none';
        await displayUserNFTs();
    });

    document.getElementById('showMarketplace').addEventListener('click', async () => {
        document.getElementById('myNFTs').style.display = 'none';
        document.getElementById('marketplace').style.display = 'flex';
        document.getElementById('transactionHistoryPage').style.display = 'none';
        document.getElementById('cartPage').style.display = 'none';
        await displayMarketplaceNFTs();
    });

    document.getElementById('showTransactionHistory').addEventListener('click', async () => {
        document.getElementById('myNFTs').style.display = 'none';
        document.getElementById('marketplace').style.display = 'none';
        document.getElementById('cartPage').style.display = 'none';
        document.getElementById('transactionHistoryPage').style.display = 'flex';
        await displayTransactionHistory();
    });

    document.getElementById('showCart').addEventListener('click', async () => {
        document.getElementById('myNFTs').style.display = 'none';
        document.getElementById('marketplace').style.display = 'none';
        document.getElementById('transactionHistoryPage').style.display = 'none';
        displayCart();
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

// // const tokenAddress = '0x8d3c1c862735CCe598a7b9c274F59Fe38A717304';
// const nftAddress = '0xdd303Bd0586EF33Dc8b8ec9a10edb6d9ca0026d4'; 
// // const nftAddress = '0x2A5695Af405B3a4b57cB332B358E6655B04EC5Eb';
// const creatorAddress = '0x57697C8b21d6C1Af31CEdf3523E8Fa7Dae9add03';

// let cart = [];

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
//         "name": "tokenURI",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
// ];

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

// async function createNFT(uri) {
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//         alert('Please connect to Metamask');
//         return;
//     }
//     try {
//         await nftContract.methods.createNFT(uri).send({
//             from: accounts[0],
//         });
//         alert('NFT created');
//         displayUserNFTs();
//     } catch (error) {
//         console.error('Error creating NFT:', error);
//         alert('Error creating NFT: ' + error.message);
//     }
// }

// async function displayMarketplaceNFTs() {
//     try {
//         console.log('Fetching total supply of NFTs');
//         const totalSupply = await nftContract.methods.getTokenCounter().call();
//         console.log('Total supply:', totalSupply);
//         const accounts = await web3.eth.getAccounts();
//         const userAddress = accounts[0];
//         const marketplace = document.getElementById('marketplace');
//         marketplace.innerHTML = '';

//         for (let i = 0; i < totalSupply; i++) {
//             try {
//                 console.log(`Fetching owner of NFT #${i}`);
//                 const owner = await nftContract.methods.ownerOf(i).call();
//                 console.log(`Owner of NFT #${i}: ${owner}`);
//                 if (owner.toLowerCase() !== userAddress.toLowerCase()) {
//                     console.log(`Fetching price of NFT #${i}`);
//                     const price = await nftContract.methods.getTokenPrice(i).call();
//                     const priceInEther = web3.utils.fromWei(price, 'ether');
//                     console.log(`Price of NFT #${i}: ${priceInEther}`);

//                     console.log(`Fetching URI of NFT #${i}`);
//                     const tokenURI = await nftContract.methods.tokenURI(i).call();
//                     console.log(`URI of NFT #${i}: ${tokenURI}`);

//                     if (!tokenURI.startsWith('http')) {
//                         console.error(`Invalid URI for NFT #${i}: ${tokenURI}`);
//                         continue;
//                     }

//                     let metadata;
//                     try {
//                         const response = await fetch(tokenURI);
//                         if (!response.ok) {
//                             throw new Error(`HTTP error! status: ${response.status}`);
//                         }

//                         const textResponse = await response.text();
//                         console.log(`Raw response for NFT #${i}:`, textResponse);

//                         // נסה לנתח את התגובה כ-JSON
//                         try {
//                             metadata = JSON.parse(textResponse);
//                         } catch (jsonError) {
//                             throw new Error(`Failed to parse JSON for NFT #${i}: ${jsonError.message}`);
//                         }
//                     } catch (error) {
//                         console.error(`Error fetching or parsing JSON for NFT #${i}:`, error);
//                         continue; // דלג על ה-NFT הזה אם הייתה שגיאה
//                     }

//                     const card = document.createElement('div');
//                     card.className = 'col-md-4';
//                     card.innerHTML = `
//                         <div class="card">
//                             <img src="${metadata.image}" class="card-img-top" alt="NFT Image">
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

//                     let tokenURI;
//                     try {
//                         tokenURI = await nftContract.methods.tokenURI(i).call();
//                     } catch (error) {
//                         console.error(`Error fetching URI for NFT #${i}:`, error);
//                         continue;
//                     }

//                     let metadata;
//                     try {
//                         const response = await fetch(tokenURI);
//                         if (!response.ok) {
//                             throw new Error(`HTTP error! status: ${response.status}`);
//                         }
//                         metadata = await response.json();
//                     } catch (error) {
//                         console.error(`Error fetching or parsing JSON for NFT #${i}:`, error);
//                         continue;
//                     }

//                     const card = document.createElement('div');
//                     card.className = 'col-md-4';
//                     card.innerHTML = `
//                         <div class="card">
//                             <img src="${metadata.image}" class="card-img-top" alt="NFT Image">
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

// async function displayTransactionHistory() {
//     try {
//         const accounts = await web3.eth.getAccounts();
//         const userAddress = accounts[0].toLowerCase();

//         const events = await nftContract.getPastEvents('allEvents', {
//             fromBlock: 0,
//             toBlock: 'latest'
//         });

//         console.log('Events fetched:', events.length);

//         if (events.length === 0) {
//             console.log('No events found in the contract.');
//             return;
//         }

//         const tableBody = document.querySelector('#transactionHistoryTable tbody');
//         tableBody.innerHTML = '';

//         const networkId = await web3.eth.net.getId();
//         let etherscanBaseUrl;

//         switch (networkId) {
//             case 1: 
//                 etherscanBaseUrl = 'https://etherscan.io';
//                 break;
//             case 3: 
//                 etherscanBaseUrl = 'https://ropsten.etherscan.io';
//                 break;
//             case 4: 
//                 etherscanBaseUrl = 'https://rinkeby.etherscan.io';
//                 break;
//             case 5: 
//                 etherscanBaseUrl = 'https://goerli.etherscan.io';
//                 break;
//             case 11155111n: 
//                 etherscanBaseUrl = 'https://sepolia.etherscan.io';
//                 break;
//             default:
//                 etherscanBaseUrl = 'https://etherscan.io'; 
//         }

//         for (let event of events) {
//             let eventType = event.event;
//             const { returnValues, transactionHash, blockNumber } = event;

//             if (!eventType && event.topics && event.topics.length > 0) {
//                 const topic0 = event.topics[0];
//                 switch (topic0) {
//                     case "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef":
//                         eventType = "Transfer";
//                         break;
//                     default:
//                         continue;
//                 }
//             }

//             let nftId = returnValues.tokenId !== undefined ? returnValues.tokenId.toString() : 'N/A';
//             let relevantEvent = false;
//             let eventDetails = '';
//             let details = '';

//             if (eventType === 'Transfer' && returnValues.from === "0x0000000000000000000000000000000000000000") {
//                 eventType = "NFTCreated";
//             }

//             if (eventType === 'NFTCreated' && returnValues.to.toLowerCase() === userAddress) {
//                 relevantEvent = true;
//                 eventDetails = 'NFT Created';
//                 details = `Creator: ${returnValues.to}`;
//             } else if (eventType === 'Transfer' && (returnValues.from.toLowerCase() === userAddress || returnValues.to.toLowerCase() === userAddress)) {
//                 relevantEvent = true;
//                 eventDetails = 'NFT Transferred';
//                 details = `From: ${returnValues.from} <br> To: ${returnValues.to}`;
//             }

//             if (!relevantEvent) {
//                 continue;
//             }

//             const block = await web3.eth.getBlock(blockNumber);
//             const timestamp = Number(block.timestamp);
//             const date = new Date(timestamp * 1000).toLocaleString();

//             const transactionLink = `${etherscanBaseUrl}/tx/${transactionHash}`;

//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${date}</td>
//                 <td>${eventDetails}</td>
//                 <td>${nftId}</td>
//                 <td>${details}</td>
//                 <td><a href="${transactionLink}" target="_blank">View on Etherscan</a></td>
//             `;
//             tableBody.appendChild(row);
//         }
//     } catch (error) {
//         console.error('Error fetching transaction history:', error);
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
//     document.getElementById('createNFT').addEventListener('click', function () {
//         createNFT("https://aqua-left-koala-294.mypinata.cloud/ipfs/QmVbUiCP6K1f9QKYVtQFr6Mu3xLiN7ojB8JezskzCL75pa");
//     });

//     document.getElementById('showMyNFTs').addEventListener('click', async () => {
//         document.getElementById('marketplace').style.display = 'none';
//         document.getElementById('myNFTs').style.display = 'flex';
//         document.getElementById('transactionHistoryPage').style.display = 'none';
//         await displayUserNFTs();
//     });

//     document.getElementById('showMarketplace').addEventListener('click', async () => {
//         document.getElementById('myNFTs').style.display = 'none';
//         document.getElementById('marketplace').style.display = 'flex';
//         document.getElementById('transactionHistoryPage').style.display = 'none';
//         await displayMarketplaceNFTs();
//     });

//     document.getElementById('showTransactionHistory').addEventListener('click', async () => {
//         document.getElementById('myNFTs').style.display = 'none';
//         document.getElementById('marketplace').style.display = 'none';
//         document.getElementById('transactionHistoryPage').style.display = 'flex';
//         await displayTransactionHistory();
//     });
// });
