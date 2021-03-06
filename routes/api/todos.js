const router = require('express').Router();
let ToDo = require('../../models/todo.models');
const jwtDecode = require('jwt-decode');

router.get('/', (req, res, next) => {
  let userToken;
    if (
     req.headers.authorization &&
     req.headers.authorization.startsWith("Bearer ")
  ) {
    const jwtToken = req.headers.authorization.split("Bearer ")[1];
    req.user = jwtDecode(jwtToken)
    // console.log('User is: ' + req.user.id)
    // const userId = req.user.id
    // console.log('Token is: ' + jwtToken);
    next();
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }
}, (req, res) => {
  const { user } = req;
  const userId = req.user.id
  // console.log('Current user is: ', userId)
  // console.log("user: ", user)
  ToDo.find({owner: userId})
  .then(todos => {
    console.log(req.headers);
    res.json(todos);
})
  .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res, next) => {
  console.log('Post request Body is: ', req.headers)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
 ) {
  const jwtToken = req.headers.authorization.split("Bearer ")[1];
   req.user = jwtDecode(jwtToken)
   console.log('For POST request the Token is: ' + jwtToken);
   console.log('After axios in post: ',req.headers)
   next();
 } 
 else {
   console.error("No token found in POST request");
   return res.status(403).json({ error: "Unauthorized" });
 }
}, (req, res) => {
  const task = req.body.task;
  console.log('Body Info from POST request: ', req.body)
  const { user } = req
  console.log('User is: ', user.id)
  const newToDo = new ToDo({
    task,
    owner: req.user.id
  });
  newToDo.save()
  .then(() => res.json('todo added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Find a todo by the ID generated by mongoDB
router.route('/:id').get((req, res) => {
  ToDo.findById(req.params.id)
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // Delete a todo by ID from the database
  router.route('/:id').delete((req, res) => {
    ToDo.findByIdAndDelete(req.params.id)
      .then(() => res.json('todo deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // Update an item with the specific ID
  router.route('/update/:id').post((req, res) => {
    ToDo.findById(req.params.id)
      .then(todo => {
        todo.task = req.body.task;
  
        todo.save()
          .then(() => res.json('todo updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;