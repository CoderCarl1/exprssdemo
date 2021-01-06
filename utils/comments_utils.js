const fetch = require("node-fetch")
const Comment = require('../models/comment');


const setData = async (req) => {
    try{
        const dataUrl = 'https://jsonplaceholder.typicode.com/comments'
        const comments = await fetch(dataUrl).
        then((x) => x.json()).
        then((x) => JSON.stringify( x, null, 2 )).
        then((x) => JSON.parse(x)).
        // then((x) => console.log("name:", x[0].name)).
        then((x) => x.map((ele) => {
            ele =  {
                postId: ele.postId,
                id: ele.id,
                user: [
                    {name: ele.name},
                    {email: ele.email}
                ],
                body: ele.body
            }
            return ele
        }))
        

        Comment.insertMany(comments, function(err, res) {
            if (err) throw err;
            console.log("all the documents inserted", res);
          });   

    } catch(err) {
        console.log(err)
    }
}


const getAllComments = function (req) {
    console.log('hi')
    return Comment.find()
  };

  const search = function(req){
      
    return Comment.find(req.params.searchTerm).toArray()
    // (function(err, result){
    //     if (err) throw err
    //     console.log(result)
        
    // }

    
    // aggregate([
    //     {$match: {$in [`${term}`]}}
    //   ])
  }

  const getCommentById = function (req) {
    return Comment.findById(req.params.id)
  }



const addComment = function (req) {
  // const createFAQ = function (data) {
  //   const data = new faq(data)

  //     data.save((err) {
  //     if (err) console.log(err)
  //     console.log("saved")
  //   });

  // }

  // createFaq({question: "this is not a question, it is a statement", answer: "oi mate"})


    return new Comment(req.body);
    
  };

  const updateComment = function (req) {
      return Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
   };

const deleteComment = function (id) {
    return Comment.findByIdAndRemove(id)
  }





module.exports = {
 setData,loadData,  getAllComments, search, getCommentById, addComment, deleteComment, updateComment
}