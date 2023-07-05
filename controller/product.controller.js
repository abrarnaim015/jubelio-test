const { DB } = require("../config");
const { queryHelpers } = require("../database/query");

const getAllProducts = async (request, h) => {
  try {
    const {
      pageSize = 10,
      page = 1,
      columnName = "id",
      sortOrder = "ASC",
    } = request.query;

    const query = queryHelpers({
      type: "getAllProducts",
      data: {
        columnName,
        sortOrder,
        pageSize,
        page,
      },
    });

    const data = await DB.query(query);
    if (data.rowCount == 0) throw data;

    return h
      .response({
        status: 200,
        message: "All Products",
        data: data.rows,
      })
      .code(200);
  } catch (error) {
    h.response({
      status: 404,
      message: `No products exists`,
      data: error,
    }).code(400);
  }
};

const createProduct = async (request, h) => {
  try {
    const { name, sku, image, price, description } = request.payload;
    const query = queryHelpers({ type: "createProduct" });
    const values = [name, sku, image, price, description];
    const data = await DB.query(query, values);

    return h
      .response({
        status: 201,
        message: "Product added successfully",
        data: data.rows,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        status: 400,
        message: `Product added failed`,
        data: error,
      })
      .code(400);
  }
};

const getProductById = async (request, h) => {
  try {
    const id = parseInt(request.params.id);
    const query = queryHelpers({
      type: "getProductById",
      data: { id },
    });

    const data = await DB.query(query);
    if (data.rowCount == 0) throw data;

    return h
      .response({
        status: 200,
        message: "Products:",
        data: data.rows,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 404,
        message: `No products exists`,
        data: error,
      })
      .code(400);
  }
};

const updateProductById = async (request, h) => {
  try {
    const id = parseInt(request.params.id);
    let { name, image, price, description } = request.payload;
    const checkProductQuery = queryHelpers({ type: "checkProduct" });
    const query = queryHelpers({ type: "updateProductById" });

    const checkProduct = await DB.query(checkProductQuery, [id]);
    if (checkProduct.rowCount === 0)
      throw { message: `Product id ${id} not exists` };

    const value = [
      name ? name : checkProduct.rows[0].name,
      checkProduct.rows[0].sku,
      image ? image : checkProduct.rows[0].image,
      price ? price : checkProduct.rows[0].price,
      description ? description : checkProduct.rows[0].description,
      id,
    ];

    const data = await DB.query(query, value);

    if (data.rowCount === 0)
      throw { message: `product id ${id} does not exist` };

    return h
      .response({
        status: 200,
        message: "Product updated successfully ",
        data: data.rows,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 404,
        message: `Update product failed`,
        data: error,
      })
      .code(400);
  }
};

const deleteProductById = async (request, h) => {
  const id = parseInt(request.params.id);
  try {
    const checkProductQuery = queryHelpers({ type: "checkProduct" });
    const deleteProductQuery = queryHelpers({ type: "deleteProductById" });
    const deleteTransactionQuery = queryHelpers({
      type: "deleteProductById/transaction",
    });
    const value = [id];

    const checkProduct = await DB.query(checkProductQuery, [id]);
    if (checkProduct.rowCount === 0)
      throw { message: `Product id ${id} not exists` };

    await DB.query(deleteTransactionQuery, value);
    const data = await DB.query(deleteProductQuery, value);
    if (data.rowCount == 0) throw data;

    return h
      .response({
        status: 200,
        message: `Product id ${id} deleted successfully`,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 404,
        message: `Product id ${id} does not exist`,
        data: error,
      })
      .code(400);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
