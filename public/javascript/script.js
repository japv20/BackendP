// import { SupabaseClient } from "@supabase/supabase-js"
document.addEventListener("DOMContentLoaded", (event) => {
    
    //Google signup
    const googleIcon = document.getElementById('google-icon')
    async function signInGoogle() {
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'google', 
        }
    )}

    const { createClient } = supabase;
        supabase = createClient('https://nzbdfmiovbsqjwwhilhn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5ODI5NiwiZXhwIjoxOTQ5OTc0Mjk2fQ.KsfwqP7XECEHLB8NIv80D5KztYINq9mI73qzHMoneuE')
        // console.log(supabase);
    
    googleIcon.addEventListener('click', async(event) => {
        event.preventDefault()
        signInGoogle()
    })

    let supabaseUser = supabase.auth.user()
    console.log(supabaseUser)

    if (supabaseUser !== null) {
    let userName = supabaseUser.identities[0].identity_data.name

    class userSalute {
        constructor(name){
        this.name = name
        }
    }
    let welcomeUser = new userSalute(userName);
    // console.log(`Welcome back ${welcomeUser.name}`);
    let saluteSection = document.getElementById('saludo')
    saluteSection.innerHTML = ` Welcome back ${welcomeUser.name} :) `
    }

    // Calling API meals
    fetch('http://188.166.172.132/meals')
    .then(response => response.json())
        .then ((data) => {
            console.log(data); // array of meals
            
            //key:category and array:arraymeals
            const groupBy = (key, array) => array
            .reduce(
                (cache, meal) => {
                    const property = meal[key]
                    if (property in cache) {
                        return { ...cache, [property]: cache[property].concat(meal)}
                    }
                    return {...cache, [property]:[meal]}
                },
                {}
            )
            // console.log(groupBy('category', data) )

            let startersHolder = document.getElementById('starters')
            let mainHolder = document.getElementById('main')
            let dessertsHolder = document.getElementById('desserts')
            let drinksHolder = document.getElementById('drinks')

                if (supabaseUser === null) {
                    console.log ("Hello stranger")
                }
                else {
                    console.log("Hello user")
                }

                groupedDataObj = groupBy('category', data)
                console.log(groupedDataObj)

                let groupedDataArr = [];
                groupedDataArr.push(groupedDataObj);
                console.log(groupedDataArr)
            
            groupedDataArr.forEach(item => {

                item.Starters.forEach(comida => {
                    startersHolder.innerHTML += `
                <section class="meal" id="${comida.id}">
                    <h3> ${comida.name} </h3>
                    <p> ${comida.description} </p>
                    <p> ${comida.price} </p>
                    <img class="picture-container" src=${comida.picture} alt="${comida.name}"/> <br>
                    <button class="edit"> Edit </button>
                    <button class="delete"> Delete </button>
                </section>
                    `
                })

                item.Main.forEach(comidaMeal => {
                    mainHolder.innerHTML += `
                    <section class="meal" id="${comidaMeal.id}">
                        <h3> ${comidaMeal.name} </h3>
                        <p> ${comidaMeal.description} </p>
                        <p> ${comidaMeal.price} </p>
                        <img class="picture-container" src=${comidaMeal.picture} alt="${comidaMeal.name}"/> <br>
                        <button class="edit"> Edit </button>
                        <button class="delete"> Delete </button>
                    </section>
                        `
                    })

                item.Drinks.forEach(comidaDrinks => {
                    drinksHolder.innerHTML += `
                    <section class="meal" id="${comidaDrinks.id}">
                        <h3> ${comidaDrinks.name} </h3>
                        <p> ${comidaDrinks.description} </p>
                        <p> ${comidaDrinks.price} </p>
                        <img class="picture-container" src="${comidaDrinks.picture} alt="${comidaDrinks.name}" <br>
                        <button class="edit"> Edit </button>
                        <button class="delete"> Delete </button>
                    </section>
                    `
                    })

                item.Desserts.forEach(comidaDessert => {
                    dessertsHolder.innerHTML += `
                    <section class="meal" id="${comidaDessert.id}">
                        <h3> ${comidaDessert.name} </h3>
                        <p> ${comidaDessert.description} </p>
                        <p> ${comidaDessert.price} </p>
                        <img class="picture-container" src=${comidaDessert.picture} alt="${comidaDessert.name}"/> <br>
                        <button class="edit"> Edit </button>
                        <button class="delete"> Delete </button>
                    </section>
                        `
                })
            }); // closing foreach loop

            const logoutButton = document.getElementById('logout')
            //console.log(logoutButton)
            logoutButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const { error } = await supabase.auth.signOut()
                console.log("bye")
                location.reload()
            })
            
            //getting the sections
            let TODO = document.querySelectorAll('.meal'); //console.log(TODO)
            let TODONODE = [...TODO] //console.log(TODONODE)

            // Get modal
            let modalUpdate = document.getElementById('updateModal');
            // Get EDIT buttons
            let editButtonsC = document.getElementsByClassName('edit') // console.log(editButtonsC)
            let editButtons = [... editButtonsC]; // console.log(editButtons)
            editButtons.forEach(editAction => {

                if (supabaseUser !== null) {
                    editAction.style.display = "inline"
                }

                editAction.addEventListener('click', (event) => {
                    event.preventDefault()
                    console.log(`you clicked me to edit ${editAction.parentNode.id} information`)
                    console.log(editAction.parentNode.outerText)
                    console.log(editAction.parentNode.childNodes)
                    // console.log(`Category ${editAction.parentNode.childNodes[3].innerHTML}`)
                    console.log(`Name ${editAction.parentNode.childNodes[1].innerHTML}`)
                    console.log(`Description ${editAction.parentNode.childNodes[3].innerHTML}`)
                    console.log(`Price ${editAction.parentNode.childNodes[5].innerHTML}`)
                    console.log(`Imagen ${editAction.parentNode.childNodes[7].innerHTML}`)

                    modalUpdate.style.display = "block"
                    
                    // <label for="newCategory" id="newCategory"> Category: </label> <br>
                    // <input type="text" name="newCategory" id="newInputCategory" value="${editAction.parentNode.childNodes[3].innerHTML}"> <br>
                    
                    const formContainer = document.querySelector('.update-content');
                    formContainer.innerHTML = `
                    <p> Element id: ${editAction.parentNode.id} </p>
                    <form method="PUT" id="updateForm>
                    
                    <label for="newPlate" id="newPlate"> Plate: </label> <br>
                    <input type="text" name="newPlate" id="newInputPlate" value="${editAction.parentNode.childNodes[1].innerHTML}"> <br>
                    <label for="newDescription" id="newDescription"> Description: </label> <br>
                    <input type="text" name="newDescription" id="newInputDescription" value="${editAction.parentNode.childNodes[3].innerHTML}"> <br>
                    <label for="newPrice" id="newPrice"> Price: </label> <br>
                    <input type="text" name="newPrice" id="newInputPrice" value="${editAction.parentNode.childNodes[5].innerHTML}"> <br>
                    <label for="newImage" id="newImage"> Image: </label> <br>
                    <input type="text" name="newImage" id="newInputImage" value="${editAction.parentNode.childNodes[7].innerHTML}"> <br>
                    
                    <button id="update-submit" type="submit"> Save </button>
                    </form>
                    `

                    let updateBtn = document.querySelector('#update-submit')
                    console.log(updateBtn)
                    updateBtn.addEventListener('click', async(event) => {
                        event.preventDefault()
                        console.log("I have been clicked to edit")

                        // let newCategory = document.getElementById('newInputCategory').value
                        let newName = document.getElementById('newInputPlate').value
                        let newDescription = document.getElementById('newInputDescription').value
                        let newPrice = document.getElementById('newInputPrice').value
                        let newImage = document.getElementById('newInputImage').value

                        console.log(newName, newDescription, newPrice, newImage)

                        fetch('http://188.166.172.132/meals', {
                            headers: {
                                'Accept':'application/json',
                                'Content-Type':'application/json'
                            },
                            method: 'PUT',
                            body: JSON.stringify({id:editAction.parentNode.id, plate:newName, description:newDescription, price:newPrice, img_url:newImage, user:supabase.auth.user().id})
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

                if (supabaseUser !== null) {
                    deleteAction.style.display = "inline"
                }

            deleteAction.addEventListener('click', (event) => {
                event.preventDefault();
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

            // Inserting data to supabase table
    const mealForm = document.querySelector('#addForm')
    if (supabaseUser === null) {
        mealForm.style.display = "none"
    } else {
        mealForm.style.display = "block"
    }

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

    }) //closing dom content loaded