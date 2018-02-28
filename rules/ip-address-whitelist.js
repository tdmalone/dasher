
function ( user, context, callback ) {

  // Authorized IPs.
  var whitelist = [
    'ENTER.IP.ADDRESS.HERE'
  ];

  var errorMessage = 'Access denied (ip-address-whitelist).';

  var userHasAccess = whitelist.some( function ( ip ) {
    return context.request.ip === ip;
  });

  if ( ! userHasAccess ) {
    return callback( new UnauthorizedError( errorMessage ) );
  }

  return callback( null, user, context );

}
