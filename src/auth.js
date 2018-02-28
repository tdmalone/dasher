
'use strict';

import auth0 from 'auth0-js';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'tdm.au.auth0.com',
    clientID: 'pSJlMuLu5DxtB2pTjLXlAeR00QdeCcWq',
    redirectUri: 'https://dasher.tm.id.au',
    audience: 'https://tdm.au.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }

}
