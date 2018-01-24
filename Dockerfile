FROM node:6.11.0
RUN npm install -g serve
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build
CMD serve -s build -p 3000
EXPOSE 3000
