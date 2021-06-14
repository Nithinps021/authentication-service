# redCarpetUp
### How to run ?
Pull the docker image from docker hub
```
docker pull nithinps021/redcarpetup
```
To run the test cases copy paste the below code
```
docker run --name mytest -e type=test -it nithinps021/redcarpetup
```
To run the server copy paste the below code
```
docker run --name myserver -p 8080:8080 -e type=start -it nithinps021/redcarpetup
```
## Explanation
### Auth
Login route was implemented using passportjs and sessional storage. During each login the details of the user are encrypted and stored in the http cookies. When ever a next request is sent from this authenticated user the `http-cookie` stored in the request object are decrypted and details of the usera are stored in `request` object. Storing in http cookies is more secured as comapred to local storage or session storage in browser and it is more confortable while using REST API.

### Features
* The details of every user are stored in the DB along with role. I have created a `GET /getallusers` and `PUT /getallusers/:id` router which will give all details of users present in the DB. For every request to this end point has to pass through a middleware which check the role of the user. If the role of the user is `ADMIN` or `AGENT` the middleware pass the request. IF a normal user is trys to access this route the middleware will block the request and sent a `403 error`.
* A user can put a request for loan and these loan request are view by the agent. The agent will create a loan application form the request and submit it to Admin for further process. Here I used `POST /agent/appliedLoans` to submit the loan application. I have used a middleware to check the role of the user accesing the route. Only user with agent role are allowed to access the route.
*  The Admin can verify the application and can reject or approve the loan. I have used `POST admin/:id` route, which takes data params `isLoanApproved` and `:id` of the application. If the value of `isLoanApproved` is `false` the loan will be rejected otherwise if the value is true loan will be approved. The status of the loan application is updated and stored in the DB. This route is made secure and it can only be accessed by users having ADMIN role.
*  When ever a agent trys to modify the loan application a condition is check, whether the current status of the application is APPROVED, if the status is approved it will block the modification and a `403 error` is sent. 
