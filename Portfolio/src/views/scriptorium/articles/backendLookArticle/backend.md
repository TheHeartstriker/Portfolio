# What a backend looks like Javascript, Express and Node.

This article is going to go over the backend! More specifically, what a simple backend looks like, how everything fits together with a database, and most importantly, folder structures. We are going to go over each folder of a common backend and discuss why they exist, what they do, what they contain, and how they tie in with the frontend.

## Why this matter's

The general goal is for you to understand at a high level how a backend works and what it looks like code-wise, regardless of the tooling we are going to use (Express and Node). When I was getting into backend development, it was hard to find something that really showed me what a backend looked like in practice both the code, concepts, and file structure. So, to do that here, I am going to go over each major backend directory and file, those being the entry point, routing, middleware, and controllers, showing what each part does, what its code looks like, why it’s there, and how it’s expanded upon in more advanced settings.

## What is the backend?

The backend in a full-stack app is a communication point between a database or databases and the frontend a middleman that, in the end, is just a collection of endpoints.
For example, say you have a backend server URL that looks like this: `server-url/api/login` the frontend sends a POST request to `api/login` using [HTTP](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http) the backend then receives that request and does something based on our logic.

Using the same example, that POST request might check the database to see if a username is in use and return true or false to the frontend depending on the result. Or rather than communicate with a designated database, it could even send requests to other servers/backends instead!

## Entry point

What is an entry point? Well, here in Express, it’s a place that both applies settings to our server and starts it! Consider the following code:

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

Let’s walk through it, starting at `dotenv.config` downward. First, the line itself configures dotenv, which provides variables for the entire server. Think of integral data for our backend like: where is the database? What’s the database’s password? Username? What about the location of the frontend? What are our data encryption keys? All very important information that is sensitive and subject to change. Changes like a switch from a test database to a live one and sensitive meaning that if someone has the encryption key, they could falsify data, or if they have the database sign-in, they can steal all our data! So, .env acts as a safe storage container, basically. And `dotenv.config` allows our server to access our .env file. Ps add .env in your `.gitignore` to keep them a secret!

The next line initializes the Express app. After that, we get to the middleware but what is middleware? It’s kind of like a layer that data passes through before reaching something else. This middleware is located at the root, meaning all data must pass through our root middleware layer before getting to our routes. Some middleware like [CORS](https://aws.amazon.com/what-is/cross-origin-resource-sharing/) and our rate limiter act as security for our backend like Gandalf! While others, like `express.json()` and `cookieParser`, put certain data under convenient names for example, all incoming requests that have cookies are placed under `req.cookies`. More on the usage of middleware later.

Now, after passing through our middleware, we get to `app.use("/api", routes)`, which is saying every request to `backendUrl/api` should use the routes file to locate its endpoint for example, `backendUrl/api/login` looks into routes for a listener for `/login`, which then provides or requests to our controller. This allows for separation of concerns quite literally like folders or directories allowing us to organize our API as such.

But what about `app.listen`? Well, this starts our server at port 3000, or if present, our .env’s PORT value. So, we actually find our backend at something like `backendUrl:3000/api`.

## Routes

Now let’s walk through routes! Probably the simplest part of this entire backend thing here’s an example.

```javascript
import { Router } from "express";
import { login, register } from "./Controllers/authController.js";

const routes = Router();

routes.post("/login", login);
routes.post("/register", register);

export default routes;
```

Let’s consider our previous example through `routes.post("/login", login);`. Say we make a request to our backend at the point `backendUrl:3000/api/login` it goes through our global middleware defined in the entry point, and since it has `/api`, it goes through routes as mentioned in the previous section.
Then, if it finds a match, it passes the request body to the route, which in this case immediately passes the request to our controller function login but more on controllers later! Now, something important to note is that a match must possess both the name `/login` and the HTTP type. For the sake of example, consider the following

```javascript
routes.post("/login", login1);
routes.get("/login", login2);
```

These are both different routes. A POST request at `/login` passes its request to the login1 controller, and a GET request to login will pass its request to login2. This is done for one big reason separation of concerns. Endpoints and APIs typically do one thing, that’s it. For example, a POST to `/register` would provide user data that is then inserted into the database, while a POST to `/login` might check login info against existing records.

Now, another thing to note is this can be chained in Express. For example, say you send a cookie and a [JSON Web Token](https://www.jwt.io/introduction#what-is-json-web-token-structure) along with a request body you would want to validate the request before it gets to the controller. In that case, you would slap some middleware in that route like so.

```javascript
routes.get("/getData", auth, loadData);
```

So here, it would look and function like this: request -> auth -> loadData. And since our middleware here, auth, is a true or false deal, if that fails, our request never gets to our controller loadData; it just returns an error to the frontend. And something to note in larger applications, your API routing works like frontend directories. Simply put, folders are sorted by purpose. Your `/api` router would link to other routers like a tree.

## Middleware

We have somewhat gone over what middleware is a layer. But what is this layer truly? Well, it’s just code that does `something` to incoming data. Sometimes that’s data modification, rate-limiting checks, authorization, or error handling. Usually, it represents performing an action on a request before it reaches the main controller logic. Sometimes this is global, like checking every request to see if it follows our CORS settings. Other times, it’s specific to certain routes, like authorizing a GET request before fetching data for a user. Here is one of the most common middleware functions in any backend.

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

This is an authorization middleware for a protected route. So, imagine our frontend requests data from a route that looks like this: `routes.get("/getData", auth, loadData);`. We added our auth middleware before our controller, defining this route as protected, so any request has to pass through our auth first to see if the credentials are valid. If they are, we pass it onward using `next();`, which in this case passes it to `loadData` otherwise, it sends back an error. As a whole, it would look like this: Request -> auth -> loadData -> response. In our middleware here, we validate data by decoding our request data using our web token key. This also shows how convenient and necessary a .env file is we can change access keys often while also keeping them safe!

Now, let’s show you a global middleware I glossed over at the start. Consider this line: `app.use(corsMiddleware);`. Let’s see what the corsMiddleware looks like.

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

All this does is implement CORS for every incoming request in our entry point through `app.use(corsMiddleware);`. The idea behind middleware is not that it’s a function or security mechanism it’s that middleware is code that does something to a request at certain points in its journey. Sometimes that’s stopping it, other times it’s putting cookies under .cookies, and sometimes it’s handling errors.

## Controller's

Controllers (sometimes also called services or modules) are arguably the most important part of a backend. We’ve gone over everything that happens before reaching this point but what is a controller? Well, it’s just a function that completes API logic. Sometimes that’s inserting data, deleting data, or checking up on data like seeing if a payment has gone through. You can think of an API request to an endpoint as a function call, and the request body as the function parameters, with the controller being the function itself. So, let’s see one that communicates with a database :)

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
    //next(error) represents sending unknown error's to a global error handling software for later review
    next(error);
  }
}
```

This is a very simple controller function we send over the userId in the request and then, using our ID, we send a query to our database. All our query does is pick a piece of data, and we return the true or false .share value in our response (res).

But not all controllers talk directly to a database some fetch data from other services. For example, you might make a request to another service to check payment information, or maybe you want to get data from Spotify? In both those cases, you follow that API’s documentation, make your request, and then have data to presumably send to a frontend to display! Although, as you can imagine, all the payment service or Spotify is doing is requesting data from their own database.

And just like routes, each controller lives in its own folder under `/controllers`, separated by purpose. Most of the time, you would separate folders based on how you separate your routes so they both have the same corresponding folders.

### Our database

But we glossed over `db` and how we communicate with our personal database. So what is `db`? Well, here we use MySQL as our database, and to write queries and receive data from our database, we need to connect to it and use some sort of method to send an SQL query over. Here we are using the mysql2 npm package, which allows us to connect to a MySQL database and send queries. The connection is represented as `db`, and it looks like this.

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

All `db` really is is a pool of connections to the database, and when you write SQL using `db`, it chooses a connection from our pool for you to send and receive information from your database. We use a connection pool for a few reasons first, so we’re not opening and closing connections constantly; second, so we can handle multiple requests concurrently; and third, so we can add limiters (10 here) to ensure our database never gets overloaded.

You also, of course, need to provide your connection information so mysql2 can locate the database and log in as a user. That happens to be sensitive information, so we put it inside of .env as well! Almost all APIs connect to a database in some way, and they all have some connection or config file like this.

## What else you might see

Backend is complex way more than what I can put here. There are so many layers to it, just like the frontend! But before I wrap this up, I wanted to show a few more commonly seen backend practices so you never get lost. This will especially help any looking in big production backend's.

### ORM's

Often times, production-level backends don’t usually use raw queries to communicate with their database. Instead, they use 'pre-built' queries these are called and used like any JS function but convert into SQL queries using the parameters and data you provide them. The controller function I showed would look like this using a common MySQL ORM, Sequelize.

```javascript
async function getShareInfo(req, res, next) {
  try {
    const userId = req.user.id;
    //New part ORM part!
    const sharedRecord = await dailyfitinfo.findOne({
      where: {
        userid: userId,
      },
    });
    //End
    if (!sharedRecord || sharedRecord.length === 0) {
      return res
        .status(404)
        .json({ message: "No record found for user", success: false });
    }

    res.status(200).json({ success: true, shared: sharedRecord.share });
  } catch (error) {
    next(error);
  }
}
```

Okay, so this looks simpler than before, but why even bother with an ORM at all? First, they are faster to code with, more compatible and more secure. What do I mean by compatibility and security? Well, many ORMs work with multiple databases, so switching to a different database won’t immediately break all of your backend.
Now, as for security and this is a big one. First, all your queries validate data automatically, so no accidentally inserting incorrect data. Along with this, ORMs have a few helpful side effects, like preventing SQL injection and handling table relationships in code, which leads us into ORM models!

One of the biggest parts of an ORM is models. Think of a model as a definition for each table in your database — it defines the table’s name, row names, primary keys, types, uniqueness, and more. Basically the same as what someone would do by writing raw queries, but using JavaScript, making it easier and faster to work with. One of the biggest things this helps with is type checking you can’t insert wrong types, and it generally enforces rules according to your models, so happy little accidents while coding end up highlighted! Here is a super simple and short example of a user model.

```javascript
import { DataTypes, Sequelize } from "sequelize";
import ConfigDb from "../config/configDb.js"; //Sequalize connection very similar to db in previous examples
//
// User model
//
const User = ConfigDb.define("User", {
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
```

Now remember, just like routes and controllers, models usually get their own folders, each representing a table in your database. You can structure this the same way you do your controllers and routes for example, all auth-related models being under `models/auth`, keeping things easily accessible between those portions of the backend.

### Data validation

Now, something else that can add complexity to a backend in code, files, and directories is data validation. We touched on this in ORMs by preventing the insertion of invalid data and checking syntax, but this goes much deeper.

First, a big concept in backend development is never trusting incoming data. Every request could include malicious or unexpected data, so we need to validate the data to prevent database errors or security issues. We do this by type-checking incoming data, so many backends use something like an npm package called Zod. This then leads to another folder called pipes (or names like validation, maybe schema), where you define your Zod schemas. A Zod schema is pretty much a model for incoming API request data. This ensures incoming data is exactly what you want it to be in type and length.

So, expect or implement some form of validation in a backend.

## Afterword

If you want to dive deeper then here are some usfull resources on area's I had glossed over a bit :)

-- [Beginear error handling in js](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
-- [Article on data validation](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
-- [Prizma ORM for postegres DB's](https://dev.to/sandrockjustin/the-prisma-orm-a-brief-overview-and-introduction-353m)

Andddd that’s pretty much it! Hopefully, you learned something here I spent lots of time on this, over 2700 words! Longest article I have ever written I even drew the thumbnail! If you want to see other stuff I have made, just look around, I guess, and have a good day!
