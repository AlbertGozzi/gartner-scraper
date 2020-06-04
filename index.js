
const axios = require('axios');
const reviews = require('./data.js');
const mongoose = require('mongoose')
const Review = require('./models/Review');

const MONGODB_URI = 'mongodb://localhost:27017/gartner-scraper';

// Creating async forEach to avoid rate limiting
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// Connect to database
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

let i = 0;

// Parse and save to database
asyncForEach(reviews, async review => {
    await new Promise(r => setTimeout(r, 1000));
    await axios.get(`https://www.gartner.com/reviews/api-proxy/reviews/review/presentationview/${review.reviewId}?`)
      .then(function (res) {
        // handle success
        console.log(`Scrapped ${review.reviewId}`);
        let scrappedReview = res.data.reviewPresentation.review;
        scrappedReview._id = scrappedReview.id;

        Review.countDocuments({_id: scrappedReview._id}, function (err, count){ 
            if (count === 0){
                Review.create(scrappedReview)
                .then(res => console.log(`Added to database | Doc: ${++i}`))
                .catch(err => console.log(err));
            } else {
                console.log('Already in database')
            }
        }); 

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
})

