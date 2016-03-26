/**
 * This is the boilerplate repository for creating joules.
 * Forking this repository should be the starting point when creating a joule.
 */

/*
 * The handler function for all API endpoints.
 * The `event` argument contains all input values.
 *    event.httpMethod, The HTTP method (GET, POST, PUT, etc)
 *    event.{pathParam}, Path parameters as defined in your .joule.yml
 *    event.{queryStringParam}, Query string parameters as defined in your .joule.yml
 */
var Response = require('joule-node-response');
var openpgp = require('openpgp');
openpgp.initWorker({ path:'openpgp.worker.js' })

exports.handler = function(event, context) {
	var response = new Response();
	response.setContext(context);

	var pass = event.query['pass'] || '';
 	var numBits  = event.query['numBits'] || 2048;
 	var name  = event.query['name'];
 	var email  = event.query['email'];

	if (!name || !email) {
		var result = {
			error: {
			  message: "Name and email are required"
			}
		};

		// send back a 404 with the error result
	  	response.setHttpStatusCode(404);
	  	response.send(result);
		return;
	}

	var options = {
    	userIds: [{ name:name, email:email}], // multiple user IDs
    	numBits: numBits,  // RSA key size
    	passphrase: pass // protects the private key
	};

	openpgp.generateKey(options).then(function(key) {
    	var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    	var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

		var result = pubkey + "\n\n" + privkey;
		response.setContentType('text/plain');
		response.send(result);
	});
};
