const TABLE = "auth";
const auth = require("../../../auth");
const bcrypt = require("bcrypt");

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = store_db;
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });

    const pass = await bcrypt.compare(password, data.password);
    if (pass) {
      // Generar token
      return auth.sign(JSON.parse(JSON.stringify(data)));
    } else {
      throw new Error("Informacion Invalida");
    }
  }

  return {
    upsert,
    login,
  };
};
