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

    let supabaseUser = supabase.auth.user()
    console.log(supabaseUser)

    // console.log(supabaseUser.identities[0].identity_data.name)
    // let userName = supabaseUser.identities[0].identity_data.name

    // // import userSalute  from './class-module';
    // // const userBienvenida = userSalute;
   
    // class userSalute {
    //     constructor(name){
    //     this.name = name
    //     }
    // }
    // let welcomeUser = new userSalute(userName);
    // console.log(`Welcome back ${welcomeUser.name}`);

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
            // endpoint that passes the id
            // group them by category 

            // console.log(supabase.auth.session())
            // let userSession = supabase.auth.session;
            // if (userSession.value == null) {
            //     console.log("i am null")
            // }
    
            let listHolder = document.getElementById('menus');
            let roleListHolder = document.getElementById('menus-for-role');
            function dataForOwners(mealInfo) {
                roleListHolder.innerHTML += `
                <section class="meal" id="${mealInfo.id}">
                <h3> ${mealInfo.name} </h3>
                <p class="italic"> ${mealInfo.category} </p>
                <p> ${mealInfo.description} </p>
                <p> £${mealInfo.price} </p>
                <img class="picture-container" src=${mealInfo.picture} alt="${mealInfo.name}"/> <br>
                <button class="edit"> Edit </button>
                <button class="delete"> Delete </button>
                </section>
                `
            }

            function dataForAll(mealData) {
                listHolder.innerHTML += ` 
                <section class="meal" id="${mealData.id}">
                <h3> ${mealData.name} </h3>
                <p class="italic"> ${mealData.category} </p>
                <p> ${mealData.description} </p>
                <p> £${mealData.price} </p>
                <img class="picture-container" src=${mealData.picture} alt="${mealData.name}"/> <br>
                </section>
                `
            }

            data.forEach(item => {

                console.log(supabaseUser)
                if (supabaseUser !== 'null') {

                    console.log ("Hello stranger")
                }
                else {
                    console.log("Hello no stranger")
                }

                dataForOwners(item)
            }); // closing foreach loop

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

            // Get modal
            let modalUpdate = document.getElementById('updateModal');
            // Get EDIT buttons
            let editButtonsC = document.getElementsByClassName('edit') // console.log(editButtonsC)
            let editButtons = [... editButtonsC]; // console.log(editButtons)
            editButtons.forEach(editAction => {
                editAction.addEventListener('click', (event) => {
                    event.preventDefault()
                    console.log(`you clicked me to edit ${editAction.parentNode.id} information`)
                    console.log(editAction.parentNode.outerText)
                    console.log(`Category ${editAction.parentNode.childNodes[3].innerHTML}`)
                    console.log(`Name ${editAction.parentNode.childNodes[1].innerHTML}`)
                    console.log(`Description ${editAction.parentNode.childNodes[5].innerHTML}`)
                    console.log(`Price ${editAction.parentNode.childNodes[7].innerHTML}`)
                    console.log(`Imagen ${editAction.parentNode.childNodes[9].innerHTML}`)

                    modalUpdate.style.display = "block"
                    
                    const formContainer = document.querySelector('.update-content');
                    formContainer.innerHTML = `
                    <p> Element id: ${editAction.parentNode.id} </p>
                    <form method="PUT" id="updateForm>
                    
                    <label for="newCategory" id="newCategory"> Category: </label> <br>
                    <input type="text" name="newCategory" id="newInputCategory" value="${editAction.parentNode.childNodes[3].innerHTML}"> <br>
                    <label for="newPlate" id="newPlate"> Plate: </label> <br>
                    <input type="text" name="newPlate" id="newInputPlate" value="${editAction.parentNode.childNodes[1].innerHTML}"> <br>
                    <label for="newDescription" id="newDescription"> Description: </label> <br>
                    <input type="text" name="newDescription" id="newInputDescription" value="${editAction.parentNode.childNodes[5].innerHTML}"> <br>
                    <label for="newPrice" id="newPrice"> Price: </label> <br>
                    <input type="text" name="newPrice" id="newInputPrice" value="${editAction.parentNode.childNodes[7].innerHTML}"> <br>
                    <label for="newImage" id="newImage"> Image: </label> <br>
                    <input type="text" name="newImage" id="newInputImage" value="${editAction.parentNode.childNodes[9].innerHTML}"> <br>
                    
                    <button id="update-submit" type="submit"> Save </button>
                    </form>
                    `

                    let updateBtn = document.querySelector('#update-submit')
                    console.log(updateBtn)
                    updateBtn.addEventListener('click', async(event) => {
                        event.preventDefault()
                        console.log("I have been clicked to edit")

                        let newCategory = document.getElementById('newInputCategory').value
                        let newName = document.getElementById('newInputPlate').value
                        let newDescription = document.getElementById('newInputDescription').value
                        let newPrice = document.getElementById('newInputPrice').value
                        let newImage = document.getElementById('newInputImage').value

                        console.log(newCategory, newName, newDescription, newPrice, newImage)

                        fetch('http://localhost:3000/meals', {
                            headers: {
                                'Accept':'application/json',
                                'Content-Type':'application/json'
                            },
                            method: 'PUT',
                            body: JSON.stringify({id:editAction.parentNode.id,category:newCategory, plate:newName, description:newDescription, price:newPrice, img_url:newImage, user:supabase.auth.user().id})
                        })
                    location.reload()
                    })

                    window.onclick = function(event) {
                        if (event.target == modalUpdate) {
                            modalUpdate.style.display = "none";
                        } 
                    }
                })
            })

             // Get delete buttons
            let deleteButtonsC = document.getElementsByClassName('delete'); // console.log(deleteButtonsC)
            const deleteButtons = [... deleteButtonsC] // console.log(deleteButtons)
            deleteButtons.forEach(deleteAction => {
            deleteAction.addEventListener('click', (event) => {
                event.preventDefault();
                console.log(`you clicked me to delete ${deleteAction.parentNode.id} information`)
                // deleteAction.parentNode.outerText
                fetch('http://localhost:3000/delete/', {
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
        
        fetch('http://localhost:3000/meals', {
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify({category:mealCategory, plate:mealName, description:mealDescription, price:mealPrice, img_url:mealImage, user:supabase.auth.user().id})
            })
        location.reload()
    })