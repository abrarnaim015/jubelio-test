const { DB } = require("../config");

const product = `CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  sku VARCHAR UNIQUE NOT NULL,
  image TEXT NOT NULL,
  price FLOAT NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
  );`;

const adjustment_transaction = `CREATE TABLE adjustment_transactions(
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  qty INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_adjustment_transactions_product
  FOREIGN KEY (product_id) REFERENCES products(id)
  ON UPDATE CASCADE ON DELETE CASCADE);`;

const migration = async () => {
  try {
    await DB.query(product);
    await DB.query(adjustment_transaction);
    console.log(`✅ DATA BASE SUCCESS CREATED`);
  } catch (error) {
    console.log(`❌ FAILED TO CREATE DATA BASE`);
    console.log(error);
  }
};

migration();
