// signup.js

// Get the form element
const signupForm = document.getElementById('signup-form');

// Add an event listener to the form submit event
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the form data
  const formData = new FormData(signupForm);

  // Construct the request body
  const body = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    // Send a POST request to the signup API endpoint
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check the response status
    if (response.ok) {
      // Signup successful
      window.location.href = '/login'; // Redirect to the login page
    } else {
      // Signup failed
      const data = await response.json();
      console.log(data.message); // Display the error message
    }
  } catch (error) {
    console.error('Error occurred during signup:', error);
  }
});
