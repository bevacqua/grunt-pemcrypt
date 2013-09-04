'use strict';

module.exports = function(grunt) {
    var pemcrypt = require('pemcrypt');

    grunt.registerMultiTask('pemcrypt_gen', 'Generate a .pem key', function() {
        pemcrypt.generateKey(this.data.pem, this.data.size);
    });

    grunt.registerMultiTask('pemcrypt_encrypt', 'Encrypt a .json file', function() {
        var store = pemcrypt({
            pem: this.data.pem,
            cwd: this.data.cwd
        });

        store.encrypt(this.data.store, true); // write to disk as .pemjson
    });

    grunt.registerMultiTask('pemcrypt_decrypt', 'Decrypt a .pemjson file', function() {
        var store = pemcrypt({
            pem: this.data.pem,
            cwd: this.data.cwd
        });

        store.decrypt(this.data.store, true); // write to disk as .json
    });
};