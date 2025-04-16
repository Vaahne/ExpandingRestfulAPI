import express from 'express';

import postsController from '../controllers/postsController.mjs';

const router = express.Router();

router.route('/').get(postsController.allPosts);

router.route('/:id').get(postsController.specificPost)
                    .post(postsController.createPost)
                    .patch(postsController.updatePost)
                    .delete(postsController.deletePost);

export default router;