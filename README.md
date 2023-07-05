<h1> Jubelio-Test </h1>

> Node Version

- v14.19.2

> Database URL

- DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}

> 🚀 Start App

```
- npm run install
- npm run migrate
- npm run seed (optional)

- npm run dev
or
- npm run start

notes: make sure the Database has created
```

> Routers and Doc

- Woocommerce

```js
Get and Insert data to Database from API `WooCommerceRestApi`
same think like `npm run seed` thets why seed is optional

method: "GET"
path: "{{URL}/woocommerce",

Response:
{
  "status": 200,
  "message": "Woocomerce data",
  "data": [
      {
          "id": 362,
          "name": "Kalung permata",
          "slug": "kalung-permata",
          "permalink": "https://codetesting.jubelio.store/product/kalung-permata/",
          "date_created": "2023-03-08T09:46:18",
          "date_created_gmt": "2023-03-08T09:46:18",
          "date_modified": "2023-03-15T11:16:42",
          "date_modified_gmt": "2023-03-15T11:16:42",
          "type": "simple",
          "status": "publish",
          "featured": false,
          "catalog_visibility": "visible",
          "description": "<p>Tas Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\n",
          "short_description": "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>\n",
          "sku": "kl-04",
          "price": "1.99",
          "regular_price": "1.99",
          "sale_price": "",
          "date_on_sale_from": null,
          "date_on_sale_from_gmt": null,
          "date_on_sale_to": null,
          "date_on_sale_to_gmt": null,
          "on_sale": false,
          "purchasable": true,
          "total_sales": 0,
          "virtual": false,
          "downloadable": false,
          "downloads": [],
          "download_limit": -1,
          "download_expiry": -1,
          "external_url": "",
          "button_text": "",
          "tax_status": "taxable",
          "tax_class": "",
          "manage_stock": false,
          "stock_quantity": null,
          "backorders": "no",
          "backorders_allowed": false,
          "backordered": false,
          "low_stock_amount": null,
          "sold_individually": false,
          "weight": "",
          "dimensions": {
              "length": "",
              "width": "",
              "height": ""
          },
          "shipping_required": true,
          "shipping_taxable": true,
          "shipping_class": "",
          "shipping_class_id": 0,
          "reviews_allowed": true,
          "average_rating": "0.00",
          "rating_count": 0,
          "upsell_ids": [],
          "cross_sell_ids": [],
          "parent_id": 0,
          "purchase_note": "",
          "categories": [
              {
                  "id": 15,
                  "name": "Uncategorized",
                  "slug": "uncategorized"
              }
          ],
          "tags": [],
          "images": [
              {
                  "id": 365,
                  "date_created": "2023-03-15T11:16:42",
                  "date_created_gmt": "2023-03-15T11:16:42",
                  "date_modified": "2023-03-15T11:16:42",
                  "date_modified_gmt": "2023-03-15T11:16:42",
                  "src": "https://codetesting.jubelio.store/wp-content/uploads/2023/03/gucci-3200-4904083-1.jpg",
                  "name": "gucci-3200-4904083-1.jpg",
                  "alt": ""
              }
          ],
          "attributes": [],
          "default_attributes": [],
          "variations": [],
          "grouped_products": [],
          "menu_order": 0,
          "price_html": "<span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">Rp</span>2</bdi></span>",
          "related_ids": [
              224,
              27,
              217,
              232,
              222
          ],
          "meta_data": [],
          "stock_status": "instock",
          "has_options": false,
          "_links": {
              "self": [
                  {
                      "href": "https://codetesting.jubelio.store/wp-json/wc/v3/products/362"
                  }
              ],
              "collection": [
                  {
                      "href": "https://codetesting.jubelio.store/wp-json/wc/v3/products"
                  }
              ]
          }
      },
  ]
}
```

- Products

```js
Get All Products
method: "GET",
path: "{{URL}/",
queryParams: {
  pageSize,
  page,
  columnName,
  sortOrder
}

Response:
{
  "status": 200,
  "message": "All Products",
  "data": [
    {
        "id": 1,
        "name": "Kalung permata",
        "image": "https://codetesting.jubelio.store/wp-content/uploads/2023/03/gucci-3200-4904083-1.jpg",
        "price": 1.99,
        "stock": 0
    },
    {
        "id": 2,
        "name": "Handuk Murah",
        "image": "https://codetesting.jubelio.store/wp-content/uploads/2023/03/babyshop-1526-7329013-1.jpg",
        "price": 1.99,
        "stock": 0
    },
  ]
}
```

```js
Crate Product
method: "POST",
path: "{{URL}}/",
body: {
  "name": "handuk bekas 1",
  "sku": "hb-01",
  "image": "https://test.image.jpg",
  "price": "1.99",
  "description": "test"
}

Response:
{
  "status": 201,
  "message": "Product added successfully",
  "data": [
      {
          "id": 11,
          "name": "handuk bekas 1",
          "sku": "hb-01",
          "image": "https://test.image.jpg",
          "price": 1.99,
          "description": "test",
          "created_at": "2023-07-05T10:53:43.679Z",
          "updated_at": "2023-07-05T10:53:43.679Z",
          "deleted_at": null
      }
  ]
}
```

```js
Get Product By Id
method: "GET",
path: "{{URL}}/{id}",

Response:
{
  "status": 200,
  "message": "Products:",
  "data": [
      {
          "id": 1,
          "name": "Kalung permata",
          "image": "https://codetesting.jubelio.store/wp-content/uploads/2023/03/gucci-3200-4904083-1.jpg",
          "price": 1.99,
          "stock": 0,
          "description": "Tas Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo."
      }
  ]
}
```

```js
Update Product By Id
method: "PATCH",
path: "{{URL}}/{id}",
body: {
  "name": "handuk bekas test 3",
  "image": "https://test.image.jpg",
  "price": 1.99,
  "description": "test update"
}

Response:
{
  "status": 200,
  "message": "Product updated successfully ",
  "data": [
      {
          "id": 1,
          "name": "handuk bekas test 3",
          "sku": "kl-04",
          "image": "https://test.image.jpg",
          "price": 1.99,
          "description": "test update",
          "created_at": "2023-07-05T10:52:59.469Z",
          "updated_at": "2023-07-05T10:53:50.899Z",
          "deleted_at": null
      }
  ]
}
```

```js
Delete Product By Id
method: "DELETE",
path: "{{URL}}/{id}",

Response:
{
  "status": 200,
  "message": "Product id 1 deleted successfully"
}
```

- Transaction

```js
Create Transaction
method: "POST",
path: "{{URL}}/transaction",
body: {
    "sku": "kl-04",
    "qty": 10
}

Response:
{
  "status": 201,
  "message": "Transaction added successfully",
  "data": [
      {
          "adjustment_id": 2,
          "product_id": 1,
          "qty": 10,
          "created_at": "2023-07-05T10:54:28.818Z",
          "updated_at": "2023-07-05T10:54:28.818Z",
          "deleted_at": null
      }
  ]
}
```

```js
Get All Transaction
method: "GET",
path: "{{URL}}/transaction",
queryParams: {
  pageSize,
  page,
  columnName,
  sortOrder
}

Response:
{
  "status": 200,
  "message": "All Transaction",
  "data": [
      {
          "id": 1,
          "sku": "kl-04",
          "qty": 10,
          "amount": 19.9
      },
      {
          "id": 2,
          "sku": "kl-04",
          "qty": 10,
          "amount": 19.9
      }
  ]
}
```

```js
Get Transaction By Id
method: "GET",
path: "{{URl}}/transaction/{id}",

Response:
{
  "status": 200,
  "message": "Transaction:",
  "data": [
      {
          "id": 1,
          "sku": "kl-04",
          "qty": 10,
          "amount": 19.9
      }
  ]
}
```

```js
Update Transaction By Id
method: "PATCH",
path: "{{URL}}/transaction/{id}",
body: {
    "qty": 1
}

Response:
{
  "status": 200,
  "message": "Transaction updated successfully ",
  "data": [
      {
          "id": 1,
          "product_id": 1,
          "qty": 1,
          "price": 1.99,
          "created_at": "2023-07-05T10:54:26.602Z",
          "updated_at": "2023-07-05T10:54:50.877Z",
          "deleted_at": null
      }
  ]
}
```

```js
Delete Transaction By Id
method: "DELETE",
path: "{{URL}}/transaction/{id}",

Response:
{
  "status": 200,
  "message": "Transaction id 1 deleted successfully"
}
```
