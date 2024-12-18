// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file. Use the comments.html file from the previous exercise.
// In comments.html, add a form that allows users to add comments.
// When the form is submitted, the server should append the comment to the comments.json file and display the updated list of comments.
// Use the following data to pre-populate the comments.json file:
// [
//   "I love your site!",
//   "This is the best site I've ever seen",
//   "I can't believe how much I love this site"
// ]
// Use the following code to read the comments.json file:
// const fs = require('fs');
// const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
// Use the following code to write to the comments.json file:
// fs.writeFileSync('comments.json', JSON.stringify(comments));
// You can use the express module to create the web server.
// Do not use the express-generator to create the web server.

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  res.send(`
    <html>
      <head>
        <title>Comments</title>
      </head>
      <body>
        <h1>Comments</h1>
        <ul>
          ${comments.map(comment => `<li>${comment}</li>`).join('')}
        </ul>
        <form action="/comments" method="post">
          <label for="comment">Add Comment:</label>
          <input type="text" name="comment" id="comment">
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  comments.push(req.body.comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});