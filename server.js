import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import packages from '@supabase/supabase-js';

import Plate  from './modules.js';
const Comida = Plate;

console.log(Comida)

//Supabase
const {createClient} = packages

const supabaseUrl = 'https://nzbdfmiovbsqjwwhilhn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5ODI5NiwiZXhwIjoxOTQ5OTc0Mjk2fQ.KsfwqP7XECEHLB8NIv80D5KztYINq9mI73qzHMoneuE'
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
  res.json({message:"Hello"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // console.log(projects)
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

app.get('/meals', async(req, res) => {
  let {data: meals, error} = await supabase
  .from('meals')
  .select('*')
  res.json(meals)

  meals.forEach((meal) => {
    let detailedMeal = new Plate(meal.name,meal.description,meal.price)
    // console.log(detailedMeal);
  })
})

app.post('/meals', async (req, res) => {
  let {data, error} = await supabase
  .from('meals')
  .insert({
    id:meals.length,
    name: req.body.plate,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.img_url })
  res.json(meals)
  res.status(201).send('Plate added')
  console.log(data, error)
})