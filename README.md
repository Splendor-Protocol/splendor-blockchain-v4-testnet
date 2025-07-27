# Splendor Blockchain V4

A high-performance blockchain network built on a modified Ethereum codebase with Congress consensus mechanism and integrated system contracts.

## Network Information

- **Network Name**: Splendor RPC
- **RPC URL**: https://splendor-rpc.org/
- **Chain ID**: 2691 (0xA83)
- **Currency Symbol**: SPLD
- **Block Explorer**: https://splendor-rpc.org/

## Key Features

### Consensus Mechanism
- **Congress Consensus**: A Delegated Proof-of-Stake (DPoS) based consensus mechanism
- **Validator Management**: Dynamic validator set with staking and slashing mechanisms
- **Block Time**: ~1 second average block time
- **Finality**: Fast finality with validator signatures

### Fee Distribution
The network implements a unique fee distribution model with **no token burning**:
- **Validators**: 60% of gas fees (infrastructure operators and investors)
- **Stakers**: 30% of gas fees (passive participation rewards)
- **Creator**: 10% of gas fees (protocol development fund)

### System Contracts
- **Validators Contract** (0xF000): Core validator registration, staking, and rewards
- **Punish Contract** (0xF001): Handles validator penalties and slashing conditions  
- **Proposal Contract** (0xF002): Governance and proposal voting system
- **Params Contract**: Network parameter management
- **ValidatorHelper Contract**: Enhanced validator rewards and tier-based staking system

## Architecture

### Core Components
1. **Core-Blockchain**: Modified go-ethereum node implementation
2. **System-Contracts**: Solidity smart contracts for network governance
3. **Congress Consensus**: Custom consensus engine for validator coordination

### Network Parameters
- **Gas Limit**: 2,000,000,000,000,000 per block (0x1C9C38000000000)
- **Gas Price**: Dynamic pricing based on network congestion
- **Validator Requirements**: Minimum stake and performance criteria
- **Slashing Conditions**: Automated penalties for malicious behavior

## Getting Started

### Prerequisites
- Go 1.15 or higher
- Node.js 14+ and npm
- Git

### System Requirements

#### Validator Nodes
- **OS**: Ubuntu >= 20.04 LTS
- **CPU**: 4 cores minimum (Intel/AMD x64)
- **RAM**: 8GB minimum
- **Storage**: 100GB high-speed SSD
- **Network**: Stable internet with low latency

#### RPC Nodes
- **OS**: Ubuntu >= 20.04 LTS  
- **CPU**: 8 cores minimum (Intel/AMD x64)
- **RAM**: 16GB minimum
- **Storage**: 200GB high-speed SSD
- **Network**: High-bandwidth internet connection

### Building the Node

```bash
# Clone the repository
git clone <repository-url>
cd splendor-blockchain-v4

# Build the blockchain node
cd Core-Blockchain/node_src
go build -o geth.exe ./cmd/geth

# Deploy system contracts
cd ../../System-Contracts
npm install
npx hardhat compile
```

### Running a Node

```bash
# Initialize the blockchain with genesis
cd Core-Blockchain
./geth.exe init genesis.json

# Start the node
./geth.exe --config config.toml
```

### Network Configuration

The network uses a custom genesis configuration with:
- Pre-deployed system contracts
- Initial validator set
- Network parameters optimized for performance

## Development

### System Contracts Development

```bash
cd System-Contracts
npm install
npx hardhat compile
npx hardhat test
```

### Node Development

```bash
cd Core-Blockchain/node_src
go mod tidy
go build ./cmd/geth
go test ./...
```

## Governance

The network features on-chain governance through:
- **Proposal System**: Community-driven proposals for network upgrades
- **Validator Voting**: Weighted voting based on stake
- **Parameter Updates**: Dynamic adjustment of network parameters

## Security

### Validator Security
- Multi-signature validator management
- Automated slashing for malicious behavior
- Regular security audits and updates

### Network Security
- Congress consensus provides Byzantine fault tolerance
- Validator rotation and performance monitoring
- Real-time network monitoring and alerting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Support

For technical support and questions:
- GitHub Issues: [Repository Issues](https://github.com/your-repo/issues)
- Documentation: [Network Documentation](https://docs.splendor-rpc.org/)
- Community: [Discord Server](https://discord.gg/splendor)

## Roadmap

### Phase 1 (Current)
- ✅ Core blockchain implementation
- ✅ System contracts deployment
- ✅ Congress consensus mechanism
- ✅ Fee distribution system

### Phase 2 (Upcoming)
- [ ] Cross-chain bridge integration
- [ ] Enhanced governance features
- [ ] Mobile wallet support
- [ ] Developer tooling improvements

### Phase 3 (Future)
- [ ] Layer 2 scaling solutions
- [ ] Advanced DeFi integrations
- [ ] Enterprise partnerships
- [ ] Global validator network expansion
