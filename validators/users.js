'use strict';


const {successResponse, errorResponse} = require('../lib/response');
const {validateEmail, validatePhone} = require('../lib/utilities');

exports.validateUserRegister = body => {
  const bodyStruct = {};
  const arr = ['name', 'about', 'email', 'phone', 'password', 'street', 'city', 'zipcode', 'state',
    'country', 'latitude', 'longitude', 'gender'];

  if (!body.password || body.password.length < 4) {
    throw errorResponse(401, 'shortPassword');
  }

  if (!validateEmail(body.email)) {
    throw errorResponse(401, 'invalidEmail');
  }

  if (!validatePhone(body.phone)) {
    throw errorResponse(401, 'invalidPhone');
  }

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item]
  });

  return bodyStruct;
};

exports.validateUserPermission = body => {
  const bodyStruct = {};
  const arr = ['user_id', 'role_id' ]

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  return bodyStruct;
};

exports.validateUserRole = body => {
  const bodyStruct = {};
  const arr = ['role' ]

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item].trim()
  });

  return bodyStruct;
};

exports.validateUserToken = body => {
  const bodyStruct = {};
  const arr = ['token', 'expiry' ]

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item].trim()
  });

  return bodyStruct;
};

exports.validateAuth = body => {
  const bodyStruct = {};
  const arr = ['user_name', 'password' ];

  if (!body.password || body.password.length < 4) {
    throw errorResponse(401);
  }

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  return bodyStruct;
};

exports.validateEmailAuth = body => {
  const bodyStruct = {};
  const arr = ['email', 'password' ];

  if (!body.password || body.password.length < 4) {
    throw errorResponse(401);
  }

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  return bodyStruct;
};

exports.validateSeller = body => {
  const bodyStruct = {};
  const arr = ['name', 'logo', 'email', 'phone', 'street', 'zipcode', 'city', 'state',
  'country','latitude', 'longitude'];

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  return bodyStruct;
};
