# Splendor RPC Blockchain v4

[![Security Status](https://img.shields.io/badge/Security-Audited-green.svg)](./SECURITY_FIXES_APPLIED.md)
[![Byzantine Fault Tolerance](https://img.shields.io/badge/BFT-Implemented-blue.svg)](./BYZANTINE_FAULT_TOLERANCE_SOLUTION.md)
[![EIP-1559](https://img.shields.io/badge/EIP--1559-Compliant-orange.svg)](./CHANGELOG.md)

A secure, high-performance blockchain network with Byzantine Fault Tolerance and EIP-1559 compliance.

## 🚀 Latest Release: v2.0.0 - Security Audit Implementation

**All critical security vulnerabilities have been addressed and the network is production-ready.**

### 🔒 Security Features
- ✅ **Byzantine Fault Tolerance**: Complete protection against malicious validators
- ✅ **Slashing Mechanism**: Economic penalties for validator misbehavior
- ✅ **EIP-1559 Compliance**: Standards-compliant fee market mechanism
- ✅ **Cryptographic Verification**: ECDSA-based double-sign detection

## 📋 Quick Start

### Prerequisites
- Go 1.19+
- Node.js 16+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Splendor-Protocol/splendor-blockchain-v4.git
cd splendor-blockchain-v4

# Build the blockchain node
cd Core-Blockchain/node_src
make geth

# Install smart contract dependencies
cd ../../System-Contracts
npm install
```

### Running a Node

```bash
# Start a validator node
cd Core-Blockchain
./node-start.sh
```

## 🏗️ Architecture

### Core Components

#### 1. Core Blockchain (`Core-Blockchain/`)
- **Consensus**: Congress consensus with Byzantine Fault Tolerance
- **EIP-1559**: Compliant fee market implementation
- **P2P Network**: Secure peer-to-peer communication
- **State Management**: Efficient state storage and retrieval

#### 2. System Contracts (`System-Contracts/`)
- **Validators.sol**: Validator management and staking
- **Slashing.sol**: Byzantine fault punishment mechanism
- **Params.sol**: Network parameter management
- **Proposal.sol**: Governance proposal system

### Network Economics

| Participant | Fee Share | Role |
|-------------|-----------|------|
| **Validators** | 60% | Infrastructure investment and block production |
| **Stakers** | 30% | Passive participation and network security |
| **Creator** | 10% | Protocol development and maintenance |

*No token burning - all fees are distributed to network participants*

## 🔐 Security Audit Results

### ✅ Resolved Critical Issues

#### GLOBAL-03: Byzantine Fault Tolerance (CRITICAL)
- **Status**: FULLY IMPLEMENTED
- **Solution**: Complete slashing mechanism with cryptographic verification
- **Impact**: Network can now handle up to 33% malicious validators

#### EIP-01: EIP-1559 Compliance (HIGH)
- **Status**: FIXED
- **Solution**: Proper base fee calculation implementation
- **Impact**: Dynamic fee market instead of free transactions

#### Additional Fixes
- **GAS-01**: Parameter consistency improvements
- **CZC-03**: Deprecated function updates

📖 **[View Complete Security Analysis](./SECURITY_FIXES_APPLIED.md)**

## 🛡️ Byzantine Fault Tolerance

### Slashing Mechanism
- **Double-Sign Detection**: Cryptographic proof of conflicting signatures
- **Economic Penalties**: Up to 50% stake loss + 1M base tokens
- **Validator Jailing**: 24-hour suspension for violations
- **Tier System**: Bronze/Silver/Gold/Platinum with different penalty rates

### Evidence Submission
Anyone can submit evidence of validator misbehavior:
```solidity
function submitDoubleSignEvidence(
    bytes32 blockHash1,
    bytes32 blockHash2,
    bytes memory signature1,
    bytes memory signature2,
    address validator
) external
```

📖 **[View BFT Implementation Guide](./BYZANTINE_FAULT_TOLERANCE_SOLUTION.md)**

## 📊 Network Statistics

### Consensus Parameters
- **Block Time**: 1 second
- **Epoch Length**: 200 blocks
- **Validator Set Size**: Up to 10,000 active validators
- **Minimum Stake**: 3,947 SPLD (Bronze Tier)

### Economic Parameters
- **Base Slashing**: 400 SPLD tokens (10% of Bronze minimum)
- **Percentage Slashing**: Up to 20% of stake
- **Jail Duration**: 86,400 blocks (24 hours)
- **Unjail Process**: Validator voting (50%+1 majority) via Proposal contract

## 🚀 Deployment

### Production Deployment
1. **Smart Contract Deployment**
   ```bash
   cd System-Contracts
   npx hardhat deploy --network mainnet
   ```

2. **Node Configuration**
   ```bash
   cd Core-Blockchain
   ./node-setup.sh
   ```

3. **Network Initialization**
   ```bash
   ./node-start.sh --validator --unlock <validator-address>
   ```

📖 **[View Complete Deployment Guide](./DEPLOYMENT_GUIDE.md)**

## 🔧 Development

### Building from Source

```bash
# Build blockchain node
cd Core-Blockchain/node_src
make all

# Compile smart contracts
cd ../../System-Contracts
npx hardhat compile

# Run tests
npx hardhat test
```

### Testing

```bash
# Run blockchain tests
cd Core-Blockchain/node_src
make test

# Run smart contract tests
cd ../../System-Contracts
npx hardhat test

# Run integration tests
npm run test:integration
```

## 📚 Documentation

- **[Changelog](./CHANGELOG.md)** - Complete version history
- **[Security Fixes](./SECURITY_FIXES_APPLIED.md)** - Audit implementation summary
- **[BFT Solution](./BYZANTINE_FAULT_TOLERANCE_SOLUTION.md)** - Byzantine fault tolerance guide
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Security Contributions
For security-related contributions, please:
1. Review our [Security Policy](./Core-Blockchain/node_src/SECURITY.md)
2. Follow responsible disclosure practices
3. Include comprehensive tests for security features

## 📄 License

This project is licensed under the GNU Lesser General Public License v3.0 - see the [LICENSE](./Core-Blockchain/node_src/COPYING.LESSER) file for details.

## 🌐 Network Information

### Mainnet
- **Network Name**: Splendor RPC
- **Chain ID**: 2691
- **RPC URL**: https://splendor-rpc.org/
- **Explorer**: TBD

### Testnet
- **Network Name**: Splendor Testnet
- **Chain ID**: 256
- **RPC URL**: https://testnet.splendor-rpc.org/
- **Faucet**: TBD

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/Splendor-Protocol/splendor-blockchain-v4/wiki)
- **Issues**: [GitHub Issues](https://github.com/Splendor-Protocol/splendor-blockchain-v4/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Splendor-Protocol/splendor-blockchain-v4/discussions)

## 🏆 Acknowledgments

- Ethereum Foundation for EIP-1559 specification
- Go-Ethereum team for the base implementation
- Security auditors for identifying critical vulnerabilities
- Community contributors for ongoing development

---

**⚡ Splendor RPC - Secure, Fast, Decentralized**

*Built with Byzantine Fault Tolerance and EIP-1559 compliance for the next generation of blockchain applications.*
