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
        var store = pemcrypt({
            pem: this.data.pem,
            cwd: this.data.cwd
        });

        grunt.log.writeln('Encrypting ' + rawjson + ' file...');

        // write to disk as .pemjson
        store.encrypt(this.data.store, true);

        ok(rawjson, pemjson, 'encrypted', this.data.store);
    });

    grunt.registerMultiTask('pem_decrypt', 'Decrypt a .pemjson file', function() {
        var store = pemcrypt({
            pem: this.data.pem,
            cwd: this.data.cwd
        });

        grunt.log.writeln('Decrypting ' + pemjson + ' file...');
    
        // write to disk as .json
        store.decrypt(this.data.store, true);

        ok(pemjson, rawjson, 'decrypted', this.data.store);
    });

    function ok(src, dest, action, store){
        grunt.log.ok(src + ' file ' + action + ', ' + dest + ' file generated at', store + dest);
    }
};