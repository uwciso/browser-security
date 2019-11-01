FROM node:10-jessie-slim
ARG BUILD_DATE
WORKDIR /browser-security
COPY . /browser-security
RUN npm install
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y net-tools vim less
RUN /bin/bash -c 'curl -fsSL https://filebrowser.xyz/get.sh | /bin/bash'
EXPOSE 3100 8080
CMD ["/bin/bash", "/browser-security/start.sh"]
