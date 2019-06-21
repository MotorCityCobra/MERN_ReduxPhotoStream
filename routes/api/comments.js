const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('config');

// Load User model
const Comment = require('../../models/Comment');

// DB Config
//const URL = 'mongodb://127.0.0.1/Comments';
const mongoURI = config.get('mongoURI', {useNewUrlParser: true});

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


router.get('/comments', (req, res) => {
  //var query = req.params.query;
  Comment.find({},(err,docs)=>{
    if (docs) {
    res.status(200).json(docs)
    } else {
      return res.json(err)
    }
})
})

router.get('/comments/:filename', (req, res) => {
  Comment.find({page: req.params.filename
  }, (err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.json(files);
    } else if (files) {
      return res.json(files);
    }  else {return res.json(err);
    }
  }
  )
})

router.delete('/comments/all/:filename', (req, res) => {
  Comment.deleteMany({page: req.params.filename
  }, (err, files) => {
    // Check if files
    if (err) {return res.json(err);
    }
  }
  )
})

// @route POST /upload
// @desc  Uploads file to DB
router.post('/comment/upload/', (req, res) => {
  var myData = new Comment(req.body);
  console.log(myData)
  myData.save()
      .then(item => {
          res.json(myData);
      })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      });
});

module.exports = router;
