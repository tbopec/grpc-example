const grpc = require('@grpc/grpc-js');
const { ChatService } = require('./getService');

const server = new grpc.Server();

let users = [];

const addMessage = message => users.forEach(a => {
  a.write(message);
});

server.addService(ChatService.service, {
  send: (request, callback) => {
    addMessage(request.request);
    callback(null, request.request);
  },
  join: (call) => {
    const user = call.request.user;
    call.on('cancelled', () => {
      users = users.filter(a => a !== call);
      addMessage({
        user: 'System',
        text: `${user} has left`
      })
    });
    users.push(call);
    addMessage({
      user: 'System',
      text: `${user} has joined!\n\n`
    })
  }
});

server.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log('Server at port:', port);
    server.start();
  },
);
