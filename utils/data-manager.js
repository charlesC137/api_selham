class DataManager {
  constructor() {
    this.apiKey = process.env.API_KEY;
    if (!this.apiKey) {
      throw new Error("API Key is not defined in environment variables.");
    }
    this.usersId = "66460364e41b4d34e4f4a954";
    this.productsId = "664e2897ad19ca34f86d8442";
  }

  async fetchData(param) {
    try {
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/${param}/latest`,
        {
          method: "GET",
          headers: {
            "X-Master-Key": this.apiKey,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.record;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error; // Re-throw the error after logging
    }
  }

  async fetchUsersAsync() {
    try {
      const users = await this.fetchData(this.usersId);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw error;
    }
  }

  async modData(data) {
    try {
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/${this.usersId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": this.apiKey,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error modifying data:", error.message);
      throw error;
    }
  }

  //can also use to update the user
  async updateCart(update) {
    try {
      const users = await this.fetchUsersAsync();
      for (let user of users) {
        if (user.userLogins.username === update.userLogins.username) {
          user.cart = update.cart;
          await this.modData(users);
          break;
        }
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    }
  }

  async deleteAccount(username) {
    try {
      const users = await this.fetchUsersAsync();

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (username === user.userLogins.username) {
          users.splice(i, 1);

          await this.modData(users);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchProducts() {
    try {
      const products = await this.fetchData(this.productsId);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  }
}

const dataMng = new DataManager();

module.exports = dataMng;
