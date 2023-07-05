const productRouter = require("./product");
const transactionRouter = require("./transaction");
const woocommerceRouter = require("./woocommerce");

module.exports = () => {
  productRouter();
  transactionRouter();
  woocommerceRouter();
};
