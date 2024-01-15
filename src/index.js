const HyperExpress = require('hyper-express');
const app = new HyperExpress.Server();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port).then(() => {
  console.log('Listening on port 3000');
}).catch((err) => {
  console.error(err);
});
