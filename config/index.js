const Pool = require("pg").Pool;
const dotenv = require("dotenv");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const Hapi = require("@hapi/hapi");

dotenv.config();

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: "localhost",
});

const DB = new Pool({
  connectionString: process.env.DATABASE_URL,
});

DB.on("connect", () => {
  console.log(`🔒 Success connected to DateBase`);
});

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOO_COMMERCE_URL,
  consumerKey: process.env.WOO_COMMERCE_KEY,
  consumerSecret: process.env.WOO_COMMERCE_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

module.exports = {
  DB,
  WooCommerce,
  server,
};
