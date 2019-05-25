const expect = require('chai').expect;
const { signJWTToken, verifyJWTToken } = require('../module');
const testConfig = require('./test.config');

describe('JWT Token test scenarios', function () {
  before(function (done) { done(); });
  after(function (done) { done(); });

  it('Assert signing & verification methods exists and are valid', function () {
    expect(signJWTToken).to.not.equal(undefined);
    expect(signJWTToken).to.not.equal(null);
    expect(typeof (signJWTToken)).to.equal('function');
    expect(signJWTToken.length).to.be.above(0, 'this method must have arguments');

    expect(verifyJWTToken).to.not.equal(undefined);
    expect(verifyJWTToken).to.not.equal(null);
    expect(typeof (verifyJWTToken)).to.equal('function');
    expect(verifyJWTToken.length).to.be.above(0, 'this method must have arguments');

    expect(signJWTToken).to.be.an('function');
  });

  it('sign a token with valid payload, signature, secret and expiry time', function (done) {

    const authData = testConfig.auth;
    signJWTToken(authData.payload, authData.secret, authData.expires_hour, (error, token) => {

      if (error) {
        return done(error);
      } else {

        expect(token).to.not.equal(null, 'Token should not be null');
        expect(token).to.not.equal(undefined, 'Token should not be undefined');

        done();
      }
    });

  });

  it('verification of a valid signed token, must return same payload, which was passed', function (done) {

    const authData = testConfig.auth;

    signJWTToken(authData.payload, authData.secret, authData.expires_hour, (error, token) => {

      if (error) {
        return done(error);
      } else {

        verifyJWTToken(token, authData.secret, (err, decoded) => {

          if (error) {
            return done(error);
          } else {

            console.log('decoded : ', decoded);
            console.log('payload : ', authData.payload);

            expect(decoded.name).to.equal(authData.payload.name, 'Decoded Payload does not match');
            done();
          }

        });
      }

    });


  });

  it('verification a expired token, must return with appropriate error', function (done) {
    const authData = testConfig.auth;

    signJWTToken(authData.payload, authData.secret, authData.expires_milliSecond, (error, token) => {

      if (error) {
        return done(error);
      } else {

        setTimeout(verifyJWTToken(token, authData.secret, (err, decoded) => {

          expect(err).to.equal('jwt expired');
          done();

        }), 2);

      }

    });
  });


  it('verification a invalid, must return with appropriate error', function (done) {

    const authData = testConfig.auth;
    const token = 'invalid-token-data';

    verifyJWTToken(token, authData.secret, (error, decoded) => {

      expect(error).to.equal('jwt malformed');
      done();
      
    });

  });

});