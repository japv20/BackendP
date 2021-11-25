import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.static('html')) // this brings the folder html into the server
app.use(express.static('css')) // this brings the folder css into the server
app.use(express.static('javascript')) // this brings the folder js to the server
app.use(express.urlencoded({ extended: true }));

import Plate  from './modules.js';
const Comida = Plate;

console.log(Comida)

//Supabase
import packages from '@supabase/supabase-js';
const {createClient} = packages

const supabaseUrl = 'https://nzbdfmiovbsqjwwhilhn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5ODI5NiwiZXhwIjoxOTQ5OTc0Mjk2fQ.KsfwqP7XECEHLB8NIv80D5KztYINq9mI73qzHMoneuE'
const supabase = createClient(supabaseUrl, supabaseKey)

//Linking html file onto server
app.get('/', (req, res) => {
  res.json({message:"Hello"})
  res.sendFile('index.html')
})

// To decrypt user link
// app.get('/callback', async(req,res) => {
//   console.log(`Token: ${req.params.data}`)
//   res.sendStatus(200)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // console.log(projects)
  // console.log(supabase.auth.session());
  // supabase.auth.from('meals').select('*').then(console.log)
})

const meals = [
  {
    "id": 0,
    "name": "Lasgana",
    "description": "Pastichito",
    "price": "£15",
    "img_url": "https://via.placeholder.com/150"
  },
  {
    "id": 1,
    "name": "Hallaca",
    "description": "Navidad",
    "price": "£15",
    "img_url": "https://via.placeholder.com/150"
  },
  {
    "id": 2,
    "name": "Empanada",
    "description": "For breakfast",
    "price": "£15",
    "img_url": "https://via.placeholder.com/150"
  }
]

// Login with google


// Login with magic link
app.post('/login', async(req, res) => {
  console.log(`Email: ${req.body.email}`)
  const { user, session, error } = await supabase.auth.signIn({
    email: req.body.email
  })
})

app.get('/meals', async(req, res) => {
  let {data: meals, error} = await supabase
  .from('meals')
  .select('*')
  // console.log(supabase.auth.session())
  res.json(meals)
  // console.log(meals)

  meals.forEach((meal) => {
    let detailedMeal = new Plate(meal.name,meal.description,meal.price)
    // console.log(detailedMeal);
  })
})

app.post('/meals', async (req, res) => {
  // let mealsInput = req.body.submission;
  let {data, error} = await supabase
  .from('meals')
  .insert([ {
    category: req.body.category,
    name: req.body.plate,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.img_url
  //   mealsInput
  } ])
  // res.json(meals)
  // console.log(
  //   req.body.category, req.body.plate, req.body.description, req.body.price, req.body.img_url
  // )
  // console.log(meals)
  res.status(201).send('Plate added')
  // console.log(data, error)
})

app.delete('/delete', async (req,res) => {
  let {data, error} = await supabase
  .from('meals')
  .delete()
  .match({'id': req.body.id})
  console.log({data,error})
})

