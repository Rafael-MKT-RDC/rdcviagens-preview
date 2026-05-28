FROM node:20-alpine
WORKDIR /app
EXPOSE 80

RUN npm install -g pnpm@10.4.1

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

RUN pnpm prune --prod

ENV NODE_ENV=production
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
