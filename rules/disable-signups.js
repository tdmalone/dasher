
function rule( user, context, callback ) {

  var errorMessageNew = 'Access denied (disable-signups-new).';
  var errorMessageRetry = 'Access denied (disable-signups-retry).';

  // Initialize app_metadata.
  user.app_metadata = user.app_metadata || {};

  // Check if the user has already tried to signup previously.
  if ( user.app_metadata.is_rule_e14_signup ) {
    return callback( errorMessageRetry );
  }

  // If it is the first login (hence the `signup`).
  if ( context.stats.loginsCount === 1 ) {

    // Set a flag in case the user tries again.
    user.app_metadata.is_rule_e14_signup = true;

    // Store the app_metadata.
    auth0.users.updateAppMetadata( user.user_id, user.app_metadata )
      .then( function() {
        return callback( errorMessageNew );
      })
      .catch( function( err ) {
        callback( err );
      });

    return;

  }

  // Else, we have a pre-existing user.
  callback( null, user, context );

}
