# Splendor Blockchain V4

A high-performance blockchain network built on a modified Ethereum codebase with Delegated Proof-of-Stake (DPoS) consensus mechanism and integrated system contracts. Splendor RPC is designed for maximum decentralization with support for up to 10,000 validators.

## Network Information

- **Network Name**: Splendor RPC
- **RPC URL**: https://splendor-rpc.org/
- **Chain ID**: 2691 (0xA83)
- **Currency Symbol**: SPLD
- **Block Explorer**: https://splendor-rpc.org/
- **Consensus**: Delegated Proof-of-Stake (DPoS)
- **Block Time**: ~1 second
- **Epoch Size**: 200 blocks

## 🌟 Key Features

### Congress Consensus Mechanism
- **Delegated Proof-of-Stake (DPoS)**: Enhanced consensus with Byzantine fault tolerance
- **Dynamic Validator Set**: Up to 10,000 active validators with automatic rotation
- **Fast Finality**: ~1 second block time with instant transaction finality
- **Energy Efficient**: 99.9% more energy efficient than Proof-of-Work networks

### 💰 Revolutionary Fee Distribution Model
The network implements a unique **no token burning** fee distribution model:
- **Validators**: 60% of gas fees (infrastructure operators and investors)
- **Stakers**: 30% of gas fees (passive participation rewards)
- **Creator**: 10% of gas fees (protocol development fund)

### 🏆 Three-Tier Validator System
Splendor RPC implements a transparent three-tier validator system based on staking amounts:

#### Bronze Tier (Entry Level)
- **Minimum Stake**: 3,947 SPLD (~$1,500)
- **Target**: New validators and smaller participants
- **Benefits**: Basic validator rewards and network participation

#### Silver Tier (Mid Level)
- **Minimum Stake**: 39,474 SPLD (~$15,000)
- **Target**: Committed validators with higher investment
- **Benefits**: Enhanced network influence and rewards

#### Gold Tier (Premium Level)
- **Minimum Stake**: 394,737 SPLD (~$150,000)
- **Target**: Major validators and institutional participants
- **Benefits**: Maximum network influence and premium rewards

**Automatic Tier Management**: Validator tiers are automatically assigned and updated based on total staking amount (including delegated stakes).

### 🏛️ System Contracts Architecture

#### Core System Contracts
- **Validators Contract** (0x000000000000000000000000000000000000F000)
  - Validator registration and management
  - Staking and unstaking mechanisms
  - Performance tracking and rewards distribution
  - Tier-based validator classification

- **Punish Contract** (0x000000000000000000000000000000000000F001)
  - Automated slashing conditions
  - Penalty enforcement for misbehaving validators
  - Blacklist management

- **Proposal Contract** (0x000000000000000000000000000000000000F002)
  - On-chain governance system
  - Community proposals and voting
  - Parameter updates and network upgrades

## 🚀 Getting Started

### Prerequisites
- **Go**: 1.15 or higher
- **Node.js**: 14+ LTS version
- **npm**: Latest stable version
- **Git**: Latest version

### System Requirements

#### Validator Nodes
- **Operating System**: Ubuntu >= 20.04 LTS (recommended)
- **CPU**: 4 cores minimum (Intel/AMD x64)
- **RAM**: 8GB minimum
- **Storage**: 100GB high-speed SSD
- **Network**: Stable internet with low latency

#### RPC Nodes
- **Operating System**: Ubuntu >= 20.04 LTS (recommended)
- **CPU**: 8 cores minimum (Intel/AMD x64)
- **RAM**: 16GB minimum
- **Storage**: 200GB high-speed SSD
- **Network**: High-bandwidth internet connection

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
```

### 🚀 Running a Node

#### Initial Setup
```bash
# Initialize the blockchain with genesis
cd Core-Blockchain
./geth.exe init genesis.json

# Create account for validator
./geth.exe account new --datadir ./data
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
- **Initial Supply**: 100,000,000 SPLD
- **Block Gas Limit**: 2,000,000,000,000,000 (2 quadrillion)
- **Gas Price**: Dynamic pricing based on network congestion
- **Consensus**: Congress (enhanced DPoS)
- **Epoch Size**: 200 blocks

## 🎯 Validator Participation Guide

### How to Become a Validator

1. **Acquire SPLD Tokens**: Purchase SPLD from supported exchanges
2. **Choose Your Tier**: Select from Bronze (3,947 SPLD), Silver (39,474 SPLD), or Gold (394,737 SPLD)
3. **Stake Your Tokens**: Lock tokens in the Validators contract
4. **Run Your Node**: Set up and maintain validator infrastructure
5. **Join Consensus**: Start validating blocks and earning rewards

### Staking Process
1. **Create Validator**: Call `createOrEditValidator` with fee address and moniker
2. **Stake Tokens**: Send staking transaction to chosen validator
3. **Automatic Tier Assignment**: System automatically assigns tier based on total staking
4. **Start Earning**: Begin receiving rewards immediately

### Unstaking Process
1. **Send Unstake Transaction**: Call unstaking function on Validators contract
2. **Wait Lock Period**: 86,400 blocks (approximately 24 hours) lock period
3. **Withdraw Tokens**: Send withdrawal transaction to retrieve staked coins

### Reward Distribution
- **Daily Rewards**: Distributed every epoch (200 blocks)
- **Compound Interest**: Auto-compounding for staked rewards
- **Claim Period**: Immediate reward withdrawal available

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
```

## 🔐 Security Features

### Validator Security
- **Automated Slashing**: Real-time penalty enforcement for misbehavior
- **Performance Monitoring**: 24/7 network health tracking
- **Punishment System**: Validators face penalties for:
  - Missing block production
  - Double signing
  - Network downtime
  - Malicious behavior

### Network Security
- **Byzantine Fault Tolerance**: 2/3 honest validator assumption
- **Validator Rotation**: Automatic rotation prevents centralization
- **Real-time Monitoring**: Automated threat detection

## 📊 Network Statistics

### Current Network Status
- **Network Launch**: July 2025
- **Consensus**: Congress DPoS
- **Validator Capacity**: Up to 10,000 validators
- **Block Time**: ~1 second
- **Epoch Size**: 200 blocks

### Economic Parameters
- **Total Supply**: 100,000,000 SPLD
- **Initial Allocation**: Genesis block allocation
- **Staking Requirements**: 3,947 - 394,737 SPLD (tier-based)
- **Fee Distribution**: 60/30/10 model (validators/stakers/development)

## 🗳️ Governance System

### On-Chain Governance
- **Proposal Creation**: Any SPLD holder can create proposals
- **Voting Power**: Weighted by stake amount and validator tier
- **Proposal Types**: Parameter updates, contract upgrades, treasury spending

### Governance Process
1. **Proposal Submission**: Create on-chain proposal
2. **Discussion Period**: Community review and discussion
3. **Voting Period**: On-chain voting with stake-weighted votes
4. **Implementation**: Automatic execution if passed

## 🤝 Contributing

### Development Guidelines
1. **Fork the repository** on GitHub
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request** with detailed description

### Code Standards
- **Go**: Follow standard Go formatting and linting
- **Solidity**: Use OpenZeppelin contracts and best practices
- **Testing**: Maintain >90% test coverage
- **Documentation**: Update docs for all changes

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Resources

### Technical Support
- **GitHub Issues**: [Report bugs and issues](https://github.com/Splendor-Protocol/splendor-blockchain-v4/issues)
- **Documentation**: [Comprehensive docs](https://docs.splendor-rpc.org/)
- **Block Explorer**: [View transactions](https://splendor-rpc.org/)

### Community Channels
- **Discord**: [Join our community](https://discord.gg/splendor)
- **Twitter**: [Follow updates](https://twitter.com/splendor_chain)

---

**Built with ❤️ by the Splendor Protocol team. Empowering decentralized finance through fair and transparent blockchain infrastructure.**
