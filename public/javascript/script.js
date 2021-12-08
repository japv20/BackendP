// import { SupabaseClient } from "@supabase/supabase-js"

document.addEventListener("DOMContentLoaded", (event) => {
    
    //Google signup
    const googleIcon = document.getElementById('google-icon')
    async function signInGoogle() {
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'google', 
        }
        // {
        // redirectTo:'http://localhost:5500/html/welcome.html'
        // }
        )
    }

    const { createClient } = supabase;
        supabase = createClient('https://nzbdfmiovbsqjwwhilhn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5ODI5NiwiZXhwIjoxOTQ5OTc0Mjk2fQ.KsfwqP7XECEHLB8NIv80D5KztYINq9mI73qzHMoneuE')
        // console.log(supabase);
    
    googleIcon.addEventListener('click', async(event) => {
        event.preventDefault()
        signInGoogle()
    })

    console.log(supabase.auth.user())

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
    fetch('http://188.166.172.132/meals')
    .then(response => response.json())
        .then ((data) => {
            console.log(data); // array of meals
            // endpoint that passes the id
            // group them by category 
            
            //console.log(supabase.auth.user().role) // console.log role of current user
            
            let listHolder = document.getElementById('menus');
            let roleListHolder = document.getElementById('menus-for-anon');
            data.forEach(item => {
                // console.log("donde estan mis meals")
                listHolder.innerHTML += ` 
                <section class="meal" id="${item.id}">
                <h3> ${item.name} </h3>
                <p> <i> ${item.category} </p> </i>
                <p> ${item.description} </p>
                <p> ${item.price} </p>
                <img class="picture-container" src=${item.picture} alt="${item.name}"/> <br>
                </section>
                `
                if(supabase.auth.user().role == 'authenticated') {
                    // console.log("estoy funcionando sorros")
                    listHolder.style.display = "none";
                    console.log("hello")
                    roleListHolder.innerHTML += `
                    <section class="meal" id="${item.id}">
                    <h3> ${item.name} </h3>
                    <p> <i> ${item.category} </p> </i>
                    <p> ${item.description} </p>
                    <p> ${item.price} </p>
                    <img class="picture-container" src=${item.picture} alt="${item.name}"/> <br>
                    <button class="edit"> Edit </button>
                    <button class="delete"> Delete </button>
                    </section>
                    `
                }
            }); // closing foreach loop

            // let anonHolder = document.getElementById('menus-for-anon')
            // two templates put them in a js folder 
            // data.forEach(item => {                
            //     let templateForAnon = `
            //     <section class="meal" id="${item.id}">
            //     <h3> ${item.name} </h3>
            //     <p> <i> ${item.category} </i> </p>
            //     <p> ${item.description} </p>
            //     <p> ${item.price} </p>
            //     <img class="picture-container" src=${item.picture} alt="${item.name}"/> <br>
            //     </section> `

            //     let templateForUser = `<section class="meal" id="${item.id}">
            //     <h3> ${item.name} </h3>
            //     <p> <i> ${item.category} </i> </p>
            //     <p> ${item.description} </p>
            //     <p> ${item.price} </p>
            //     <img class="picture-container" src=${item.picture} alt="${item.name}"/> <br>
            //     <button class="edit"> Edit </button>
            //     <button class="delete"> Delete </button>
            //     </section> `

            //     // anonHolder.innerHTML += templateForAnon

            //     if (supabase.auth.user().role = 'authenticated') {
            //         listHolder.innerHTML += templateForUser;
            //         // anonHolder.style.display = "none";
            //     } 
            //     else {
            //         listHolder.innerHTML += templateForAnon;
            //     }

            // }); //closing data for each loop

            const logoutButton = document.getElementById('logout')
            console.log(logoutButton)
            logoutButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const { error } = await supabase.auth.signOut()
                console.log("bye")
            })
            
            //getting the sections
            let TODO = document.querySelectorAll('.meal');
            console.log(TODO)
            let TODONODE = [...TODO]
            console.log(TODONODE)

            // Get EDIT buttons
            let editButtonsC = document.getElementsByClassName('edit') // console.log(editButtonsC)
            let editButtons = [... editButtonsC]; // console.log(editButtons)

            // Get modal
            let modalUpdate = document.getElementById('updateModal');
            let closeModal = document.getElementsByClassName('close')[0]

            function displayFormModal(byMealID) {
                const formContainer = document.querySelector('.update-content');
                formContainer.innerHTML = `
                <span class="close">&times;</span>
                <p> This is the id ${byMealID} </p>
                <p> This is the tester ${editAction.parentNode.firstElementChild} </p>                
                `
            }

            editButtons.forEach(editAction => {
                editAction.addEventListener('click', (event) => {
                    event.preventDefault()
                    console.log(editAction.firstElementChild)
                    console.log(`you clicked me to edit ${editAction.parentNode.id} information`)
                    console.log(editAction.parentNode.outerText)
                    console.log(editAction.parentNode.h3)
                    console.log(this.parentNode)

                    modalUpdate.style.display = "block"
                    
                    // displayFormModal(editAction.parentNode.id)
                    const formContainer = document.querySelector('.update-content');
                    formContainer.innerHTML = `
                    <p> This is the id ${editAction.parentNode.id} </p>
                    <p> This is the name ${editAction.parentNode.firstElementChild.innerHTML} </p>
                    <p> This is the category ${editAction.parentNode.name} </p>
                    `

                    window.onclick = function(event) {
                        if (event.target == modalUpdate) {
                            modalUpdate.style.display = "none";
                        } 
                    }

                })
            })

             // Get delete buttons
            let deleteButtonsC = document.getElementsByClassName('delete'); // console.log(deleteButtonsC)
            const deleteButtons = [... deleteButtonsC]
            // console.log(deleteButtons)
            deleteButtons.forEach(deleteAction => {
            deleteAction.addEventListener('click', (event) => {
                event.preventDefault();
                //FIRSTELEMENTCHILD to get details
                console.log(`you clicked me to delete ${deleteAction.parentNode.id} information`)
                // deleteAction.parentNode.outerText
                fetch('http://188.166.172.132/delete/', {
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({id:deleteAction.parentNode.id}) 
                
                })
                location.reload()
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
    
        fetch('http://188.166.172.132/meals', {
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify({category:mealCategory, plate:mealName, description:mealDescription, price:mealPrice, img_url:mealImage, user:supabase.auth.user().id})
            })
        location.reload()
    })