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

const projects = [
  {name:'Food Ordering from Single Restaurant'},
	{name:'Commerce App'}
]

app.get('/projects', (req, res) => {
  res.json(projects)
})

// app.get('/projects', async(req, res) => {
//   let {data: meals, error} = await supabase
//   .from('meals')
//   .select('name')
//   res.json(meals)
//   console.log(error)
//   res.sendStatus(200)
// })

// app.get('/meals', (req, res) => {
//   res.json(meals);
// })

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

app.post('/projects', (req, res) => {
  console.log(`Project: ${req.body.project}`)
  // get name and creator of project
  //create object and add to list
  //return list of projects
  projects.push(req.body.project)
  res.json(projects)
  // console.log(req.body);
  // const userInput = req.body;
  // projects.push(userInput)
  res.status(201).send('Project added');
})

// app.post('/meals', (req, res) => {
//   meals.push( {
//     id:meals.length, 
//     name:req.body.plate, 
//     description:req.body.description,
//     price:req.body.price,
//     img_url:req.body.img_url
//   } )
//   res.json(meals)
//   res.status(201).send('Plate added')
// })

app.post('/meals', (req, res) => {
  // meals.insert ([{
  //   id:meals.length,
  //   name: req.body.plate,
  //   description: req.body.description,
  //   price: req.body.price,
  //   picture: req.body.img_url
  // }])
  res.json(meals)
  res.status(201).send('Plate added')
})