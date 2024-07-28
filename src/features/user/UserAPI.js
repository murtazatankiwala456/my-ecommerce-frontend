export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/orders/?user.id=" + userId
    );
    const data = await response.json();

    resolve({ data });
  });
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/users/" + userId
    );
    const data = await response.json();

    resolve({ data });
  });
}
// update user address from checkout page....
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://my-ecommerce-database.onrender.com/users/" + update.id,
      {
        // to get the particular user and address in it
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
