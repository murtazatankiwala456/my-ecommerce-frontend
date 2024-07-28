export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch("http://localhost:8080/products");

    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();

    resolve({ data });
  });
}
export function fetchProductsByFilters(filter, sort, pagination) {
  // filter ={"brand":"Essence"}
  // TODO:we will on server  support mutilple value
  // TODO:server will filter the deleted products in case of non-admin

  // reference for sorting functionality
  //   JSON Server's behavior for sorting changed with different versions.

  // To resolve the issue, update JSON Server using the command:

  // npm install -g json-server

  // After updating, sorting by default will be ascending. No need to use _order:asc

  // GET /products?_sort=price

  // For descending order,

  // ***** use GET /products?_sort=-price ****

  // in server side:-
  // filter ={"category":["frangrances","furniture"]}
  // sort={_sort:"price", order="desc"}
  // sort={_page:3, _per_page=6}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key]; // "[furniture]" << array
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`; //_sort:"price"
  }
  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`; //_page:3
  }
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
