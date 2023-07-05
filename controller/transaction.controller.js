const { DB } = require("../config");
const { queryHelpers } = require("../database/query");

const createTransaction = async (request, h) => {
  try {
    const { sku, qty } = request.payload;
    const checkProductQuery = queryHelpers({ type: "checkProduct/sku" });
    const checkProduct = await DB.query(checkProductQuery, [sku]);
    if (!checkProduct) throw { message: `Product sku ${sku} not exists` };

    const product_id = checkProduct.rows[0].id;

    const query = queryHelpers({ type: "createTransaction" });

    const values = [product_id, qty];
    const data = await DB.query(query, values);

    const output = [
      {
        adjustment_id: data.rows[0].id,
        ...data.rows[0],
      },
    ];
    delete output[0].id;

    return h
      .response({
        status: 201,
        message: "Transaction added successfully",
        data: output,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        status: 400,
        message: `Transaction added failed`,
        data: error,
      })
      .code(400);
  }
};

const getAllTransactions = async (request, h) => {
  try {
    const {
      pageSize = 10,
      page = 1,
      columnName = "id",
      sortOrder = "ASC",
    } = request.query;

    const query = queryHelpers({
      type: "getAllTransactions",
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
        message: "All Transaction",
        data: data.rows,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 400,
        message: `No Transaction exists`,
        data: error,
      })
      .code(400);
  }
};

const getTransactionById = async (request, h) => {
  try {
    const id = parseInt(request.params.id);
    const query = queryHelpers({
      type: "getTransactionById",
      data: { id },
    });

    const data = await DB.query(query);
    if (data.rowCount == 0) throw data;

    return h
      .response({
        status: 200,
        message: "Transaction:",
        data: data.rows,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 400,
        message: `No Transaction exists`,
        data: error,
      })
      .code(400);
  }
};

const updateTransactionById = async (request, h) => {
  try {
    const id = parseInt(request.params.id);
    let { qty } = request.payload;

    if (!qty) throw { message: `qty do not empty` };

    const checkTransactionQuery = queryHelpers({ type: "checkTransaction" });
    const checkTransaction = await DB.query(checkTransactionQuery, [id]);

    if (checkTransaction.rowCount === 0)
      throw { message: `Transaction id ${id} not exists` };

    const query = queryHelpers({
      type: "updateTransactionById",
      data: {
        id,
        qty,
      },
    });

    const data = await DB.query(query);

    if (data.rowCount == 0)
      throw { message: `Transaction id ${id} does not exist` };

    return h
      .response({
        status: 200,
        message: "Transaction updated successfully ",
        data: data.rows,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 404,
        message: `Update Transaction failed`,
        data: error,
      })
      .code(400);
  }
};

const deleteTransactionById = async (request, h) => {
  const id = parseInt(request.params.id);
  try {
    const query = queryHelpers({ type: "deleteTransactionById" });
    const value = [id];
    const data = await DB.query(query, value);

    if (data.rowCount == 0) throw data;

    return h
      .response({
        status: 200,
        message: `Transaction id ${id} deleted successfully`,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 404,
        message: `Transaction id ${id} does not exist`,
        data: error,
      })
      .code(400);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
