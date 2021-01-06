const mongoose = require('mongoose');
const Comment = require('../models/comment');
const fetch = require("node-fetch")
const expect = require('expect');
const utilities = require('../utils/comments_utils');

let postId = null;

const dbConn = "mongodb://localhost/comments_app_test"

// Use done to deal with asynchronous code - done is called when the hooks completes
before(done => connectToDb(done))

// Connect to the test database
function connectToDb(done) {
    // Connect to the database (same as we do in app.js)
    mongoose.connect(
        dbConn,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        err => {
            if (err) {
                console.log("Error connecting to database", err)
                done()
            } else {
                console.log("Connected to database!")
                done()
            }
        }
    )
}

// Disconnect from the test database after all tests run. Call done to indicate complete.
after(done => {
    mongoose.disconnect(() => done())
})


// Set up test data before each test
beforeEach(async function () {
    // Load a test record in setupData
    // Use await so we can access the postId, which is used by some tests
    let post = await setupData()
    postId = post._id
})

function setupData() {
    let date = Date.now()
    let testPost = {}
    testPost.title = "Test post 1"
    testPost.username = "tester"
    testPost.create_date = date
    testPost.modified_date = date
    testPost.content = "This is the first test post"
    testPost.category = ""
    return Post.create(testPost)
}

// Delete test data after each test
afterEach((done) => {
    // Execute the deleteMany query
    tearDownData().exec(() => done());
});

function tearDownData() {
    return Post.deleteMany()
}

describe('add All data', () => {
    const req = {
        params: {

        }
    }
})