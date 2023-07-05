const { server } = require("../config");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller");

module.exports = () => {
  server.route({
    method: "GET",
    path: "/",
    handler: getAllProducts,
  });

  server.route({
    method: "POST",
    path: "/",
    handler: createProduct,
  });

  server.route({
    method: "GET",
    path: "/{id}",
    handler: getProductById,
  });

  server.route({
    method: "PATCH",
    path: "/{id}",
    handler: updateProductById,
  });

  server.route({
    method: "DELETE",
    path: "/{id}",
    handler: deleteProductById,
  });
};
