const grpc = require('@grpc/grpc-js');
const { ChatService } = require('./getService');

const server = new grpc.Server();

server.addService(ChatService.service, {
  send: (request, callback) => {
    callback(null, request.request);
  },
});

server.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log('Server at port:', port);
    server.start();
  },
);
