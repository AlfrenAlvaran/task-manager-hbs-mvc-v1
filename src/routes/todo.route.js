import express from 'express';
import {
  index,
  newTask,
  create,
  edit,
  update,
  remove,
} from '../controllers/todoController.js';

const router = express.Router();

// Routes
router.get('/', index);
router.get('/new', newTask);
router.post('/', create);
router.get('/:id/edit', edit);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
