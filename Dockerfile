FROM node:14-alpine as ts-compiler

WORKDIR /usr/app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
RUN yarn install
COPY . ./
RUN yarn build

FROM node:14-alpine as ts-remover

WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/yarn.lock ./
COPY --from=ts-compiler /usr/app/dist ./dist
COPY --from=ts-compiler /usr/app/src/fonts ./dist/fonts
# Install dependencies
RUN yarn install --production

FROM node:14-alpine

# Set the working directory to usr/app
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./

# Expose the port that the app will listen on
EXPOSE 3000
# Set nodejs port to 3000
ENV PORT 3000

CMD ["node", "dist/index.js"]
