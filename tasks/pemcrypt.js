'use strict';

module.exports = function(grunt) {
    var chalk = require('chalk');
    var pemcrypt = require('pemcrypt');
    var pemkey = chalk.blue('.pem');

    function raw (data) {
        return chalk.magenta(data.raw || '.json');
    }

    function secure (data) {
        return chalk.white(data.raw || '.pemjson');
    }

    grunt.registerMultiTask('pem_gen', 'Generate a .pem key', function() {
        grunt.log.writeln('Generating ' + pemkey + ' key...');

        pemcrypt.generateKey(this.data.pem, this.data.size);

        grunt.log.ok(pemkey + ' key generated.', this.data.pem);
    });

    grunt.registerMultiTask('pem_encrypt', 'Encrypt a private file', function() {
        var data = this.data;
        var store = pemcrypt(data);
        var pem = data.pemstore || data.store;
        var raw = data.rawstore || data.store;

        grunt.log.writeln('Encrypting ' + rawfile(data) + ' file...');

        // write to disk as .pemjson
        store.encrypt(raw, pem, {});

        ok(rawfile(data), secure(data), 'encrypted', pem);
    });

    grunt.registerMultiTask('pem_decrypt', 'Decrypt a secure file', function() {
        var data = this.data;
        var store = pemcrypt(data);
        var pem = data.pemstore || data.store;
        var raw = data.rawstore || data.store;

        grunt.log.writeln('Decrypting ' + secure(data) + ' file...');

        // write to disk as .json
        store.decrypt(pem, raw, {});

        ok(secure(data), rawfile(data), 'decrypted', raw);
    });

    function ok(src, dest, action, store){
        grunt.log.ok(src + ' file ' + action + ', ' + dest + ' file generated at', store + dest);
    }
};