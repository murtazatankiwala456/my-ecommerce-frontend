export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://my-ecommerce-database.onrender.com");
    const data = await response.json();
    resolve({ data });
  });
}
