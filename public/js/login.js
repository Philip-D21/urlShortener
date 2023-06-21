// login.js

// Get the form element
const loginForm = document.getElementById('login-form');

// Add an event listener to the form submit event
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the form data
  const formData = new FormData(loginForm);

  // Construct the request body
  const body = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    // Send a POST request to the login API endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check the response status
    if (response.ok) {
      // Login successful
      window.location.href = '/dashboard'; // Redirect to the dashboard page
    } else {
      // Login failed
      const data = await response.json();
      console.log(data.message); // Display the error message
    }
  } catch (error) {
    console.error('Error occurred during login:', error);
  }
});
