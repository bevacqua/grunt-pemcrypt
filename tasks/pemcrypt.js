'use strict';

module.exports = function(grunt) {
    var chalk = require('chalk');
    var pemcrypt = require('pemcrypt');
    var pemjson = chalk.yellow('.pemjson');
    var pemkey = chalk.cyan('.pem');
    var rawjson = chalk.cyan('.json');

    grunt.registerMultiTask('pem_gen', 'Generate a .pem key', function() {
        grunt.log.writeln('Generating ' + pemkey + ' key...');

        pemcrypt.generateKey(this.data.pem, this.data.size);

        grunt.log.ok(pemkey + ' key generated.', this.data.pem);
    });

    grunt.registerMultiTask('pem_encrypt', 'Encrypt a .json file', function() {
        var data = this.data;
        var store = pemcrypt(data);
        var pem = data.pemstore || data.store;
        var raw = data.rawstore || data.store;

        grunt.log.writeln('Encrypting ' + rawjson + ' file...');

        // write to disk as .pemjson
        store.encrypt(pem, raw, true);

        ok(rawjson, pemjson, 'encrypted', pem);
    });

    grunt.registerMultiTask('pem_decrypt', 'Decrypt a .pemjson file', function() {
        var data = this.data;
        var store = pemcrypt(data);
        var pem = data.pemstore || data.store;
        var raw = data.rawstore || data.store;

        grunt.log.writeln('Decrypting ' + pemjson + ' file...');
    
        // write to disk as .json
        store.decrypt(pem, raw, true);

        ok(pemjson, rawjson, 'decrypted', raw);
    });

    function ok(src, dest, action, store){
        grunt.log.ok(src + ' file ' + action + ', ' + dest + ' file generated at', store + dest);
    }
};