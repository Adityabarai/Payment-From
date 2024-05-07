// Script URL for Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbzXnT6AeCQ1ezpscuV_L_yokn8qM3A4Yar9YM52Eh33tb6rKosQ2hJ7WqAxK74CXLI37w/exec';

// Get the form element
const form = document.forms['submit-to-google-sheet'];

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Send the form data using the fetch API
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        if (response.ok) {
            // Display success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Transaction Completed Successfully!',
                text: 'Thank you for your Billing.',
            });

            // Reset the form
            form.reset();
        } else {
            // Handle non-2xx status codes
            return response.json().then(data => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Server error: ${data.error || data.message || 'Unknown error'}`,
                });
            });
        }
    })
    .catch(error => {
        // Handle network errors
        console.error('Error:', error);

        // Display error message using SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again.',
        });
    });
}

// Attach the event listener to the form
form.addEventListener('submit', handleSubmit);
