const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function add(user) {
  return db("users").insert(user);
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function find() {
  return db("users").select("id", "username");
}
