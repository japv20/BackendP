document.addEventListener("DOMContentLoaded", (event) => {
    
    //Google signup
    const googleIcon = document.getElementById('google-icon')
    googleIcon.addEventListener('click', (event) => {
        event.preventDefault()
        console.log("Hello")
        const { createClient } = supabase
        supabase = createClient('https://nzbdfmiovbsqjwwhilhn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5ODI5NiwiZXhwIjoxOTQ5OTc0Mjk2fQ.KsfwqP7XECEHLB8NIv80D5KztYINq9mI73qzHMoneuE')
        console.log(supabase);

        supabase.auth.signIn({provider:'google'})

        let metadata_req = {
            method: "GET",
            url: "http://localhost:3000/protected/all/metadata"
            
        }
    })

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
                <img src=${item.picture}/> <br>
                <button class="edit"> Edit </button>
                <button class="delete"> Delete </button> 
                </section>`
            });

            // Get edit buttons
            let editButtonsC = document.getElementsByClassName('edit'); //console.log(editButtonsC)
            let editButtons = [... editButtonsC]
            console.log(editButtons)

            editButtons.forEach(editAction => {
                // console.log("Hi")
                editAction.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log('you clicked me')
                    console.log(`You have clicked this button ${editAction.id}`)
                })
            })

             // Get delete buttons
            let deleteButtonsC = document.getElementsByClassName('delete'); // console.log(deleteButtonsC)
            const deleteButtons = [... deleteButtonsC]
            console.log(deleteButtons)
        })
    }) //closing dom content loaded

    // Delete data on supabase
    function deleteData() {
        
    }

    // Cleaning form inputs
    function clearForm() {
            inputCategories.value = "";
            inputDish.value = "";
            inputDescription.value = "";
            inputPrice.value = "";
            inputImg.value = "";
    }
    
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