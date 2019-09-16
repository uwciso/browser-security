FROM node:10 as installer
WORKDIR /browser-security
COPY . /browser-security
RUN npm install

FROM node:10
ARG BUILD_DATE
WORKDIR /browser-security
COPY --from=installer /browser-security .
EXPOSE 3100
CMD ["npm", "run", "start"]
