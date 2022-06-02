import io from "socket.io-client";

function getSocket() {
  const socket = io("https://shelmet.herokuapp.com", {
    transports: ["websocket"],
  });
  return socket;
}

export default getSocket;
