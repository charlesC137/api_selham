const Router = require("express").Router;

const signUpRouter = require("./sign-up");
const logInRouter = require("./log-in");
const productsRouter = require("./products");
const deleteAcctRouter = require("./delete-account");
const updateCartRouter = require("./update-cart");
const fetchUserRouter = require("./fetch-user");

const router = Router();

router.use(signUpRouter);
router.use(logInRouter);
router.use(productsRouter);
router.use(deleteAcctRouter);
router.use(updateCartRouter);
router.use(fetchUserRouter);

module.exports = router;
