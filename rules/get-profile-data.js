
/* eslint-disable strict */

/**
 * Adds additional data to the userInfo returned to the browser.
 */
function rule( user, context, callback ) {// eslint-disable-line no-unused-vars

  'use strict';

  // TODO: Get this config from ../config.json... and somehow write it into this script so its here
  //       when deployed to Auth0 Rules.
  const config = {
    namespace: 'dasher.tm.id.au'
  };

  const geoip = context.request.geoip;

  context.idToken['https://' + config.namespace + '/data'] = {

    metadata: {
      app:  user.app_metadata,
      user: user.user_metadata
    },

    email:           user.email,
    isEmailVerified: user.email_verified,
    fullName:        user.name,
    firstName:       user.given_name,
    lastName:        user.family_name,
    nickname:        user.nickname,
    avatar:          user.picture,
    gender:          user.gender,
    timezone:        geoip ? geoip.time_zone : '',
    city:            geoip ? geoip.city_name : '',
    country:         geoip ? geoip.country_name : ''

  };

  callback( null, user, context );

} // Function rule.
