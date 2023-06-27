# Setup
Back-end development Tech Stack
* Node.js
* Expressjs
* MongoDB  ---> mongoose as the typeODM.
* Redis ---> for caching.
* Postman  ---> Testing endpoints.

```
- clone this repo
- run  `npm run start:dev`
```
---

### Functionality
- User authentication
- URL Shortener Web App that makes generate short URL for your  long URL
- Generate QR Codes for your new short URL
- custom Domain 
- User get to see Link history
- Analytics
- caching 
- writing unit test.
---

### file structure:
  - [App.js]: main file
  + `routes`: a folder that uses the express router feature and keeps the route information in it.
  + `config` : contains the redis client connection
  + `controllers`: a folder that contains controller functions for routes authentication.
  + `middleware`: a folder that contains middleware functions for routes authencation.
  + `db`: a folder that contains the database configuration.
  + `models`: a folder that contains user, url, clicks.
  + `env`: environment variables
  + `package.json`: package.json
  + `package-lock.json`: package-lock.json
---


### Base URL
  - [Home page] (https://sho-rtly.onrender.com/)

## Models
---


### User
| field    |  data_type   |    constraints  |
|---|---|---|
|   id  | string  | required
|  username  |   string   |  required  |
|  email     | string  |  optional |
|  password |   string |  required  |

### Url
| field    |  data_type   |    constraints  |
|---|---|---|
|  id |  string |  required |
|  longurl | string |  required  |
|  shortUrl  |  string |  required  |
|  shortId    | string  |  required |
|  clicks |   array |  ref : `click` |
|  userId | ObjectId |  ref: `User` |
|  customUrl  |  string  | unique : `true` |


### Click
| field    |  data_type   |    constraints  |
|---|---|---|
|  id |  string |  required |
| urlId | ObjectId |  ref : `Url`  |
| createdAt | ObjectId |  ref : `Url` ,default: `Data.now`  |
| ipAddress | string |  ref : `Url`  |




##  APIs
---
### Register User

* To register a user, you can make a POST request to

  https://sho-rtly.onrender.com/api/auth/signup

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
```
---

### Login User

- Route: https://sho-rtly.onrender.com/api/auth/login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "email": "doe@example.com",
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
---

### create Shorten Url with generate QR code

- Route: /api/url/shorten
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 

```
{
  
  longUrl: "https://qawsedfrt.com/cvfdghn
  
}
```

- Responses

Success

```
{
     "_id": "64997e5801bb5f7c97cd6c78",
    "shortUrl": "http://localhost:4400/-gYxhA7Xw",
    "longUrl": "https://qawsedfrt.com/cvfdghn",
    "shortId": "-gYxhA7Xw",
    "clicks": [],
    "userId": "64997bc3b980dfa68c104798",
}
```
---



   

   

## Contributor
   - Daudu Philip

