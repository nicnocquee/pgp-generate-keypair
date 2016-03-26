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

exports.handler = function(event, context) {
	var response = new Response();
	response.setContext(context);

  var name = event.query['name'] || 'World';
  var greeting = 'Hello, ' + name + '.';

  var result = {
    "message": greeting
  };
  
  response.send(result);
};
