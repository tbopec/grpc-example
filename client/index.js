const grpc = require('@grpc/grpc-js');
const readline = require('readline');
const { ChatService } = require('./getService');
const REMOTE_SERVER = '0.0.0.0:50051';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new ChatService(REMOTE_SERVER, grpc.credentials.createInsecure());

const startChat = user => {
  console.log(user);

  const channel = client.join({ user });

  channel.on('data', ({ user: author, text }) => {
    if (author === user) {
      return;
    }
    console.log(`${author}: ${text}`);
  });

  rl.on('line', text =>
    client.send({
      user,
      text,
    }, (error, response) => `> ${response.text}`));
};

rl.question('What\'s your name?', answer => {
  startChat(answer);
});
