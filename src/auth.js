
'use strict';

const auth0 = require( 'auth0-js' ),
      config = require( '../config' );

const FIRST_ITEM = 0;

window.addEventListener( 'load', () => {

  const webAuth = new auth0.WebAuth({
    domain:       config.authDomain,
    clientID:     config.authClient,
    responseType: 'token id_token',
    audience:     'https://' + config.authDomain + '/userinfo',
    scope:        'openid',
    redirectUri:  window.location.href
  });

  /**
   * Shows an auth related button, such as login or logout, and handles clicks on it.
   *
   * @param {string} buttonType The button to show, either 'login' or 'logout'.
   * @return {undefined}
   */
  const showButton = ( buttonType ) => {

    const button = document.getElementsByClassName( buttonType + '-button' )[ FIRST_ITEM ];
    button.style.display = 'block';

    button.addEventListener( 'click', ( event ) => {

      event.preventDefault();

      switch ( buttonType ) {

        case 'login':
          webAuth.authorize();
          break;

        case 'logout':
          alert( 'Log out not implemented yet.' ); // eslint-disable-line no-alert
          break;

      } // Switch buttonType.
    }); // Click event.
  }; // Const showButton.

  if ( ! window.location.hash ) {
    return showButton( 'login' );
  }

  return webAuth.parseHash({ hash: window.location.hash }, ( error, authResult ) => {

    if ( error ) {
      showButton( 'login' );
      alert( error.errorDescription ); // eslint-disable-line no-alert
      return console.log( error );
    }

    webAuth.client.userInfo( authResult.accessToken, ( error, user ) => {

      if ( error ) {
        return console.log( error );
      }

      console.log( user );
      showButton( 'logout' );

    }); // UserInfo.
  }); // ParseHash.
}); // Window.load.
