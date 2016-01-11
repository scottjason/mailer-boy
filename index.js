var _ = require('lodash');
var validator = require('validator');

var types = ['alert', 'confirmation', 'notice', 'reminder', 'campaign', 'custom'];

var isValidEmail = function(email) {
  return validator.isEmail(email);
};

module.exports = {
  send: function(opts, cb) {

    // opts object
    if (!opts || typeof opts !== 'object') throw (new Error('mailerboy: no config options passed'));

    // cb    
    if (!cb || typeof cb !== 'function') throw (new Error('mailerboy: no valid callback passed'));

    // type        
    if (!opts.type || types.indexOf(opts.type) === -1) return cb(new Error('mailerboy: no valid template type'));

    // emails array            
    if (!opts.emails || opts.emails.constructor !== Array || !opts.emails.length) return cb(new Error('mailerboy: empty or no array of emails passed'));

    // check if a bad email was passed
    var arr = _.map(opts.emails, isValidEmail);
    if (_.indexOf(arr, false) > -1) return cb(new Error('mailerboy: bad email passed'));

    // check if a subject was passed
    if (!opts.subject || typeof opts.subject !== 'string' || !opts.subject.length) return cb(new Error('mailerboy: no subject passed'));
  }
}
