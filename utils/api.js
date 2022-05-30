export async function getHelmet(helmetId) {
  let data = await fetch("http://shelmet.herokuapp.com/api/helmet/get", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: helmetId,
    }),
    mode: "cors",
  });
  return await data.json();
}

export async function login(email, password) {
  return await fetch("http://shelmet.herokuapp.com/auth/local/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    mode: "cors",
  });
}
