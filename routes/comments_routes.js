const express = require('express');
const router = express.Router();

const {
    getComments,
    getSearch,
    getComment,
    makeComment,
    removeComment,
    changeComment,
    freshLoad
  } = require('../controllers/comments_controller');
  
  router.get('/freshLoad', freshLoad)
  // READ
  // GET on '/posts'
  // Returns all posts
  router.get('/', getComments);

  router.get('/search/:searchTerm', getSearch)
  
  // READ
  // GET on '/posts/:id'
  // Returns post with given id
  router.get('/:id', getComment);
  
  // CREATE
  // POST on '/posts'
  // Creates a new post
  router.post('/', makeComment);
  
  // DELETE
  // DELETE on '/posts/:id'
  // Deletes a post with id
  router.delete('/:id', removeComment);
  
  // UPDATE
  // PUT on 'posts/:id'
  // Updates a post with id
  router.put('/:id', changeComment);
  
  module.exports = router;