const express = require ('express');
const router = express.Router();
const Post = require ('../models/post');

router.post('',(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post Added Successfully',
      postId: createdPost._id
    });
  });

});

router.get('',(req, res, next)=>{
  Post.find()
  .then(documents => {
    console.log('get: ',documents);
    res.status(200).json({
      message: 'Post sent Successfully',
      posts: documents
    });
  });
});


router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found!',
      });
    }
  });
});

router.delete('/:id',(req, res, next) => {
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    console.log('delete: ',result);
    res.status(200).json({
      message: 'Post Deleted'
    });
  });
});

router.put('/:id',(req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id }, post)
  .then(result => {
    console.log('put: ',result);
    res.status(200).json({
      message: 'Post Updated'
    });
  });
});

module.exports = router;
