FROM node:24-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@latest-10
COPY package*.json pnpm*.yaml ./
RUN pnpm install

ENV CI=true
COPY . .
RUN pnpm build && pnpm prune --production

FROM gcr.io/distroless/nodejs24-debian13
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER nonroot
ENV NODE_ENV=production
CMD ["dist/index.js"]