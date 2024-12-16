import Todo from '../models/todo.js';


export const index = async (req, res) => {
  try {
    const searchQuery = req.query.search || ''; 
 
    const todos = await Todo.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    res.render('todos/index', { 
      layout: 'layouts/main', 
      todos, 
      title: 'To-Do List',
      searchQuery
    });
  } catch (error) {
    res.status(500).send('Error fetching tasks');
  }
};


export const newTask = (req, res) => {
  res.render('todos/new', { 
    layout: 'layouts/main',
    title: 'Add New Task',
    headContent: '<link rel="stylesheet" href="/new-task.css">',
    titlePage: "Add New Task"
  });
};


export const create = async (req, res) => {
  try {
   
    req.body.isCompleted = req.body.isCompleted === 'on'; 
    await Todo.create(req.body);
    res.redirect('/todos');
  } catch (error) {
    res.status(500).send('Error creating task');
  }
};

export const edit = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send('Task not found');
    }
    res.render('todos/edit', { 
      layout: 'layouts/main',
      title: 'Edit Task',
      todo,
     headContent: '<link rel="stylesheet" href="/new-task.css">',
    titlePage: "Update Task"
    });
  } catch (error) {
    res.status(500).send('Error fetching task for editing');
  }
};


export const update = async (req, res) => {
  try {
    
    req.body.isCompleted = req.body.isCompleted === 'on';
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTodo) {
      return res.status(404).send('Task not found');
    }

    res.redirect('/todos');
  } catch (error) {
    res.status(500).send('Error updating task');
  }
};


export const remove = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).send('Task not found');
    }
    res.redirect('/todos');
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
};
