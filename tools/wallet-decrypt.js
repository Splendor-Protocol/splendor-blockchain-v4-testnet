#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function colorize(text, color) {
    return colors[color] + text + colors.reset;
}

function showBanner() {
    console.log(colorize('\n🔐 Splendor Wallet Decryptor CLI', 'cyan'));
    console.log(colorize('================================', 'cyan'));
    console.log('Decrypt validator/RPC node keystore files\n');
}

function showUsage() {
    console.log(colorize('Usage:', 'yellow'));
    console.log('  node wallet-decrypt.js <keystore-file> [password]');
    console.log('  node wallet-decrypt.js --help\n');
    
    console.log(colorize('Examples:', 'yellow'));
    console.log('  node wallet-decrypt.js ./chaindata/node1/keystore/UTC--2023-...');
    console.log('  node wallet-decrypt.js keystore.json mypassword\n');
    
    console.log(colorize('Options:', 'yellow'));
    console.log('  --help, -h    Show this help message');
    console.log('  --find, -f    Find all keystore files in chaindata directory\n');
}

function findKeystoreFiles() {
    console.log(colorize('🔍 Searching for keystore files...', 'blue'));
    
    const chaindataPath = './chaindata';
    if (!fs.existsSync(chaindataPath)) {
        console.log(colorize('❌ chaindata directory not found', 'red'));
        return;
    }
    
    const keystoreFiles = [];
    
    try {
        const nodes = fs.readdirSync(chaindataPath);
        
        for (const node of nodes) {
            const nodePath = path.join(chaindataPath, node);
            const keystorePath = path.join(nodePath, 'keystore');
            
            if (fs.existsSync(keystorePath) && fs.statSync(keystorePath).isDirectory()) {
                const files = fs.readdirSync(keystorePath);
                
                for (const file of files) {
                    if (file.startsWith('UTC--')) {
                        const fullPath = path.join(keystorePath, file);
                        keystoreFiles.push({
                            node: node,
                            file: file,
                            path: fullPath,
                            isValidator: fs.existsSync(path.join(nodePath, '.validator')),
                            isRpc: fs.existsSync(path.join(nodePath, '.rpc'))
                        });
                    }
                }
            }
        }
        
        if (keystoreFiles.length === 0) {
            console.log(colorize('❌ No keystore files found', 'red'));
            return;
        }
        
        console.log(colorize(`\n✅ Found ${keystoreFiles.length} keystore file(s):`, 'green'));
        
        keystoreFiles.forEach((item, index) => {
            const type = item.isValidator ? 'Validator' : item.isRpc ? 'RPC' : 'Unknown';
            console.log(`\n${index + 1}. ${colorize(item.node, 'cyan')} (${colorize(type, 'yellow')})`);
            console.log(`   File: ${item.file}`);
            console.log(`   Path: ${item.path}`);
        });
        
        console.log(colorize('\nTo decrypt a wallet, use:', 'blue'));
        console.log(`node wallet-decrypt.js "${keystoreFiles[0].path}"`);
        
    } catch (error) {
        console.log(colorize(`❌ Error searching for keystore files: ${error.message}`, 'red'));
    }
}

async function decryptKeystore(keystoreData, password) {
    const crypto_data = keystoreData.crypto || keystoreData.Crypto;
    
    if (crypto_data.kdf === 'scrypt') {
        return await decryptScrypt(keystoreData, password);
    } else if (crypto_data.kdf === 'pbkdf2') {
        return await decryptPbkdf2(keystoreData, password);
    } else {
        throw new Error('Unsupported KDF: ' + crypto_data.kdf);
    }
}

async function decryptScrypt(keystore, password) {
    const crypto_data = keystore.crypto || keystore.Crypto;
    const kdfparams = crypto_data.kdfparams;
    
    // Use Node.js built-in scrypt
    const derivedKey = crypto.scryptSync(
        password,
        Buffer.from(kdfparams.salt, 'hex'),
        kdfparams.dklen,
        {
            N: kdfparams.n,
            r: kdfparams.r,
            p: kdfparams.p
        }
    );
    
    // Verify MAC
    const mac = crypto.createHash('sha3-256')
        .update(Buffer.concat([derivedKey.slice(16, 32), Buffer.from(crypto_data.ciphertext, 'hex')]))
        .digest('hex');
    
    if (mac !== crypto_data.mac) {
        throw new Error('Invalid password');
    }
    
    // Decrypt private key
    const decipher = crypto.createDecipheriv('aes-128-ctr', derivedKey.slice(0, 16), Buffer.from(crypto_data.cipherparams.iv, 'hex'));
    decipher.setAutoPadding(false);
    
    let privateKey = decipher.update(crypto_data.ciphertext, 'hex', 'hex');
    privateKey += decipher.final('hex');
    
    const address = '0x' + keystore.address;
    
    return { privateKey: '0x' + privateKey, address };
}

async function decryptPbkdf2(keystore, password) {
    const crypto_data = keystore.crypto || keystore.Crypto;
    const kdfparams = crypto_data.kdfparams;
    
    // Derive key using PBKDF2
    const derivedKey = crypto.pbkdf2Sync(
        password,
        Buffer.from(kdfparams.salt, 'hex'),
        kdfparams.c,
        kdfparams.dklen,
        'sha256'
    );
    
    // Verify MAC
    const mac = crypto.createHash('sha3-256')
        .update(Buffer.concat([derivedKey.slice(16, 32), Buffer.from(crypto_data.ciphertext, 'hex')]))
        .digest('hex');
    
    if (mac !== crypto_data.mac) {
        throw new Error('Invalid password');
    }
    
    // Decrypt private key
    const decipher = crypto.createDecipheriv('aes-128-ctr', derivedKey.slice(0, 16), Buffer.from(crypto_data.cipherparams.iv, 'hex'));
    decipher.setAutoPadding(false);
    
    let privateKey = decipher.update(crypto_data.ciphertext, 'hex', 'hex');
    privateKey += decipher.final('hex');
    
    const address = '0x' + keystore.address;
    
    return { privateKey: '0x' + privateKey, address };
}

function promptPassword() {
    return new Promise((resolve) => {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        // Hide password input
        rl.stdoutMuted = true;
        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.stdoutMuted) {
                rl.output.write('*');
            } else {
                rl.output.write(stringToWrite);
            }
        };
        
        rl.question(colorize('Enter password: ', 'yellow'), (password) => {
            rl.close();
            console.log(''); // New line after password
            resolve(password);
        });
    });
}

async function main() {
    showBanner();
    
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        showUsage();
        return;
    }
    
    if (args.includes('--find') || args.includes('-f')) {
        findKeystoreFiles();
        return;
    }
    
    const keystoreFile = args[0];
    let password = args[1];
    
    if (!fs.existsSync(keystoreFile)) {
        console.log(colorize(`❌ Keystore file not found: ${keystoreFile}`, 'red'));
        return;
    }
    
    try {
        console.log(colorize(`📁 Loading keystore file: ${keystoreFile}`, 'blue'));
        const keystoreData = JSON.parse(fs.readFileSync(keystoreFile, 'utf8'));
        
        if (!password) {
            password = await promptPassword();
        }
        
        console.log(colorize('🔓 Decrypting wallet...', 'blue'));
        const wallet = await decryptKeystore(keystoreData, password);
        
        console.log(colorize('\n✅ Wallet decrypted successfully!', 'green'));
        console.log(colorize('================================', 'green'));
        
        console.log(colorize('\n📍 Address:', 'cyan'));
        console.log(colorize(wallet.address, 'bright'));
        
        console.log(colorize('\n🔑 Private Key:', 'yellow'));
        console.log(colorize('⚠️  KEEP THIS SECRET! Anyone with this key can control your wallet.', 'red'));
        console.log(colorize(wallet.privateKey, 'bright'));
        
        console.log(colorize('\n📋 How to use:', 'cyan'));
        console.log('1. Import this private key into MetaMask or any Ethereum-compatible wallet');
        console.log('2. Add Splendor Network:');
        console.log('   - Network Name: Splendor');
        console.log('   - RPC URL: https://splendor-rpc.org/');
        console.log('   - Chain ID: 2691');
        console.log('   - Currency Symbol: SPL');
        console.log('3. Your SPL tokens and validator rewards will appear in the wallet');
        
        console.log(colorize('\n🛡️  Security Tips:', 'magenta'));
        console.log('• Never share your private key with anyone');
        console.log('• Store it in a secure location (password manager, hardware wallet)');
        console.log('• Consider this information highly sensitive');
        
    } catch (error) {
        if (error.message.includes('Invalid password')) {
            console.log(colorize('❌ Invalid password. Please check your password and try again.', 'red'));
        } else {
            console.log(colorize(`❌ Error: ${error.message}`, 'red'));
        }
    }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log(colorize('\n\n👋 Goodbye!', 'cyan'));
    process.exit(0);
});

main().catch(console.error);
