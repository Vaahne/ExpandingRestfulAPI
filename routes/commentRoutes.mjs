import express from 'express';
import commentControler from '../controllers/commentController.mjs';

const router = express.Router();

router.route('/').get(commentControler.allComments);

router.route('/posts/:postId/comments').get(commentControler.specificComment);
router.route('/users/:userId/comments').get(commentControler.specificComment);


router.route('/:id').get(commentControler.specificComment)
                    .post(commentControler.createComment)
                    .patch(commentControler.updateComment)
                    .delete(commentControler.deleteComment);

export default router;