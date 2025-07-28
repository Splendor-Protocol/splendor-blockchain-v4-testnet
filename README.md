# Splendor Blockchain V4

A revolutionary high-performance blockchain network built on a modified Ethereum codebase with Congress consensus mechanism, integrated system contracts, and an innovative tiered validator system designed for maximum decentralization and fair participation.

## Network Information

- **Network Name**: Splendor RPC
- **RPC URL**: https://splendor-rpc.org/
- **Chain ID**: 2691 (0xA83)
- **Currency Symbol**: SPLD
- **Block Explorer**: https://splendor-rpc.org/
- **Network Launch**: July 2025

## 🌟 Revolutionary Features

### Congress Consensus Mechanism
- **Delegated Proof-of-Stake (DPoS)**: Enhanced with Byzantine fault tolerance
- **Dynamic Validator Set**: Adaptive validator management with performance-based rotation
- **Block Time**: ~1 second average block time with instant finality
- **Energy Efficient**: 99.9% more energy efficient than traditional PoW networks

### 💰 Revolutionary Fee Distribution Model
The network implements a unique **no token burning** fee distribution model:
- **Validators**: 60% of gas fees (infrastructure operators and investors)
- **Stakers**: 30% of gas fees (passive participation rewards)
- **Creator**: 10% of gas fees (protocol development fund)

### 🏆 Tiered Validator System
Our innovative validator system ensures fair participation and network security:

#### Validator Tiers & Requirements
- **Bronze Validator**: 3,947 SPLD (~$1,500 USD equivalent)
- **Silver Validator**: 39,474 SPLD (~$15,000 USD equivalent)  
- **Gold Validator**: 394,737 SPLD (~$150,000 USD equivalent)

#### Validator Requirements
- **Minimum Stake**: 32 SPLD (minimum staking requirement)
- **Bronze Tier Minimum**: 3,947 SPLD (entry-level validator)
- **Performance Threshold**: 99.9% uptime requirement
- **Staking Lock Period**: 86,400 blocks (~24 hours)
- **Maximum Validators**: 10,000 network-wide

### 🏛️ Advanced System Contracts

#### Core System Contracts
- **Validators Contract** (0x000000000000000000000000000000000000f000)
  - Validator registration and management
  - Staking and unstaking mechanisms
  - Performance tracking and rewards distribution
  
- **Punish Contract** (0x000000000000000000000000000000000000F001)
  - Automated slashing conditions
  - Penalty enforcement
  - Blacklist management
  
- **Proposal Contract** (0x000000000000000000000000000000000000F002)
  - On-chain governance system
  - Community proposals and voting
  - Parameter updates and network upgrades

- **Slashing Contract** (0x000000000000000000000000000000000000F003)
  - Double-sign detection and penalties
  - Validator jailing mechanisms
  - Evidence processing and validation

## 🚀 Getting Started

### Prerequisites
- **Go**: 1.15 or higher
- **Node.js**: 14+ LTS version
- **npm**: Latest stable version
- **Git**: Latest version

### System Requirements

#### Validator Nodes
- **Operating System**: Ubuntu >= 20.04 LTS (recommended) or Windows Server 2019+
- **CPU**: 4 cores minimum (Intel/AMD x64) - 8 cores recommended
- **RAM**: 8GB minimum - 16GB recommended
- **Storage**: 100GB high-speed SSD - 500GB NVMe recommended
- **Network**: Stable internet with <50ms latency - 1Gbps recommended
- **Power**: UPS backup system recommended for 24/7 operation

#### RPC Nodes
- **Operating System**: Ubuntu >= 20.04 LTS (recommended) or Windows Server 2019+
- **CPU**: 8 cores minimum - 16 cores recommended
- **RAM**: 16GB minimum - 32GB recommended
- **Storage**: 200GB high-speed SSD - 1TB NVMe recommended
- **Network**: High-bandwidth internet connection - 10Gbps recommended

### 🛠️ Building the Node

```bash
# Clone the repository
git clone https://github.com/Splendor-Protocol/splendor-blockchain-v4.git
cd splendor-blockchain-v4

# Build the blockchain node
cd Core-Blockchain/node_src
go build -o geth.exe ./cmd/geth

# Deploy system contracts
cd ../../System-Contracts
npm install
npx hardhat compile
npx hardhat deploy --network splendor
```

### 🚀 Running a Node

#### Initial Setup
```bash
# Initialize the blockchain with genesis
cd Core-Blockchain
./geth.exe init genesis.json

# Create account for validator
./geth.exe account new --datadir ./data

# Import validator key (if you have one)
./geth.exe account import --datadir ./data your-private-key.txt
```

#### Start the Node
```bash
# Start as validator node
./geth.exe --config config.toml --mine --validator --unlock "YOUR_ADDRESS" --password password.txt

# Start as RPC node
./geth.exe --config config-rpc.toml --http --http.api "eth,net,web3,txpool,debug"
```

### 🔧 Network Configuration

#### Genesis Configuration
- **Chain ID**: 2691 (0xA83) - Splendor mainnet
- **Network ID**: 2691
- **Initial Supply**: 26,000,000,000 SPLD (26 billion)
- **Block Gas Limit**: **300,000,000** (0x11E1A300 in hex, ~300 million gas)
- **Gas Price**: Dynamic (base fee adjusts based on network congestion)

#### Network Parameters
- **Consensus**: Congress (enhanced DPoS)
- **Block Time**: ~1 second
- **Finality**: Instant (2/3 validator signatures)
- **Validator Set Size**: Up to 10,000 validators (dynamic scaling)
- **Epoch Length**: 200 blocks (~3.3 minutes)
- **Validator Rotation**: Every epoch (200 blocks)
- **Slashing Parameters**: 400 SPLD for double-signing, 24-hour jail time

## 🎯 Validator Participation Guide

### How to Become a Validator

1. **Acquire SPLD Tokens**: Purchase SPLD from supported exchanges
2. **Choose Your Tier**: Select from Bronze (3,947 SPLD), Silver (39,474 SPLD), or Gold (394,737 SPLD)
3. **Stake Your Tokens**: Lock tokens in the Validators contract (0x000000000000000000000000000000000000f000)
4. **Run Your Node**: Set up and maintain validator infrastructure
5. **Join Consensus**: Start validating blocks and earning rewards

### Validator Rewards Structure
- **Base Rewards**: Proportional to stake amount
- **Performance Bonuses**: Additional rewards for high uptime
- **Tier Multipliers**: Enhanced rewards for higher tiers
- **Governance Rewards**: Participation in network governance

### Reward Distribution Schedule
- **Daily Rewards**: Distributed every 24 hours
- **Compound Interest**: Auto-compounding for staked rewards
- **Claim Period**: 7-day unbonding period for unstaking

## 🏗️ Development

### System Contracts Development

```bash
# Install dependencies
cd System-Contracts
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to testnet
npx hardhat run scripts/deploy.js --network splendor-testnet

# Verify contracts
npx hardhat verify --network splendor-mainnet CONTRACT_ADDRESS
```

### Node Development

```bash
# Setup development environment
cd Core-Blockchain/node_src
go mod tidy
go mod download

# Build for development
go build -o geth.exe ./cmd/geth

# Run tests
go test ./... -v

# Run benchmark tests
go test ./... -bench=. -benchmem
```

## 📊 Network Statistics

### Current Network Metrics
- **Total Validators**: [To be updated after mainnet launch]
- **Total Staked**: [To be updated after mainnet launch]
- **Average Block Time**: ~1 second (target)
- **Daily Transactions**: [To be updated after mainnet launch]
- **Network Uptime**: 99.9% (target)

### Economic Indicators
- **Market Cap**: [To be updated after mainnet launch]
- **Circulating Supply**: 26,000,000,000 SPLD (26 billion)
- **Staking APR**: [To be determined by network participation]
- **Validator ROI**: [To be determined by network activity]

## 🗳️ Governance System

### On-Chain Governance Features
- **Proposal Creation**: Any SPLD holder can create proposals
- **Voting Power**: Weighted by stake amount and validator tier
- **Proposal Types**: 
  - Parameter updates
  - Contract upgrades
  - Treasury spending
  - Network upgrades

### Governance Process
1. **Proposal Submission**: Create on-chain proposal with 1000 SPLD deposit
2. **Discussion Period**: 7-day community discussion and review
3. **Voting Period**: 7-day on-chain voting window
4. **Implementation**: Automatic execution if passed

## 🔐 Security Features

### Validator Security
- **Multi-signature Management**: Enhanced validator key security
- **Automated Slashing**: Real-time penalty enforcement
- **Performance Monitoring**: 24/7 network health tracking
- **Emergency Pause**: Circuit breaker mechanisms

### Network Security
- **Byzantine Fault Tolerance**: 2/3 honest validator assumption
- **Validator Rotation**: Daily rotation prevents centralization
- **Real-time Monitoring**: Automated threat detection
- **Regular Audits**: Quarterly security assessments

### Slashing Conditions
- **Double Signing**: 5% stake slashing
- **Downtime**: 0.1% per hour after 5% threshold
- **Malicious Behavior**: Up to 100% stake slashing
- **Unavailability**: Temporary jailing mechanism


## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Splendor Protocol team. Empowering decentralized finance for everyone.**
