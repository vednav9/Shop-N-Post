// Run this file to generate secure random keys
const crypto = require('crypto');

console.log('🔑 Generated Security Keys for Shop-N-Post:');
console.log('=====================================');
console.log('');
console.log('JWT_SECRET=' + crypto.randomBytes(64).toString('hex'));
console.log('JWT_REFRESH_SECRET=' + crypto.randomBytes(64).toString('hex'));
console.log('SESSION_SECRET=' + crypto.randomBytes(32).toString('hex'));
console.log('');
console.log('Copy these values to your .env file!');
