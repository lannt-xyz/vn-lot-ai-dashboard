FROM node:23-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time args
ARG NEXT_PUBLIC_API_BASE_URL

# Set environment variables so Next.js can access them
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN npm run build

# Production image with static files
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static export files
COPY --from=builder --chown=nextjs:nodejs /app/out ./out

USER nextjs

# Expose port for potential nginx serving inside container (optional)
EXPOSE 80

# Default command to keep container running for copying files
CMD ["sh", "-c", "echo 'Static files are in /app/out. Use docker cp to copy them out.' && sleep infinity"]
