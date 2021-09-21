const express = require("express")
const postController = require("../controllers/postController")
// import middleware function
const protect = require("../middleware/authMiddleware")

const router = express.Router()

//localhost:3000/
router
    .route("/")
    .get(protect, postController.getAllPosts)
    .post(protect, postController.createPost);

router
    .route("/:id")
    .get(protect, postController.getOnePost)
    .patch(protect, postController.updatPost)
    .delete(protect, postController.deletePost);

module.exports = router;