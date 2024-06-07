class DataManager {
  constructor() {
    this.apiKey = process.env.API_KEY;
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
      console.error(error);
    }
  }

  async fetchUsersAsync() {
    try {
      const response = await this.fetchData(this.usersId);
      return response;
    } catch (error) {
      console.error(error);
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
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(update, users) {
    try {
      for (let user of users) {
        if (user.userLogins.username === update.userLogins.username) {
          user.cart = update.cart;
          await this.modData(users);
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchProducts() {
    try {
      const response = await this.fetchData(this.productsId);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const dataMng = new DataManager();

module.exports = dataMng;
