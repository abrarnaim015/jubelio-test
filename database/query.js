const ADJUSTMENT_TRANSACTIONS_DB = "adjustment_transactions";
const PRODUCTS_DB = "products";

const queryHelpers = ({ type, data }) => {
  let query = ``;

  switch (type) {
    case "getAllProducts":
      query = `SELECT
      p.id AS id,
      p."name" AS "name",
      p.image AS image,
      p.price AS price,
      CAST(COALESCE(SUM(at.qty), 0) AS INTEGER) AS stock
      FROM ${PRODUCTS_DB} p
      LEFT JOIN ${ADJUSTMENT_TRANSACTIONS_DB} at
      ON p.id = at.product_id
      WHERE p.deleted_at IS NULL
      GROUP BY p.id
      ORDER BY p.${data.columnName} ${data.sortOrder}
      LIMIT ${data.pageSize} OFFSET ${(data.page - 1) * data.pageSize}`;
      break;

    case "createProduct":
      query = `INSERT INTO ${PRODUCTS_DB}(
        "name", sku, image, price, description)
        VALUES($1, $2, $3, $4, $5) RETURNING *;`;
      break;

    case "getProductById":
      query = `SELECT
      p.id AS id,
      p."name" AS "name",
      p.image AS image,
      p.price AS price,
      CAST(COALESCE(SUM(at.qty), 0) AS INTEGER) AS stock,
      p.description AS description
      FROM ${PRODUCTS_DB} p
      LEFT JOIN ${ADJUSTMENT_TRANSACTIONS_DB} at
      ON p.id = at.product_id
      WHERE p.id=${data.id} AND p.deleted_at IS NULL
      GROUP BY p.id`;
      break;

    case "checkProduct":
      query = `SELECT * FROM ${PRODUCTS_DB} WHERE id=$1 AND deleted_at IS NULL;`;
      break;

    case "updateProductById":
      query = `UPDATE ${PRODUCTS_DB}
      SET name=$1, sku=$2, image=$3, price=$4, description=$5, updated_at=NOW()
      WHERE id=$6
      RETURNING *;`;
      break;

    case "deleteProductById":
      query = `UPDATE ${PRODUCTS_DB} SET updated_at=NOW(), deleted_at=NOW() WHERE id=$1`;
      break;

    case "deleteProductById/transaction":
      query = `UPDATE ${ADJUSTMENT_TRANSACTIONS_DB} SET updated_at=NOW(), deleted_at=NOW() WHERE product_id=$1`;
      break;

    case "checkProduct/sku":
      query = `SELECT * FROM ${PRODUCTS_DB} WHERE sku=$1 AND deleted_at IS NULL;`;
      break;

    case "createTransaction":
      query = `INSERT INTO ${ADJUSTMENT_TRANSACTIONS_DB} (product_id, qty)
      VALUES ($1, $2) RETURNING *;`;
      break;

    case "getAllTransactions":
      query = `SELECT 
      at.id AS id,
      p.sku AS sku,
      at.qty AS qty,
      (p.price * at.qty) AS amount
      FROM ${ADJUSTMENT_TRANSACTIONS_DB} at
      LEFT JOIN ${PRODUCTS_DB} p
      ON at.product_id = p.id
      WHERE at.deleted_at IS NULL
      ORDER BY at.${data.columnName} ${data.sortOrder}
      LIMIT ${data.pageSize} OFFSET ${(data.page - 1) * data.pageSize}`;
      break;

    case "getTransactionById":
      query = `SELECT 
      at.id AS id,
      p.sku AS sku,
      at.qty AS qty,
      (p.price * at.qty) AS amount
      FROM ${ADJUSTMENT_TRANSACTIONS_DB} at
      LEFT JOIN ${PRODUCTS_DB} p
      ON at.product_id = p.id
      WHERE at.id=${data.id} AND at.deleted_at IS NULL;`;
      break;

    case "checkTransaction":
      query = `SELECT * FROM ${ADJUSTMENT_TRANSACTIONS_DB} WHERE id=$1 AND deleted_at IS NULL;`;
      break;

    case "updateTransactionById":
      query = `UPDATE ${ADJUSTMENT_TRANSACTIONS_DB} at
      SET qty = ${data.qty}, updated_at = NOW()
      FROM ${PRODUCTS_DB} p
      WHERE at.product_id = p.id AND at.id = ${data.id}
      RETURNING
      at.id AS id,
      at.product_id AS product_id,
      at.qty AS qty,
      (p.price * at.qty) AS price,
      at.created_at AS created_at,
      at.updated_at AS updated_at,
      at.deleted_at AS deleted_at;`;
      break;

    case "deleteTransactionById":
      query = `UPDATE ${ADJUSTMENT_TRANSACTIONS_DB} SET updated_at=NOW(), deleted_at=NOW() WHERE id=$1`;
      break;

    case "getAndInsertFromWooCommerceDataToDB":
      query = `INSERT INTO
      ${PRODUCTS_DB}(name, sku, image, price, description)
      VALUES($1, $2, $3, $4, $5);`;
      break;
    default:
      break;
  }

  if (query === "") return false;

  return query;
};

module.exports = { queryHelpers };
