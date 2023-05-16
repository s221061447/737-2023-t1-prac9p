# ReadMe

This is a node application that uses express.js to provide a basic web server that does simple arithematic operations. Logging is done using the winston library and the application is secured using Passport.

***

There are two logins available. One for admin and one for user.
One sample admin and user has already been added.

Admins can login using this endpoint:
```
/auth/adminLogin
```
Users can login using this endpoint:
```
/auth/userLogin
```

For both the logins, the request type is POST, and the body should contain the fields:
1. email
2. apiKey
*** 

The admin credentials are:
```
username: "pauljose@live.com",
apiKey: "secret"
```

The user credentials are:
```
username: "alice@live.com",
apiKey: "833b33fca986eebfc320b23f10eaa1de04c36879"
```
***
To add a user, login as the admin, using the credentials provided. The application will return a JWT token, which can be used as a Bearer token for additional requests. You can then add a user, using the following POST endpoint: 
```
/users/addUser?email=newUser@gmail.com
```
This will return a randomly generated API key to be given to the user. The user can then use this API key to login using the added username and given API key.

Admins can also fetch all users using this GET endpoint:
```
/users/getUsers
```
***
Users once authenticated can then access the calculator APIs using the JWT token they recieved during login.

The available endpoints are (All are GET requests):
```
1. /calculate/addtwonumbers?n1=x&n2=y
2. /calculate/subtracttwonumbers?n1=x&n2=y
3. /calculate/multiplytwonumbers?n1=x&n2=y
4. /calculate/dividetwonumbers?n1=x&n2=y
```
***
The server runs on port 3030 and can be run by using the command "npm run start".

To run using kubernetes simply run the following command:
```bash
kubectl apply -f ./kube/
```