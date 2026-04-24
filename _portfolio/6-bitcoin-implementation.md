---
title: "Bitcoin Paper Implementation"
excerpt: 'Python implementation of the original Bitcoin whitepaper. Proof of Work, blockchain, P2P network simulation. <a href="[https://github.com/rubzip/bitcoin-paper-implementation](https://github.com/rubzip/bitcoin-paper-implementation)" target="_blank">Code</a>'
collection: portfolio
---

I recently read Satoshi Nakamoto's original Bitcoin whitepaper and decided to build a functional implementation of it in Python. This project covers all the core concepts from the paper, translating the theory into working code.

You can check out the complete repository here: **[rubzip/bitcoin-paper-implementation](https://github.com/rubzip/bitcoin-paper-implementation)**.

---

## **Key Ideas: The Philosophy of Digital Gold**

After reading the paper, I realized that Satoshi essentially set out to create a decentralized, electronic version of gold. 

From an **economic perspective**, he designed a self-sustaining ecosystem where nodes (miners) are compensated for their computational effort. To ensure scarcity—much like physical gold—the system computationally limits the creation of new coins. Over time, the mining reward is programmed to decrease (halving), eventually capping the total supply at 21 million coins. When the global amount of 21 million coins is achieved, miners don't receive new coins, they receive a small transaction commission. The protocol also controls the creation rate of new blocks by dynamically increasing the computational cost to mine them.

From a **security perspective**, Satoshi was deeply concerned about malicious nodes taking over. He theorized that if the incentives for honest nodes outweigh the potential gains of malicious ones, the system naturally converges toward security. By enforcing a high computational cost to create blocks (penalizing attackers) while financially rewarding honest miners, the network protects itself.

---

## **Core Concepts Explained**

### **1. Decentralized & Public**
Satoshi concluded that a truly decentralized network must be public. Every single transaction is broadcasted to the entire network for verification.

### **2. Privacy Through Cryptography**
While the ledger is public, identities remain private. The system relies on public and private key cryptography. However, there is a trade-off: if someone associates your real identity with your public key, your entire transaction history becomes visible.

### **3. P2P Network & Majority Rule**
The network consists of interconnected peer nodes, each maintaining a copy of the blockchain. The system achieves consensus by accepting the "truth" as whatever the majority ($> 51\%$) of the network's computing power agrees upon. In cases where two miners find a block at almost the same time, the network resolves the conflict by adopting the longest chain.

### **4. Hashing and The Chain**
Each block contains a cryptographic hash representing its contents, which crucially includes the hash of the *previous* block. This creates an immutable chain. If you alter data in a past block, its hash changes, breaking the link to the next block. To successfully forge a past block, an attacker would have to re-mine it and all subsequent blocks faster than the honest network—theoretically impossible without controlling the majority of the hash rate.

### **5. Proof of Work (Mining)**
Creating a block must be computationally expensive to stop malicious spamming. The original concept imposed a rule: a valid block's hash must start with a specific number of zeros. 

To achieve this, miners iterate an integer parameter called a `nonce` until the resulting hash meets the criteria. This process is called **mining**. It is highly intensive to compute, but incredibly cheap for the rest of the network to verify.

Here is the core logic in Python:

```python
def mine(self) -> str:
    while not ZerosPOW.is_valid_hash(self.hash):
        self.nonce += 1
        self.hash = self.get_hash()
    return self.hash
```

**The Math Behind the Difficulty:**
If we define a Proof of Work (PoW) where the first $d$ (difficulty) digits of the hexadecimal hash must be zero, the probability of randomly finding a valid hash on a single attempt is $p = 16^{-d}$. 

Because each attempt is an independent Bernoulli trial, the number of attempts follows a geometric distribution. The expected number of attempts ($E[X]$) and the variance ($\text{Var}[X]$) to find a valid nonce are:

$$E[X] = \sum_{i=1}^{\infty} i \cdot (1-p)^{i-1} p = \frac{1}{p} = 16^d$$

$$\text{Var}[X] = \sum_{i=1}^{\infty} (i-\mu)^2 p(1-p)^{i-1} = \frac{1-p}{p^2} \approx \frac{1}{p^2} = 16^{2d}$$

This results in an average computational cost of $O(16^d)$ to mine a single block.

### **6. Rewards (Coinbase) & Scarcity**
Referred to as the "Coinbase" in the original paper, this is the incentive given to the miner who discovers a valid nonce. It serves two purposes: it creates new coins, and it incentivizes honest network participation. To mimic precious metals, the reward is halved every 210,000 blocks (roughly every 4 years). Once the 21 million cap is reached, miners will be compensated entirely by transaction fees.

---

## **The Implementation**

I built the core logic entirely in Python, structuring it around four primary classes:
* `Transaction`: The minimum unit of value transfer.
* `Block`: A collection of transactions, containing the previous hash, a hashing method, a mine method, and the nonce.
* `Blockchain`: The data structure linking the blocks.
* `Node`: Represents a network participant, containing a copy of the blockchain and a mempool of unconfirmed transactions.

### **Network Simulation**
To simulate the P2P network, I used **FastAPI** to create a REST API for each node. While a true P2P network doesn't rely on central servers, I implemented a central registry API to act as a DNS seeder. Nodes register themselves on startup, allowing them to discover other active peers. 

When a block is mined, the node broadcasts it to the network. Receiving nodes verify the proof of work and the chain history. Invalid blocks are discarded. Valid blocks that don't belong to the longest chain are also ignored. Additionally, with the help of Gemini, I integrated a simple dashboard to visualize the blockchain, inspect transactions, and simulate network activity.

### **Project Structure**

```text
.
├── bitcoin/
│   ├── api/            # FastAPI models, routes, and templates
│   ├── blockchain/     # Core logic: Proof of Work, Ledger, and Node
├── logs/               # Node and Registry logs (git ignored)
├── tests/              # Pytest integration & unit tests
├── main.py             # CLI entrypoint
└── run_network.sh      # Orchestration script
```

### **Running the Network**

You can easily spin up the simulation locally using `uv`:

```bash
uv venv
uv pip install -r requirements.txt
uv run pytest

# Launch a registry + 4 nodes (default)
./run_network.sh

# Launch a registry + 8 nodes
./run_network.sh 8
```

---

## **To-Do / Future Improvements**

Currently, the implementation uses a simplified account-based transaction model (e.g., *Alice -> Bob: 10 coins*). However, to truly align with the original paper, I need to implement two major features:
1.  **UTXOs (Unspent Transaction Outputs):** The actual method Bitcoin uses to track ownership.
2.  **Merkle Trees:** For efficient and secure verification of transactions within a block, enabling SPV (Simplified Payment Verification) clients.
