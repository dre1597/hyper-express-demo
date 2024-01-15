const HyperExpress = require('hyper-express');
const app = new HyperExpress.Server();


app.use((req, res, next) => {
  console.log('global middleware');
  next();
});

const middleware1 = (req, res, next) => {
  console.log('middleware1');
  next();
};

const middleware2 = (req, res, next) => {
  console.log('middleware2');
  next();
};


app.get('/', {
  middlewares: [middleware1, middleware2]
}, (req, res) => {
  res.send('Hello World!');
});

app.post('/posts/:postId/comments/:commentId', async (req, res) => {
  const headers = req.headers;
  const { postId, commentId } = req.path_parameters;
  const query = req.path_query;
  const body = await req.json();

  res.send(JSON.stringify({ headers, postId, commentId, query, body }));
});

app.post('/forbidden', (req, res) => {
  res.atomic(() => {
    res.status(403)
      .header('x-app-id', 'hyper-express')
      .cookie('timeout', 'forbidden', 1000 * 60 * 30, {
        secure: true,
        httpOnly: true
      }).cookie('other_cookie', null)
      .type('json')
      .send(JSON.stringify({ message: 'Forbidden' }));
  });
});

const port = process.env.PORT || 3000;

app.listen(port).then(() => {
  console.log('Listening on port 3000');
}).catch((err) => {
  console.error(err);
});
