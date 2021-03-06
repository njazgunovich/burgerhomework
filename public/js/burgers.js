// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // UPDATE
    const changeDevourBtns = document.querySelectorAll('#devourBtn');

    // Set up the event listener for the create button
    if (changeDevourBtns) {
        changeDevourBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                // Grabs the id of the element that goes by the name, "id"
                const id = e.target.getAttribute('data-id');
                const newDevour = true
                console.log(newDevour)

                const newDevourState = {
                    devoured: newDevour,
                };

                fetch(`/api/burgers/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    // make sure to serialize the JSON body
                    body: JSON.stringify(newDevourState),
                }).then((response) => {
                    // Check that the response is all good
                    // Reload the page so the user can see the new quote
                    if (response.ok) {
                        console.log(`changed sleep to: ${newDevour}`);
                        location.reload('/');
                    } else {
                        alert('something went wrong!');
                    }
                });
            });
        });
    }

    // CREATE
    const createBurgerBtn = document.getElementById('add-burger');

    if (createBurgerBtn) {
        createBurgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("hello")
                // Grabs the value of the textarea that goes by the name, "quote"
            const newBurger = {
                burger_name: document.getElementById('ca').value.trim(),
                devoured: document.getElementById('devoured').checked,
            };
            try {


                // Send POST request to create a new quote
                fetch('/api/burgers', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    // make sure to serialize the JSON body
                    body: JSON.stringify(newBurger),
                }).then(() => {
                    // Empty the form
                    document.getElementById('ca').value = '';

                    // Reload the page so the user can see the new quote
                    console.log('Created a new burger!');
                    location.reload();
                });
            } catch (err) { console.log(err) }
        });
    }

    // DELETE
    const deleteBurgerBtns = document.querySelectorAll("#deleteBtn");

    // Set up the event listeners for each delete button
    deleteBurgerBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');

            // Send the delete request
            fetch(`/api/burgers/${id}`, {
                method: 'DELETE',
            }).then((res) => {
                console.log(res);
                console.log(`Deleted Burger: ${id}`);

                // Reload the page
                location.reload();
            });
        });
    });
});