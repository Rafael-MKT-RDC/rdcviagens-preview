FROM node:20-alpine AS base
WORKDIR /app
EXPOSE 80 3000

FROM node:20-alpine AS deps
WORKDIR /src
RUN npm install -g pnpm@10.4.1
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --prod --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /src
RUN npm install -g pnpm@10.4.1
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM base AS final
ENV NODE_ENV=production
COPY --from=deps /src/node_modules ./node_modules
COPY --from=build /src/dist ./dist
COPY --from=build /src/package.json ./
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
