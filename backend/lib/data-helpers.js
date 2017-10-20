userHelpers = require("./users/user-helpers.js")

module.exports = function makeDataHelpers(knex){
  return {
    userHelpers: userHelpers(knex)
  }
}