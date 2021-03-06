const store_db = require("../../../store/dummy");
const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = store_db;
  }
  function list() {
    return store.list(TABLE);
  }
  function get(id) {
    return store.get(TABLE, id);
  }
  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.upsert(TABLE, user);
  }
  function remove(id) {
    return store.remove(TABLE, id);
  }
  return {
    list,
    get,
    upsert,
    remove,
  };
};
