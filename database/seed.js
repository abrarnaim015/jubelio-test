const { DB, WooCommerce } = require("../config");
const { queryHelpers } = require("../database/query");

const seed = async () => {
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
    console.log(`✅ SUCCESS TP SEED DATA BASE`);
  } catch (error) {
    console.log(`❌ FAILED TO SEED DATA BASE`);
    console.log(error);
  }
};

seed();
