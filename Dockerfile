# base image
FROM node:8.16.0

# build environment
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm install
EXPOSE 3000
CMD npm run start
