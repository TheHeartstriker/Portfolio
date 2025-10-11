# What a backend looks like Javascript, Express and Node.

This article is going to go over the backend! More spefically what a simple backend looks like, how everything fit's together with a database and most importantly folder structures. We are going
to go over each folder of a common backend and discuse why they exist, what they do and how they tie in with the frontend.

## Why this matter's

The general goal is for you to understand at a high level how a backend works even regardless of the tooling we are going to use(Express and node). But at the same time not to such a high level that you don't actually understand what a backend look's like. When I was getting into backend it was hard to find something that really showed me what a backend was through code. So to do that here I am going to go over each marjor backend directory and files those being the entry point, routing, middleware and controler's showing what each part does what it's code looks like, why it’s there, and how its expanded upon in more advanced settings.

## What is the backend?

The backend in a fullstack app is a comminication point between the database and the frontend. A middle man that in the end is just a collection of endpoint's.
For example say you have a backend server url it looks like so `server-url/api/login` the frontend send's a POST request to `api/login` using [HTTP](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http) the backend then receives that request then does something based on our logic.

Using the same example that POST request might check the data base to see if a username is in use and return true or false to the frontend depending on the result. Or rather then comnicate with designated database it could even send request's to other server's/backend's instead!

## Entry point

What is a entry point? Well here in express its a place to both apply's setting's to our server and start it! Consider the following code

```javascript
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//Middleware
import errorHandler from "./middleWare/errorMiddleWare.js";
import limiter from "./middleWare/rateMiddleWare.js";
import corsMiddleware from "./middleWare/corsMiddleWare.js";
//Routes
import routes from "./routes.js";

//Configures the environment variables and express
dotenv.config();
const app = express();

//Middleware
app.use(corsMiddleware);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

Let's walk through it starting at `dotenv.config` downward. First the line itself configure's dotenv which are varables for the entire server. Think of integeral data for our backend like where is the database? What's said databases password? Username? What about the location of the frontend? What is our data enyption keys? All very important information that is sensitive and subject to change. Changes like a switch from a test database to a live one and sensitive meaning that if someone has the encyption key they could falsify data or or if they have the database sign in they can steal all our data! So .env acts as a safe storage container basically. And `dotenv.config` allows our server to access our .env file.

The next line intalizes the express app. After that we get to the middleware but what is middleware? It's kind of like a layer before data passes through to something. This middleware is located at the root meaning all data must pass through our root middleware layer before getting to our routes. Some middleware like [CORS](https://aws.amazon.com/what-is/cross-origin-resource-sharing/) and our rate limiter act as sucritey for our backend like gandolf! While others things like `express.json()` and `cookieParser` put certain data under convenient names like all incoming requests that have [cookie's](https://www.cloudflare.com/learning/privacy/what-are-cookies) put said data under `req.cookies`. More on the usage's of middleware later.

Now after passing through our middelware we get to `app.use("/api", routes)` which is saying every request to `backendUrl/api` use the routes file to locate your endpoint for example `backendUrl/api/login` lookes into routes for a listener for `/login` which then provide's or request to our controller. This allows for sepration of concerns quite litterally like folders or directorys alowing us to orgnaize our api as such.

But what about `app.listen`? Well this start's or server at port 3000 or if present out .env's PORT value so we actually find our backend at something like so `backendUrl:3000/api`.

## Routes

Now let walk through routes! Probably the simplest part of this entire thing here is an example.

```javascript
import { Router } from "express";
import { login, register } from "./Controllers/authController.js";

const routes = Router();

routes.post("/login", login);
routes.post("/register", register);

export default routes;
```

Lets consider or previous example through `routes.post("/login", login);` say we make a request to our backend to the point `backendUrl:3000/api/login` it goes through our global middleware defined in the entry point and since it has `/api` it goes through routes as mentiond in the previous section.
Then if it finds a match passes the request body to the route which in this case immeditaly passes the request to our controler function login but more on controlers later! Now something important to note is that a match must posses both the name `/login` and the HTTP type. For the sake of example consider the following.

```javascript
routes.post("/login", login1);
routes.get("/login", login2);
```

These are both different routes. A post request at `/login` passes it request to the login1 controler and a get request to login will pass its request to login2. This is done for one big reason seperation of concerns. Endpoint's and api's typically do one thing that's it. For example a POST to `/register` would provide user data that is then inserted into the database while a post to `/login` might check login info against existing records. Now another thing to note is this can be chained in express. For example say you send a COOKIE and [json web token](https://www.jwt.io/introduction#what-is-json-web-token-structure) along with a request body you would want to validate the request before it get's to the controller. And in that case you would slap some middleware in that route like so.

```javascript
routes.get("/getData", auth, loadData);
```

So here it would look and function like so request -> auth -> loadData. And since our middlware here auth is a true or false deal if that fails or request never get's to our controller loadData it just returns a error to the frontend. And something to note in larger applications your api routing work's like frontend directorys simply put folder's sorted by purpose. Your `/api` router would link to other routers like a tree.

## Middleware

We have somewhat gone over what middleware which is a layer. But what this layer trully? Well its just code that does 'something' to incoming data. Sometimes that's data modification, rate limiting check's, authorization or error handling usually it represent's doing a action to a request before it reach's the main controler logic. Sometimes this is global like checking every request to see if they follow's our CORS setting's. Othertimes it's spefic to certain routes like authorizing GET request before fetching data for a user. Here is one of the most common middleware's in any backend.

```javascript
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function auth(req, res, next) {
  try {
    const token = req.cookies?.jwtToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication required", success: false });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
}
```

This is a authoirization middleware for a protected route so imagine our fronted request's data to a route that looks like so `routes.get("/getData", auth, loadData);` we added or auth middleware before our controller defining this route as 'protected' so any request has to pass through or auth first to see if the credintials are valid if they are we pass it onward using `next();` which in this case passes it to `loadData` otherwise send back a error. It in a whole would look like this Request -> auth -> loadData -> response. In our middleware here we validate data by decoding our request data using or web token key. This also show's you how convient and required a .env file is we can change access key often while also keeping it safe!

Now let's show you a global middelware I glossed over at the start. Consider this line `app.use(corsMiddleware);` let see what the corsMiddleware looks like.

```javascript
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
```

All this does it implement CORS to every incoming request in our entry point through `app.use(corsMiddleware);`. The idea behind middelware is not that its a function, or secruity it's that middelware is code that does something to a request's at certain points in its journey. Sometimes that's stopping it othertimes it putting cookies under .cookies sometimes it's a error handler.

## Controller's

Controller's are arguably the most important part of a backend. We have went over everything that happens before reaching this point but what is a controller? Well it's just a function that completes a action sometimes that's inserting data, deleting data or checking up on data like seeing if a payment has gone through.
You can think of a api request to a endpoint as a function call and the request body as the function paramater's and the controller is the function itself. So let's see one :)

```javascript
import db from "../../db.js"; // Assume db is a configured mysql2/promise connection

// Gets the share info for the user
async function getShareInfo(req, res, next) {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      "SELECT share FROM dailyfitinfo WHERE userid = ? LIMIT 1",
      [userId]
    );
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No record found for user", success: false });
    }

    res.status(200).json({ success: true, shared: rows[0].share });
  } catch (error) {
    next(error);
  }
}
```

This is a very simple controller function using mysql it just grab's the user's information from the database and return's the share value as a response(res). Which is either true or false. Now what is db? Well here we use MySql as our database and to write query's and receive date from our database we need to connect to it and use some sort of method to send a sql query over. Here we are using the mysql2 npm package to write our query. And the connection is represented as db it looks like so.

```javascript
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // e.g. "root"
  password: process.env.DB_PASS, // password
  database: process.env.DB_NAME, // db name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
```

And as you can see all db really is a pool of connections to the database and when you write sql using `db.` it choses a connection for you to send and recevie information from your database. You of course also provide your connection information so mysql2 can locate the database and login as a user. Which happens to be sensitive information so we put that inside of .env as well.
