import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.broadcast.emit("chat_message", {
    user: "INFO",
    message: "new user connected",
  });

  socket.on("chat_message", (data) => {
    console.log(data);
    io.emit("chat_message", data);
  });
});

httpServer.listen(3000);
