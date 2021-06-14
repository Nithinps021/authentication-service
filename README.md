# redCarpetUp
### How to run ?
Pull the docker image from docker hub
```
docker pull nithinps021/redcarpetup
```
To run the test cases copy paste the below code
```
docker run --name myserver -e type=start -it nithinps021/redcarpetup
```
To run the server copy paste the below code
```
docker run --name myserver -p 8080:8080 -e type=start -it nithinps021/redcarpetup
```
## Explanation
### Auth
Login route was implemented using passportjs and sessional storage. During the each login the details of the user are encrypted and stored in the http cookies. Storing in http cookies is more secured as comapred to local storage or session and it is more confortable than OAuth token.

