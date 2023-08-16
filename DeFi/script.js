// Import ethers library
const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/');

const contractAddress = '0x142Ecb9EB214acbDaF61fe091346E972A15Cc50a';
const contractABI = [[
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
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
]];

// Connect to the contract using the provider and signer
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Update balance on the page
async function updateBalance() {
    const signer = provider.getSigner();
    const balance = await contract.balances(signer.getAddress());
    document.getElementById('balance').textContent = ethers.utils.formatEther(balance);
}

// Deposit function
document.getElementById('depositButton').addEventListener('click', async () => {
    const signer = provider.getSigner();
    const depositAmount = ethers.utils.parseEther(document.getElementById('depositAmount').value);
    const tx = await contract.deposit({ value: depositAmount });
    await tx.wait();
    updateBalance();
});

// Withdraw function
document.getElementById('withdrawButton').addEventListener('click', async () => {
    const signer = provider.getSigner();
    const withdrawAmount = ethers.utils.parseEther(document.getElementById('withdrawAmount').value);
    const tx = await contract.withdraw(withdrawAmount);
    await tx.wait();
    updateBalance();
});

updateBalance();
