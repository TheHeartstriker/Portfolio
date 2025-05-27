export const articleMappingFullStack1 = `
# Mapping a Full Stack Application
This article is going to go over system design its a high level overview going over what I think are the most important steps in the process of using a fullstack application. There is going to three sections, first is serving code
this will go over what happens when you visit a fullstack application, the second is logging in this is a smaller section but in most fullstack applications being logged is fundamental the third section is common opperations
this section is going to go over what happens when someone logs in and is using the application, where does jwt fit? Cookies? Cors?
## Serving the website
`;

export const articleMappingFullStack2 = `
### I. Initiation
As shown in the image the first step is simply typing the domain in. This is important to mention because we are going to be going over domain names and how they work.
### II. DNS Lookup
This is the second step and lead into how the internet works. And the internet is all about endpoint and IP addresses. You see google.com or www.kadenwildauer.com dont really exist, they are just human readable names that point to an IP address. The true name is 
just a random string of numbers that point towards the location of the server / endpoint. So lets go over how and what a DNS is. DNS is a bit complex in truth first in some cases they arent even used because you have already visited the site and your browser has cached the IP address. But in
the case that you have not visted in you browser's memory it will look through a DNS server to find the endpoint of your domain name. Every device or tech that connects to the internet has a IP address, and the DNS server is a database that maps domain names to IP addresses.
### III. TCP/TLS Handshake
First TCP stands for transmission control protocol using a metaphor of what this does its like a pipe that connects both the client and server otherwise we are just spraying water and hoping it gets to the other side. More directly it ensure all data packets are sent and received in the correct order. A 
connection is exists before data is sent. Veryify data integrity. Data flow making sure we dont send too much data at once. And thats what it does and why its used. How it setup is a three way handshake. You can research this more on your own but basically we request a connection,
the server says yes and then we say yes back. 

TLS is a wraper for TCP that adds encryption to the data being sent and received. And this is used everywhere a website with https:// uses TLS and is technically uses military grade encryption. Now this is rather simple to know why its used
but lets go over how it initiates which is arguably more important then understand TCP spefics because you might actually need to know specifics of how TLS works because you might need to implement it while TCP is more automated and you dont need to know the specifics.
First the client initiates a connection with a 'hello' message which includes the TLS version, cipher suites, and a random number. The server responds with its own 'hello' message which includes its chosen TLS version, cipher suites, random number and SSL certificate.
The client then verifies the server's certificate against a list or certificate authorities or more commonly the exact authority that issued the certificate. This is to insure the server is who it says it is.
Then the client sends a pre-master secret encrypted with the server's public key and can only be decrypted by the server's private key. And the client gets the server's public key from the SSL certificate. Then 
the server decrypts it with its private key and both client and server generate a session key using the pre-master secret and the random numbers exchanged earlier. The key should be the same on both sides.
They exchange a 'finished' message encrypted with the session key to confirm the handshake is complete. And now both client and server can communicate securely using the session key.

SSL certificates are an important thing I want to add to a bit more. First SSL is the old name for TLS technically its a TLS certificate and you can just think of its as a base64 encoded file that contains things like the public key, the domain name, the certificate authority that issued it, and the expiration date. 
Its not some special or magical things, just some key value pairs that the client uses to verify information and acuire information.


### IV. HTTP Request
The HTTP request is the next step and probably one of the most basic steps in the process. We are just sending a request to get the compiled frontend code for the website. This step is practically the same as any other HTTP request you would make to a server. And also in most cases automated by the browser.


### V. HTTP handling
Now here there is a wide variety of how a response is recived and sent back. In many cases you do nothing and some other services handles the response for you for example Nginx, Apache, Caddy or serve. So most all the times this is something automated but necessary to understand.

### VI. Response
This response is the final step in most cases. We send back the compiled frontend code and the browser renders it. This is the end of getting a website on you screen.

## Logging in
This is meant to be a short section that important for understanding how a fullstack application works and thats logging in. And how it ties into the last section which is mapping common operations. We need to know where the data is stored in this stateless application.

`;

export const articleMappingFullStack3 = `
### I. User submits login form
This is rather simple and self explanatory the user is sending login or signup information to the server.
### II. Server validates credentials and small jwt explanation
The server checks the credentials against a database checking if it exists, if the information is correct ecetra. And wraps the information with a JWT. I will go over why we dont store the JWT or information on the backend or database later in the article. But the JWT while having nuances
is a kind of wraper for information it hold 3 important pieces of information. The first is the header which is the algorithm used to sign the token, the second is the data or information we are wrapping, and the third and most important is the signature which is
a combination of the header and payload that is signed with the secret key. The idea is Header algo + Payload + Secret key = Signiture is calculated when we sign aka create the JWT. And when the data gets back we run the same calculation and compare it to the signature in the JWT.
Someone tampering with the data does not have the secret key so they cant create a valid signature. And this is how we verify the JWT and its data.
### III. Storing JWT in cookies and cookies explanation
First the JWT is sent back with the important information and in this case stored / sent in a cookie. Cookies are is very similar to local storage but with the key differences. That is automatically sent with every request
which promots security and statelessness. The second is size limitations its vastally smaller then local storage and has a limit of 4kb per cookie and most website have a max cookie limit. The third and most important is flags that can be set on a cookie like HttpOnly, Secure, SameSite, Domain and time.
These all have meaning and resonings but here I am going to talk about time. The rest is a little bit of research you can do on your own. Time is like a jwt a cookie has a storage expiration time. Depending on the time and type of application this can be a few minutes to a few months.
## Mapping common operations
This section is all about mapping common operations in a fullstack application. The diagram below will be explained in numerical order and will be a walkthrough over each step and important pieces of information.

`;
