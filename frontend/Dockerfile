FROM node:18
WORKDIR /app
RUN mkdir -p /app/photos
COPY . .
RUN npm cache clean --force
RUN npm i --force
CMD ["npm", "start"]
