
/* global auth0, UnauthorizedError */
/* eslint-disable strict */

const SINGLE_LOGIN = 1;

/**
 * Denies access to any user that doesn't already exist in the system. The user will still be
 * created, but with a metadata setting that will be checked for if they try to log in again.
 */
function rule( user, context, callback ) { // eslint-disable-line no-unused-vars

  'use strict';

  var errorMessageNew = 'Access denied (disable-signups-new).';
  var errorMessageRetry = 'Access denied (disable-signups-retry).';

  // Initialize app_metadata.
  user.app_metadata = user.app_metadata || {}; // eslint-disable-line camelcase

  // Check if the user has already tried to signup previously.
  if ( user.app_metadata.isDisabledSignup ) {
    return callback( new UnauthorizedError( errorMessageRetry ) );
  }

  // If it is the first login (hence the `signup`).
  if ( SINGLE_LOGIN === context.stats.loginsCount ) {

    // Set a flag in case the user tries again.
    user.app_metadata.isDisabledSignup = true;

    // Store the app_metadata.
    auth0.users.updateAppMetadata( user.user_id, user.app_metadata )
      .then( function() {
        return callback( new UnauthorizedError( errorMessageNew ) );
      })
      .catch( function( err ) {
        callback( err );
      });

    return;

  }

  // Else, we have a pre-existing user.
  callback( null, user, context );

} // Function rule.
