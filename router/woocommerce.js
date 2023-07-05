const { server } = require("../config");
const {
  getWooCommerce,
  getAndInsertFromWooCommerceDataToDB,
} = require("../controller");

module.exports = () => {
  server.route({
    method: "GET",
    path: "/woocommerce",
    handler: getAndInsertFromWooCommerceDataToDB,
  });

  server.route({
    method: "GET",
    path: "/woocommerce/read",
    handler: getWooCommerce,
  });
};
