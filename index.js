const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
// we are giving port (8900) for socket and linking it with our react app.

let user = []; // creating a user a array.
//since we dont want to push same user again and again we creat a fucntion for pushing user to the user array.

const addUser = (userId, socketId) => {};
io.on("connection", (socket) => {
  console.log("a user connected");
  //   io.emit("welcome", "hello this is socket server!"); // "welcome" is event name and "hello this is server!" message.

  //since socket id changes in every connection, we take the user and socket ids from the user.
});
