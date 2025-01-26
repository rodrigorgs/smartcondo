############################################################
# Stage 1: build Angular app

FROM node:18 AS angular-build

RUN npm install -g @angular/cli

# Install dependencies
WORKDIR /usr/src/app
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the app
COPY ./frontend .
RUN npm run build

############################################################
# Stage 2: build NestJS app

FROM node:18 AS nest-build
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build


############################################################
# Stage 3: run

FROM node:18 AS runner
WORKDIR /app

COPY --from=nest-build /app/package.json .
COPY --from=nest-build /app/yarn.lock .
COPY --from=nest-build /app/node_modules ./node_modules
COPY --from=nest-build /app/dist ./dist
COPY --from=angular-build /usr/src/dist/frontend ./dist/frontend

EXPOSE 3000
CMD ["yarn", "run", "start:prod"]
