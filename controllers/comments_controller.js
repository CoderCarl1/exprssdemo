const {getAllComments, search, setData, getCommentById, addComment, deleteComment, updateComment} = require("../utils/comments_utils")


const getComments = function (req, res) {
	getAllComments(req).
	sort({
		  postId: -1
	  }).
	  exec((err, comments) => {
		  if (err) {
			  res.status(500);
			  return res.json({
				  error: err.message
			  });
		  }
		  res.send(comments);
	  });
  };

const getSearch = function (req, res) {
	search(req).
	sort({
		postId: -1
	}).
	exec((err, comments) => {
		if (err) {
			res.status(500);
			return res.json({
				error: err.message
			});
		}
		res.send(comments);
	}

	)
}


  const getComment = function (req, res) {
	// execute the query from getPostById
	getCommentById(req).exec((err, comment) => {
	  if (err) {
		res.status(404);
		return res.send("Comment not found");
	  }
	  res.send(comment);
	});
  };

  const makeComment = function (req, res) {
	addComment(req).save((err, comment) => {
	  if (err) {
		res.status(500);
		return res.json({
		  error: err.message
		});
	  }
	  res.status(201);
	  res.send(comment);
	});
  };


  const removeComment = function (req, res) {
	deleteComment(req.params.id).exec((err) => {
	  if (err) {
		res.status(500);
		return res.json({
		  error: err.message
		});
	  }
	  res.sendStatus(204);
  
	});
  };

  const changeComment = function (req, res) {
	updateComment(req).exec((err, comment) => {
	  if (err) {
		res.status(500);
		return res.json({
		  error: err.message
		});
	  }
	  res.status(200);
	  res.send(comment);
	});
  };
  
  const freshLoad = function (req, res){
	  setData(req)
	//   .exec((err, data) => {
	// 	  if (err) {
	// 		  res.status(500)
	// 		  return res.json({
	// 			  error: err.message
	// 		  })
	// 	  }
	// 	  res.status(201)
	// 	  res.send(data)
	//   })
  }
  

module.exports = {freshLoad, getComments, getSearch, getComment, makeComment, removeComment, changeComment}