
/* global configuration, UnauthorizedError */
/* eslint-disable strict */

/**
 * Denies access to IP address not listed in a custom whitelist.
 *
 * To use, add a JSON array as 'ip_address_whitelist' in your Rules settings
 * (https://manage.auth0.com/#/rules). For example, ["123.45.67.89","98.76.54.32"]
 * If this is not supplied, or is invalid JSON, this rule will fail and return an
 * error.
 */
function rule( user, context, callback ) { // eslint-disable-line no-unused-vars

  'use strict';

  const errorMessage = 'Access denied from ' + context.request.ip + '.';

  // Get and parse authorized IPs from config.
  const whitelist = JSON.parse( configuration.ip_address_whitelist );

  const userHasAccess = whitelist.some( function( ip ) {
    return context.request.ip === ip;
  });

  if ( ! userHasAccess ) {
    console.log( errorMessage );
    return callback( new UnauthorizedError( errorMessage ) );
  }

  return callback( null, user, context );

} // Function rule.
