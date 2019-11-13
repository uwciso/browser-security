# Modern Browser Security

This simple Node/Express.js app provides an easy way to interactively learn about browser security features. 

In addition to [Express.js](https://expressjs.com/), it uses [Helmet.js](https://helmetjs.github.io/) middleware to provide a simple means of modifying server response headers and other HTTP server configurations.

## Installation & Usage

### Docker, using Docker Hub (easiest)

1. Install [Docker](https://www.docker.com/)

2. Run the public Docker Hub container, passing through Filebrowser credentials as environment variables (the values of which you can modify to suit your preference)  
`docker run -e "FILE_BROWSER_USER=student" -e "FILE_BROWSER_PASSWORD=pwd" -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 uwciso/browser-security:1.0`

3. Browse to the exercises at [http://localhost:4000](http://localhost:4000) and the File Browser at [http://localhost:4001](http://localhost:4001)

### Docker, from locally built container

1. Install [Docker](https://www.docker.com/)

2. `git clone https://github.com/uwciso/browser-security.git`

3. `cd browser-security`

4. Build the container. Replace `<TAG>` with your tag name or version #  
   `docker build --tag=browser-security:<TAG> . `

5. Run the container, passing through Filebrowser credentials as environment variables (the values of which you can modify to suit your preference), and using your selected `<TAG>` from previous step  
`docker run -e "FILE_BROWSER_USER=student" -e "FILE_BROWSER_PASSWORD=pwd" -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:<TAG>`

6. Browse to the exercises at [http://localhost:4000](http://localhost:4000) and the File Browser at [http://localhost:4001](http://localhost:4001)

### Docker, from locally built container with externalized File Browser credentials

1. Install [Docker](https://www.docker.com/)

2. `git clone https://github.com/uwciso/browser-security.git`

3. `cd browser-security`

4. Create a Docker volume (file system)  
   `docker volume create browser-sec-vol`

5. Build the container. Replace `<TAG>` with your tag name or version #  
   `docker build --tag=browser-security:<TAG> . `

6. Run the container with the volume mounted  
   `docker run --mount source=browser-sec-vol,destination=/dockervol -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:<TAG>`

7. Run a shell on the container (assuming this is the only docker container running presently)  
   `docker exec -it $(docker ps -q) /bin/bash`

8. Create a new file called /dockervol/settings e.g. with vim  
   `vi /dockervol/settings`

9. Add the following content to the `settings` file, replacing the values with your desired username and password for accessing the file browser tool  
   `FILE_BROWSER_USER="username"  
    FILE_BROWSER_PASSWORD="password"`

10. Save the file and exit vim

11. Unmount the docker volume  
   `exit`

12. Shut down the container  
   `docker container kill [container id]`

13. Re-run the container, this time mounting the volume as read-only  
   `docker run --mount source=browser-sec-vol,destination=/dockervol,readonly -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:<TAG>`

14. Browse to the exercises at [http://localhost:4000](http://localhost:4000) and the File Browser at [http://localhost:4001](http://localhost:4001)

### Local (no Docker)

Make sure you have [Node](https://nodejs.org/en/) installed (and npm, which automatically installs with Node).

1. `git clone https://github.com/uwciso/browser-security.git`

2. `cd browser-security`

3. `npm install` 

4. `npm run start` 

5. Point your browser to [localhost:3100](http://localhost:3100) 

6. To do the exercises, you'll need to open up the app.js and public/assets.html files in your text editor of choice.

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
  `docker kill $(docker ps -q); docker rm $(docker ps -q -a); docker build --tag=browser-security:new .; docker run -e "FILE_BROWSER_USER=student" -e "FILE_BROWSER_PASSWORD=pwd" -d -p 127.0.0.1:4000:3100 -p 127.0.0.1:4001:8080 browser-security:new`

## Resources
* [CSP with Helmet.js](https://helmetjs.github.io/docs/csp/)
* [Setting response cookies with Express](https://expressjs.com/en/4x/api.html#res.cookie)
