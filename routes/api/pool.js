// routes/api/books.js

const express = require('express');
const Answer = require("../../models/Answer.js")
const router = express.Router();
const { request, GraphQLClient } = require('graphql-request');

const animebank = require("../../animebank.json");


// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

router.get('/', (req, res) => {
  res.send(animebank.data.Page.media);
});

router.get('/random', (req, res) => {
  let pool = animebank.data.Page.media;
  res.send(pool[Math.floor((Math.random()*pool.length))]);
});

router.get('/daily', async (req, res) => {
  let daily = await Answer.findOne({name: "daily"});
  res.send(daily.data);
});

const query = `
query($page: Int, $perPage: Int, $name: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    mediaList (userName: $name, type: ANIME, status: COMPLETED) {
      media {
        id
        averageScore
        episodes
        season
        seasonYear
        genres
        coverImage {
          large
          color
        }
        siteUrl
        title {
          romaji
          english
        }
        studios {
          nodes {
            id
            name
            isAnimationStudio
          }
        }
        tags {
          name
          rank
          isGeneralSpoiler
          isMediaSpoiler
        }
        description
      }
    }
  }
}
`;

router.get('/user/:userid', async (req, res) => {
  console.log(req.params.userid);
  let variables = {
    "name": req.params.userid,
    "page": 0
  };
  let hasNextPage;
  let pool = [];
  do {
    variables.page++;
    let result = await request("https://graphql.anilist.co", query, variables).catch((error) => {res.send(animebank.data.Page.media)})
    if (result) {
      hasNextPage = result.Page.pageInfo.hasNextPage;
      pool = pool.concat(result.Page.mediaList.map((med) => {
        return med.media;
      }).filter( (med) => {
        return med.title !== null;
      }));
    } else {
      return;
    }
  } while (hasNextPage)
  res.send(pool);
});


// // @route GET api/books
// // @description Get all books
// // @access Public
// router.get('/', (req, res) => {
//   Book.find()
//     .then(books => res.json(books))
//     .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
// });

// // @route GET api/books/:id
// // @description Get single book by id
// // @access Public
// router.get('/:id', (req, res) => {
//   Book.findById(req.params.id)
//     .then(book => res.json(book))
//     .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
// });

// // @route GET api/books
// // @description add/save book
// // @access Public
// router.post('/', (req, res) => {
//   Book.create(req.body)
//     .then(book => res.json({ msg: 'Book added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
// });

// // @route GET api/books/:id
// // @description Update book
// // @access Public
// router.put('/:id', (req, res) => {
//   Book.findByIdAndUpdate(req.params.id, req.body)
//     .then(book => res.json({ msg: 'Updated successfully' }))
//     .catch(err =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

// // @route GET api/books/:id
// // @description Delete book by id
// // @access Public
// router.delete('/:id', (req, res) => {
//   Book.findByIdAndRemove(req.params.id, req.body)
//     .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'No such a book' }));
// });

module.exports = router;