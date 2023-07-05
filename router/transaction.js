const { server } = require("../config");
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
} = require("../controller");

module.exports = () => {
  server.route({
    method: "POST",
    path: "/transaction",
    handler: createTransaction,
  });

  server.route({
    method: "GET",
    path: "/transaction",
    handler: getAllTransactions,
  });

  server.route({
    method: "GET",
    path: "/transaction/{id}",
    handler: getTransactionById,
  });

  server.route({
    method: "PATCH",
    path: "/transaction/{id}",
    handler: updateTransactionById,
  });

  server.route({
    method: "DELETE",
    path: "/transaction/{id}",
    handler: deleteTransactionById,
  });
};
