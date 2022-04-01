const grpc = require('@grpc/grpc-js');
const { ChatService } = require('./getService');
const REMOTE_SERVER = '0.0.0.0:50051';

const client = new ChatService(REMOTE_SERVER, grpc.credentials.createInsecure());

client.send({
  user: 'Max',
  text: 'Mustermann',
}, (error, response) => console.log(response));
