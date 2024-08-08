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

const tokenAddress = '0x8d3c1c862735CCe598a7b9c274F59Fe38A717304';
const nftAddress = '0x2A5695Af405B3a4b57cB332B358E6655B04EC5Eb';
const creatorAddress = '0x57697C8b21d6C1Af31CEdf3523E8Fa7Dae9add03';

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

async function createNFT() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        alert('Please connect to Metamask');
        return;
    }
    try {
        await nftContract.methods.createNFT().send({ from: accounts[0] });
        alert('NFT created');
        displayNFTs();
    } catch (error) {
        console.error('Error creating NFT:', error);
        alert('Error creating NFT: ' + error.message);
    }
}

async function displayMarketplaceNFTs() {
    try {
        const totalSupply = await nftContract.methods.getTokenCounter().call();
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

                    const card = document.createElement('div');
                    card.className = 'col-md-4';
                    card.innerHTML = `
                        <div class="card">
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

                    const card = document.createElement('div');
                    card.className = 'col-md-4';
                    card.innerHTML = `
                        <div class="card">
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
    document.getElementById('createNFT').addEventListener('click', createNFT);
    document.getElementById('showMyNFTs').addEventListener('click', async () => {
        document.getElementById('marketplace').style.display = 'none';
        document.getElementById('myNFTs').style.display = 'block';
        await displayUserNFTs();
    });
    document.getElementById('showMarketplace').addEventListener('click', async () => {
        document.getElementById('myNFTs').style.display = 'none';
        document.getElementById('marketplace').style.display = 'block';
        await displayMarketplaceNFTs();
    });
});