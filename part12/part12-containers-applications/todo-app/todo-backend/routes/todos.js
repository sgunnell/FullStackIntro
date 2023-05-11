const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')

const router = express.Router();


const todoCounter = async () => {

  const count = await getAsync("count")

  return count ? setAsync("count", parseInt(count) + 1) : setAsync("count", 1)
}

/* GET todos listing. */
router.get('/', async (_, res) => {
  try{
    const todos = await Todo.find({})
    res.send(todos);
  }catch(exception){
    console.log(exception)
  }
});

router.get('/statistics', async (_ , res) => {

  const count = await getAsync("count")

  return res.json({"added_todos" : count || "0"})
})

/* POST todo to listing. */
router.post('/', async (req, res) => {

  todoCounter()

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo

  if(todo){
    return res.json(todo)
  }
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const original = await Todo.findById(req.todo._id);
  const newText = req.body.hasOwnProperty("text") ? req.body.text : original.text
  const newDone = req.body.hasOwnProperty("done") ? req.body.done : original.done

  req.todo = await Todo.findByIdAndUpdate(req.todo._id, {
    text: newText,
    done: newDone
  }, { new: true })

  res.json(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
