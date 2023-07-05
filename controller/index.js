const wooCommerceController = require("./woocommerce.controller");
const productsController = require("./product.controller");
const transactionController = require("./transaction.controller");

const getWooCommerce = wooCommerceController.getWooCommerce;
const getAndInsertFromWooCommerceDataToDB =
  wooCommerceController.getAndInsertFromWooCommerceDataToDB;

const getAllProducts = productsController.getAllProducts;
const createProduct = productsController.createProduct;
const getProductById = productsController.getProductById;
const updateProductById = productsController.updateProductById;
const deleteProductById = productsController.deleteProductById;

const createTransaction = transactionController.createTransaction;
const getAllTransactions = transactionController.getAllTransactions;
const getTransactionById = transactionController.getTransactionById;
const updateTransactionById = transactionController.updateTransactionById;
const deleteTransactionById = transactionController.deleteTransactionById;

module.exports = {
  getWooCommerce,
  getAndInsertFromWooCommerceDataToDB,
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
