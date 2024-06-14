export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductsByFilters(filter) {
  // filter ={"category":"frangrances"}
  // filter ={"brand":"Essence"}
  // TODO:we will on server  support mutilple value

  // reference for sorting functionality
  //   JSON Server's behavior for sorting changed with different versions.

  // To resolve the issue, update JSON Server using the command:

  // npm install -g json-server

  // After updating, sorting by default will be ascending. No need to use _order:asc

  // GET /products?_sort=price

  // For descending order,

  // ***** use GET /products?_sort=-price ****
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
