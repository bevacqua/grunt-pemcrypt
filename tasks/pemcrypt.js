'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('pemcrypt_generate', 'Generate a .pem key', function() {
        var options = this.options({});

    });

    grunt.registerMultiTask('pemcrypt_encrypt', 'Encrypt a .json file', function() {
        var options = this.options({});

    });

    grunt.registerMultiTask('pemcrypt_decrypt', 'Decrypt a .pemjson file', function() {
        var options = this.options({});

    });
};