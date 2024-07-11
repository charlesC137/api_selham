const User = require("../schemas/user-schema");
const Products = require("../schemas/product-schema");

class DataManager {
  async fetchUsersAsync() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      const newUser = new User(user);
      await newUser.save();
    } catch (error) {
      console.error("Error modifying data:", error.message);
      throw error;
    }
  }

  async updateCart(update) {
    try {
      const filter = { userLogins: { username: update.userLogins.username } };
      const mod = { cart: update.cart };

      await User.updateOne(filter, mod);
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  }

  async deleteAccount(username) {
    try {
      const filter = { userLogins: { username: username } };
      await User.deleteOne(filter);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUser(username) {
    try {
      const filter = { userLogins: { username: username } };

      const fetchUser = await User.find(filter);

      if (fetchUser.length > 0) {
        return fetchUser;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchProducts() {
    try {
      const products = await Products.find({});
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
}

const dataMng = new DataManager();

module.exports = dataMng;
