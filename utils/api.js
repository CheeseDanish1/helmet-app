const api_home_url = "http://shelmet.herokuapp.com";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getHelmet(helmetId) {
  let data = await fetch(`${api_home_url}/api/helmet/get`, {
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

export async function getUser(userKey) {
  let data = await fetch(`${api_home_url}/api/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: userKey,
      Authorization: userKey,
    },
    mode: "cors",
  });
  return await data.json();
}

export async function login(email, password) {
  return await fetch(`${api_home_url}/auth/local/login`, {
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

export async function signup(username, email, password) {
  return await fetch(`${api_home_url}/auth/local/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    mode: "cors",
  });
}

export async function addHelmet(id, name) {
  return await fetch(`${api_home_url}/api/helmet/connect`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: await AsyncStorage.getItem("authorization"),
    },
    body: JSON.stringify({
      helmetId: id,
      helmetName: name,
    }),
    mode: "cors",
  });
}
