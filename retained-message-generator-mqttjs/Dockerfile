FROM node:20.10-alpine
COPY . /app
WORKDIR /app
RUN npm install --omit=dev
CMD ["node", "src/index.js"]
