// import { SupabaseClient } from "@supabase/supabase-js"

document.addEventListener("DOMContentLoaded", (event) => {
    
    //Google signup
    const googleIcon = document.getElementById('google-icon')
    async function signInGoogle() {
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'google' 
        }, {
            // redirectTo: 'http://localhost:3000/welcome'
        })
    }

    // const { createClient } = supabase;
        // supabase = createClient('https://nzbdfmiovbsqjwwhilhn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5ODI5NiwiZXhwIjoxOTQ5OTc0Mjk2fQ.KsfwqP7XECEHLB8NIv80D5KztYINq9mI73qzHMoneuE')
        // console.log(supabase);
    // const user = supabase.auth.user()
    // console.log(user)
    
    googleIcon.addEventListener('click', async(event) => {
        event.preventDefault()
        const { createClient } = supabase
        supabase = createClient('https://nzbdfmiovbsqjwwhilhn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5ODI5NiwiZXhwIjoxOTQ5OTc0Mjk2fQ.KsfwqP7XECEHLB8NIv80D5KztYINq9mI73qzHMoneuE')
        // console.log(supabase);

        // const { user, session, error } = await supabase.auth.signIn({
        //     provider: 'google' 
        // })

        supabase.auth.signIn({ provider:'google'}
        )

        // signInGoogle();
    })

    console.log(supabase.auth.currentUser())

    // Magic link sign up
    const userToLogIn = document.getElementById('user-login');
    const userForm = document.getElementById('user-form')
    userToLogIn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Hello")
        userForm.style.display = "block";
    })

    const emailAddress = document.getElementById('user-email')
    const buttonForm = document.getElementById('get-link')
    buttonForm.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("hello")
        console.log(`This is the email: ${emailAddress.value}`)

        fetch('http://localhost:3000/login', {
            headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify({email:emailAddress.value}) 
        })
    })

    // Calling API meals
    fetch('http://localhost:3000/meals')
    .then(response => response.json())
        .then ((data) => {
            console.log(data); // array of meals
        
            let listHolder = document.getElementById('menus');
            data.forEach(item => {
                listHolder.innerHTML += 
                `<section class="meal" id="${item.id}">
                <h3> ${item.name} </h3>
                <p> <i> ${item.category} </i> </p>
                <p> ${item.description} </p>
                <p> ${item.price} </p>
                <img class="picture-container" src=${item.picture}/> <br>
                <button class="edit"> Edit </button>
                <button class="delete"> Delete </button> 
                </section>
                `

            }); //closing data for each loop

            
            let TODO = document.querySelectorAll('.meal');
            console.log(TODO)
            let TODONODE = [...TODO]
            console.log(TODONODE)

            function getDataHTML (id) {
                let nameContainer = document.getElementsByClassName('name-container')
                let categoryContainer = document.getElementsByClassName('category-container')
                let descriptionContainer = document.getElementsByClassName('description-container')
                let priceContainer = document.getElementsByClassName('price-container')
                let pictureContainer = document.getElementsByClassName('picture-container')
            }

             // Get delete buttons
            let deleteButtonsC = document.getElementsByClassName('delete'); // console.log(deleteButtonsC)
            const deleteButtons = [... deleteButtonsC]
            // console.log(deleteButtons)
            deleteButtons.forEach(deleteAction => {
            deleteAction.addEventListener('click', (event) => {
                event.preventDefault();
                //FIRSTELEMENTCHILD to get details
                console.log(`you clicked me to delete ${deleteAction.parentNode.outerText} information`)
                
                fetch('http://localhost:3000/delete', {
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({id:deleteAction.parentNode.id, body: deleteAction.parentNode.outerText}) 
                
                })
                // location.reload()
            })
        })
        })


    }) //closing dom content loaded

    // Inserting data to supabase table
    const mealForm = document.querySelector('#addForm')
    mealForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("I have been clicked")

        let mealCategory = document.getElementById('inputCategories').value
        let mealName = document.getElementById('inputDish').value;
        let mealDescription = document.getElementById('inputDescription').value;
        let mealPrice = document.getElementById('inputPrice').value;
        let mealImage = document.getElementById('inputImg').value;
    
        fetch('http://localhost:3000/meals', {
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify({category:mealCategory, plate:mealName, description:mealDescription, price:mealPrice, img_url:mealImage})
            })
        location.reload()
    })