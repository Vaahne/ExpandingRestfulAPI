import express from 'express';
import userControler from '../controllers/userController.mjs';

const router = express.Router();

router.route('/').get(userControler.allUsers);


router.route('/:id').get(userControler.specificUser)
                    .post(userControler.createUser)
                    .patch(userControler.updateUser)
                    .delete(userControler.deleteUser);

router.route('/:id/posts').get(userControler.getAllPosts);

export default router;