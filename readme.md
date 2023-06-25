# URL Shortener Website
Back-end development Tech Stack
* Node.js
* Expressjs
* MongoDB  ---> mongoose as the typeODM



## Setup

```bash
npm install && npm start
```

Don't forget to add .env file contain the MONGO_URI, PORT and Base_URL Variables.

(Base_URL is something like http://sho.rtly)

### Functionality
- URL Shortener Web App that makes generate short URL for your  long URL
- Generate QR Codes for your new short URL
- custom Domain 
- User get to see Link history
- Analytics


### 2. file structure:

  - [App.js]: main file
  + `routes`: a folder that uses the express router feature and keeps the route information in it.
  + `controllers`: a folder that contains controller functions for routes authentication.
  + `middleware`: a folder that contains middleware functions for routes authencation.
  + `db`: a folder that contains the database configuration.
  + `models`: a folder that contains user, url, clicks.
  + `env`: environment variables
  + `package.json`: package.json
  + `package-lock.json`: package-lock.json



### base URL
  - [Home page] ()

#### Register 

* To register a user, you can make a POST request to

  /api/auth/signup

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success

  
#### Login

* To login, simply make a post request to

/api/auth/login

### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "",
  "username": '",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```


#### URL Features

   

   



## Contributor
   - Daudu Philip

