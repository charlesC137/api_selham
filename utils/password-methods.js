const bcrypt = require("bcryptjs");

const saltRounds = 10;

const methods = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  },
  comparePassword(plain, hashed) {
    return bcrypt.compareSync(plain, hashed);
  }
}

module.exports = methods;
