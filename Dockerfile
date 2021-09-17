FROM node:15
WORKDIR /app
COPY package.json .

# spaces are necessary, $NODE_ENV is a argument that we have to pass 
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \ 
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]
