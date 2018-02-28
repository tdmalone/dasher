
function rule( user, context, callback ) {

  // Authorized IPs. Add a JSON array as 'ip_address_whitelist' in your Rules settings.
  // @example ["123.45.67.89","98.76.54.32"]
  // @see https://manage.auth0.com/#/rules
  var whitelist = JSON.parse( configuration.ip_address_whitelist );

  var errorMessage = 'Access denied (ip-address-whitelist).';

  var userHasAccess = whitelist.some( function ( ip ) {
    return context.request.ip === ip;
  });

  if ( ! userHasAccess ) {
    return callback( new UnauthorizedError( errorMessage ) );
  }

  return callback( null, user, context );

}
