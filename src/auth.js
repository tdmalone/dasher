
'use strict';

const auth0 = require( 'auth0-js' );

window.addEventListener( 'load', function() {

  var webAuth = new auth0.WebAuth({
    domain:       'tdm.au.auth0.com',
    clientID:     'pSJlMuLu5DxtB2pTjLXlAeR00QdeCcWq',
    responseType: 'token id_token',
    audience:     'https://tdm.au.auth0.com/userinfo',
    scope:        'openid',
    redirectUri:  window.location.href
  });

  var loginBtn = document.getElementById( 'btn-login' );

  loginBtn.addEventListener( 'click', function( event ) {
    event.preventDefault();
    webAuth.authorize();
  });

});
