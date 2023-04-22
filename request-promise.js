const rp = require('request-promise');

module.exports.findLink = function (link) {
  rp(link)
  .then(function (html) {
    return html;
 })
  .catch(function (err) {
    throw err;
  });
}