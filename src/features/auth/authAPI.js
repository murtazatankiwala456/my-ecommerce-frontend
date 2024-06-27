// create user
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO:on server it will only return some info of user (not password)
    resolve({ data });
  });
}
// check user
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    console.log({ data });
    if (data.length) {
      // data[0] to extract first match..
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "wrong credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }

    // TODO:on server it will only return some info of user (not password)
  });
}
// remove user
export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
  });
}
