const { DB, WooCommerce } = require("../config");
const { queryHelpers } = require("../database/query");

const optionGetDataBy = (query) => {
  let output = "";
  switch (query) {
    case "products":
      output = "products";
      break;
    case "orders":
      output = "orders";
      break;
    case "variations":
      output = "products/22/variations";
      break;
    case "attributes":
      output = "products/attributes";
      break;
    case "terms":
      output = "products/attributes/2/terms";
      break;
    case "categories":
      output = "products/categories";
      break;
    case "shipping_classes":
      output = "products/shipping_classes";
      break;
    case "tags":
      output = "products/tags";
      break;
    case "reviews":
      output = "products/reviews";
      break;
    case "countries":
      output = "data/countries";
      break;
    default:
      break;
  }
  return output;
};

const getWooCommerce = async (request, h) => {
  const queryParams = request.query.dataBy;
  const getDataBy = optionGetDataBy(queryParams);
  try {
    const wooCommerceData = await WooCommerce.get(getDataBy);
    if (wooCommerceData.data.length === 0) throw wooCommerceData.data;

    return h
      .response({
        status: 200,
        message: `All data from ${getDataBy}:`,
        data: wooCommerceData.data,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 400,
        message: `All data from ${getDataBy} notfound`,
        data: error,
      })
      .code(400);
  }
};

const getAndInsertFromWooCommerceDataToDB = async (request, h) => {
  try {
    const query = queryHelpers({ type: "getAndInsertFromWooCommerceDataToDB" });
    const wooCommerceData = await WooCommerce.get("products");
    if (wooCommerceData.data.length === 0) throw wooCommerceData.data;
    try {
      await Promise.all(
        wooCommerceData.data.map((data) => {
          const value = [
            data.name,
            data.sku,
            data.images[0].src,
            parseFloat(data.price),
            data.description.replace(/<p>|<\/p>\n/g, ""),
          ];
          return DB.query(query, value);
        })
      );
    } catch (error) {
      console.log(error);
    }
    return h
      .response({
        status: 200,
        message: "Woocomerce data",
        data: wooCommerceData.data,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 400,
        message: `All data from products notfound`,
        data: error,
      })
      .code(400);
  }
};

module.exports = {
  getWooCommerce,
  getAndInsertFromWooCommerceDataToDB,
};
