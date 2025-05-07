# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY apps/main-app/package.json ./apps/main-app/
COPY apps/studio/package.json ./apps/studio/
COPY features/wtt/react-feature-wtt/package.json ./features/wtt/react-feature-wtt/
COPY features/wtt/sanity-schema-wtt/package.json ./features/wtt/sanity-schema-wtt/

RUN pnpm install -r

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app .
COPY . .

# Build the features first
RUN cd ./features/wtt/react-feature-wtt
RUN pnpm install

# # Then build the main app
RUN cd ./apps/main-app
RUN pnpm install
RUN pnpm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app

COPY --from=builder /app/apps/main-app/next.config.ts .
COPY --from=builder /app/apps/main-app/package.json .

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/apps/main-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/main-app/.next/static ./apps/main-app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/main-app/public ./apps/main-app/public

USER nextjs

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/main-app/server.js"]