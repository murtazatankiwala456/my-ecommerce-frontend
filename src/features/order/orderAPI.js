export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/orders",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();

    resolve({ data });
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/orders/" + order.id,
      {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();

    resolve({ data });
  });
}
export function fetchAllOrders(pagination) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`; //_page:3
  }
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/orders?" + queryString
    );
    const data = await response.json();

    resolve({ data: { orders: data.data, totalOrders: data.items } });
  });
}
