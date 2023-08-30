const express = require('express');
const path = require('path');
const fs = require('fs');
const noteDb = required('./db/db.json');
// Helper method for generating unique ids
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'));

//get route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get route for notes.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(noteDb);
});






// POST request to add a review
app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);
  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;
  // If all the required properties are present
  if (product && review && username) {
    // Variable for the object we will save
    const newReview = {
      product,
      review,
      username,
      upvotes: Math.floor(Math.random() * 100),
      review_id: uuid(),
    };
    // Convert the data to a string so we can save it
    const reviewString = JSON.stringify(newReview);
    // Write the string to a file
    fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newReview.product} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});




app.listen(PORT, () =>
  console.log(`App listening, port: ${PORT}`)
);

