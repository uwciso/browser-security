# Modern Browser Security

This simple Node/Express.js app provides an easy way to interactively learn about browser security features. 

In addition to [Express.js](https://expressjs.com/), it uses [Helmet.js](https://helmetjs.github.io/) middleware to provide a simple means of modifying server response headers and other HTTP server configurations.

## Installation - Local

Make sure you have [Node](https://nodejs.org/en/) installed (and npm, which automatically installs with Node).

1. `git clone https://github.com/uwciso/browser-security.git`

2. `cd browser-security`

3. `npm install` 

## Usage - Local
1. `npm run start` 

2. Point your browser to [localhost:3100](http://localhost:3100) 

3. To do the exercises, you'll need to open up the app.js (and, eventually, assets.html) files in your text editor of choice.

## Installation - Docker

Make sure you have [Docker](https://www.docker.com/) installed.

1. `git clone https://github.com/uwciso/browser-security.git`

2. `cd browser-security`

3. Build the container. Replace `<TAG>` with your tag name or #  
   `docker build --tag=browser-security:<TAG> . `

4. Run the container, passing through Filebrowser credentials as environment variables, and using your selected <TAG> from previous step 
   `docker run -e "FILE_BROWSER_USER=student" -e "FILE_BROWSER_PASSWORD=pwd" -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:<TAG>`

## Installation - Docker, with externalized Filebrowser credentials

Make sure you have [Docker](https://www.docker.com/) installed.  Note that this is somewhat complicated in order to 
externalise the filebrowser credentials from this project

1. `git clone https://github.com/uwciso/browser-security.git`

2. `cd browser-security`

3. Create a Docker volume (file system)  
   `docker volume create browser-sec-vol`

4. Build the container. Replace `<TAG>` with your tag name or #  
   `docker build --tag=browser-security:<TAG> . `

5. Run the container with the volume mounted  
   `docker run --mount source=browser-sec-vol,destination=/dockervol -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:<TAG>`

6. Run a shell on the container (assuming this is the only docker container running presently)  
   `docker exec -it $(docker ps -q) /bin/bash`

7. Create a new file called /dockervol/settings e.g. with vim  
   `vi /dockervol/settings`

8. Add the following content to the `settings` file, replacing the values with your desired username and password for accessing the file browser tool  
   `FILE_BROWSER_USER="username"  
    FILE_BROWSER_PASSWORD="password"`

9. Save the file and exit vim

10. Unmount the docker volume  
   `exit`

11. Shut down the container  
   `docker container kill [container id]`

11. Re-run the container, this time mounting the volume as read-only  
   `docker run --mount source=browser-sec-vol,destination=/dockervol,readonly -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:<TAG>`

## Usage - Docker
1. After running the container (see above), browse to the exercises at [http://localhost:4000](http://localhost:4000) and the filebrowser at [http://localhost:4001](http://localhost:4001) 

## Useful Docker commands
* List Docker containers  
  `docker container ls`  
   or  
   `docker ps`

* Stop an active container  
   `docker container kill [container ID]`

* Remove a container  
  `docker container rm [container ID]`

* Stop and remove all containers  
  `docker kill $(docker ps -q); docker rm $(docker ps -q -a)`

* With an existing volume, kill and remove all containers, and then rebuild a new one (here tagged as "new", and with File Browser creds pass through as env variables)  
  `docker kill $(docker ps -q); docker rm $(docker ps -q -a);   docker build --tag=browser-security:new .; docker run -e "FILE_BROWSER_USER=student" -e "FILE_BROWSER_PASSWORD=pwd" -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:new`

## Resources
* [CSP with Helmet.js](https://helmetjs.github.io/docs/csp/)
* [Setting response cookies with Express](https://expressjs.com/en/4x/api.html#res.cookie)
