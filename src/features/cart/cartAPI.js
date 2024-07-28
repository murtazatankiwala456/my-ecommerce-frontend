// Create
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/cart",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO:on server it will only return some info of user (not password)
    resolve({ data });
  });
}
// Read
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    // TODO: we will not hard coded server url here...
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/cart?user=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}
// Update
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/cart/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO:on server it will only return some info of user (not password)
    resolve({ data });
  });
}
// Delete
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/cart/" + itemId,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO:on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}
// Reset Cart
export function resetCart(userId) {
  // get all the item of user's cart and delete rach
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
