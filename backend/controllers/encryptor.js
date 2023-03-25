
let crypto = require('crypto');
var key = "abcdefghijklmnopqrstuvwx";

var pt = "hello world!";
console.log(encrptify(pt));
var ec = encrptify(pt);
console.log(decryptify(ec));

function encrptify(pt) {
    var encrypt = crypto.createCipheriv('des-ede3', key, "");
    var theCipher = encrypt.update(pt, 'utf8', 'base64');
    theCipher += encrypt.final('base64');
    return theCipher;
};
function decryptify(theCipher) {
    let decrypt = crypto.createDecipheriv('des-ede3', key, "");
    let s = decrypt.update(theCipher, 'base64', 'utf8');
    s += decrypt.final('utf8');
    console.log(s);
    return s;
}




// let secret_key = 'abcdefghijklmnopqrstuvwx'; // define secret key
// let secret_iv = 'smslt'; // define secret IV
// let encryptionMethod = 'AES-256-CBC'; // this is our encryption method
// let key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
// let iv = Crypto.createHash('sha512').update(secret_iv, 'utf - 8').digest('hex').substr(0, 16);

// let encryptedMessage = encrypt_string("hello", encryptionMethod, key, iv);
// console.log(encryptedMessage); // output: L2d0Zj LDVmxoSDNWdmpVMkNGdBJEdz09 // store for decrpt
// // add encrpt function
// function encrypt_string(plain_text, encryptionMethod, secret, iv) {
//     let encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv); // encrpt using AES-256-CBC
//     let aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64'); // convert to base64
//     return Buffer.from(aes_encrypted).toString('base64');
// };
// // now call decrypt function
// let decryptedMessage = decrypt_string("L2d0ZjlDVmxoSDNWdmpVMkNGd0JEdz09", encryptionMethod, key, iv);
// console.log(decryptedMessage); //| I
// // add decrypt function

// function decrypt_string(encryptedMessage, encryptionMethod, secret, iv) {
//     const buff = Buffer.from(encryptedMessage, 'base64'); // get base64 string
//     encryptedMessage = buff.toString('utf-8'); // convert to string
//     let decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv);
//     return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8'); // return decrpt one
// };