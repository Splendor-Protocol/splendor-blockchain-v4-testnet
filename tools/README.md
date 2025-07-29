# 🔐 Splendor Wallet Decryption Tools

These tools allow users to decrypt their validator/RPC node keystore files to access their private keys and import them into wallets like MetaMask.

## 📁 Files

- **`wallet-decrypt.html`** - Web-based wallet decryptor (runs in browser)
- **`wallet-decrypt.js`** - Command-line wallet decryptor (Node.js)
- **`README.md`** - This documentation file

## 🌐 Web Tool (wallet-decrypt.html)

### Features
- ✅ Runs entirely in your browser (client-side only)
- ✅ No data sent to servers - completely secure
- ✅ Support for both file upload and JSON paste
- ✅ Beautiful, user-friendly interface
- ✅ Copy buttons for easy wallet import
- ✅ Detailed instructions for MetaMask setup

### How to Use
1. Open `wallet-decrypt.html` in any modern web browser
2. Choose either:
   - **Keystore File**: Upload your keystore file from `./chaindata/node1/keystore/UTC--...`
   - **JSON Input**: Copy and paste the keystore JSON content
3. Enter the password you used during node setup
4. Click "🔓 Decrypt Wallet"
5. Copy the private key and import it into MetaMask

### Security
- All decryption happens in your browser
- Private keys never leave your device
- Always use HTTPS when hosting this tool
- Verify you're on the correct domain

## 💻 CLI Tool (wallet-decrypt.js)

### Features
- ✅ Command-line interface for server administrators
- ✅ Auto-discovery of keystore files
- ✅ Secure password input (hidden)
- ✅ Colorized output for better readability
- ✅ Detailed wallet information and setup instructions

### Requirements
- Node.js (version 12 or higher)
- Access to the chaindata directory

### Usage

#### Basic Usage
```bash
node wallet-decrypt.js <keystore-file> [password]
```

#### Examples
```bash
# Decrypt with password prompt
node wallet-decrypt.js ./chaindata/node1/keystore/UTC--2023-...

# Decrypt with password as argument (less secure)
node wallet-decrypt.js ./chaindata/node1/keystore/UTC--2023-... mypassword

# Find all keystore files
node wallet-decrypt.js --find

# Show help
node wallet-decrypt.js --help
```

#### Find Keystore Files
```bash
node wallet-decrypt.js --find
```
This will scan the `chaindata` directory and show all available keystore files with their node types (Validator/RPC).

### Output Example
```
🔐 Splendor Wallet Decryptor CLI
================================

📁 Loading keystore file: ./chaindata/node1/keystore/UTC--2023-...
🔓 Decrypting wallet...

✅ Wallet decrypted successfully!
================================

📍 Address:
0x1234567890123456789012345678901234567890

🔑 Private Key:
⚠️  KEEP THIS SECRET! Anyone with this key can control your wallet.
0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890

📋 How to use:
1. Import this private key into MetaMask or any Ethereum-compatible wallet
2. Add Splendor Network:
   - Network Name: Splendor
   - RPC URL: https://splendor-rpc.org/
   - Chain ID: 2691
   - Currency Symbol: SPL
3. Your SPL tokens and validator rewards will appear in the wallet
```

## 🔧 How Keystore Files Work

When you set up a validator or RPC node using `node-setup.sh`, the system:

1. **Creates Account**: Uses `geth account new` to generate a new Ethereum-compatible account
2. **Stores Keystore**: Saves the encrypted private key in `./chaindata/nodeX/keystore/UTC--...`
3. **Password Protection**: Encrypts the keystore with your chosen password
4. **File Location**: Keystore files are stored in the respective node's directory

### Keystore File Structure
```json
{
  "address": "1234567890123456789012345678901234567890",
  "crypto": {
    "cipher": "aes-128-ctr",
    "ciphertext": "...",
    "cipherparams": {"iv": "..."},
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "..."
    },
    "mac": "..."
  },
  "id": "...",
  "version": 3
}
```

## 🛡️ Security Best Practices

### For Users
- ✅ Always verify the tool's authenticity before use
- ✅ Use the web tool on HTTPS domains only
- ✅ Never share your private key with anyone
- ✅ Store private keys in secure locations (password managers, hardware wallets)
- ✅ Double-check wallet addresses before sending funds

### For Administrators
- ✅ Host the web tool on secure, trusted domains
- ✅ Use the CLI tool on secure servers only
- ✅ Regularly backup keystore files
- ✅ Use strong passwords for keystore encryption
- ✅ Limit access to keystore directories

## 🌐 MetaMask Setup

After decrypting your wallet:

1. **Open MetaMask** and click "Import Account"
2. **Select "Private Key"** as import method
3. **Paste your private key** (starts with 0x)
4. **Add Splendor Network**:
   - Network Name: `Splendor`
   - New RPC URL: `https://splendor-rpc.org/`
   - Chain ID: `2691`
   - Currency Symbol: `SPL`
   - Block Explorer URL: (optional)

## 🆘 Troubleshooting

### Common Issues

**"Invalid password" error**
- Double-check the password you used during node setup
- Ensure you're using the correct keystore file
- Try copying the password to avoid typing errors

**"Keystore file not found"**
- Verify the file path is correct
- Check that the keystore directory exists
- Ensure you have read permissions

**"Unsupported KDF" error**
- The keystore uses an unsupported key derivation function
- Contact support with your keystore file (remove sensitive data first)

**Web tool not working**
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check that JavaScript is enabled
- Try refreshing the page

### Getting Help

If you encounter issues:
1. Check this README for solutions
2. Verify your node setup was completed successfully
3. Ensure you have the correct password and keystore file
4. Contact the Splendor team for technical support

## 📝 License

These tools are part of the Splendor blockchain project and are provided as-is for validator and RPC node operators.

---

**⚠️ Important**: Always keep your private keys secure and never share them with anyone. The Splendor team will never ask for your private keys.
