
/* global auth0, UnauthorizedError */
/* eslint-disable strict */

/**
 * Denies access to any user that doesn't already exist in the system. The user will still be
 * created, but with a metadata setting that will be checked for if they try to log in again.
 */
function rule( user, context, callback ) { // eslint-disable-line no-unused-vars

  'use strict';

  const SINGLE_LOGIN = 1;

  const errorMessage = (
    'Access denied for user ID ' + user.user_id + ' ' +
    '(attempt ' + context.stats.loginsCount + ').'
  );

  // Initialize app_metadata.
  user.app_metadata = user.app_metadata || {}; // eslint-disable-line camelcase

  // Check if the user has already tried to signup previously.
  if ( user.app_metadata.isDisabledSignup ) {
    console.log( errorMessage );
    return callback( new UnauthorizedError( errorMessage ) );
  }

  // If it is the first login (hence the `signup`).
  if ( SINGLE_LOGIN === context.stats.loginsCount ) {

    // Set a flag in case the user tries again.
    user.app_metadata.isDisabledSignup = true;

    // Store the app_metadata.
    auth0.users.updateAppMetadata( user.user_id, user.app_metadata )
      .then( function() {
        console.log( errorMessage );
        return callback( new UnauthorizedError( errorMessage ) );
      })
      .catch( function( err ) {
        callback( err );
      });

    return;

  }

  // Else, we have a pre-existing user.
  callback( null, user, context );

} // Function rule.
