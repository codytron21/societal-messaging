const io = require("socket.io")(process.env.PORT || 8900, {
  cors: {
    origin:
      // "https://societalbeings.netlify.app/"
      // || 
      "http://localhost:3000",
    // || process.env.PORT,
  },
});
// we are giving port (8900) for socket and linking it with our react app.

let users = []; // creating a user a array.
//since we dont want to push same user again and again we creat a fucntion for pushing user to the user array.

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected");
  //   io.emit("welcome", "hello this is socket server!"); // "welcome" is event name and "hello this is server!" message.

  //since socket id changes in every connection,
  //we take the user and socket ids from the user.
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
  });
  io.emit("getUsers", users);

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect.
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
