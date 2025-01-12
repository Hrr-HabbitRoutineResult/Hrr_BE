import express from 'express';
import postController from '../controllers/post.controller.js';

const router = express.Router();

router.get('/hotness', postController.getPopularPosts);
router.get('/my', postController.getMyPosts);
router.get('/commented', postController.getCommentedPosts);
router.get('/saved', postController.getSavedPosts);
router.get('/', postController.getPostList);
router.get('/:postId', postController.getPostDetail);
router.post('/:boardId/posts', postController.createPost);
router.patch('/:postId/like', postController.likePost);
router.patch('/:postId/comment', postController.commentOnPost);
router.patch('/:postId/save', postController.savePost);

export default router;
