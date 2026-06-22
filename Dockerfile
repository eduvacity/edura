# ---------------------------------------------------------
# Base image
# ---------------------------------------------------------
FROM node:20.19-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1


# ---------------------------------------------------------
# Dependencies stage
# ---------------------------------------------------------
FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci


# ---------------------------------------------------------
# Build stage
# ---------------------------------------------------------
FROM base AS builder

WORKDIR /app

ARG STRIPE_PUBLIC_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_CLOUDINARY_API_KEY

ENV STRIPE_PUBLIC_KEY=${STRIPE_PUBLIC_KEY}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
ENV NEXT_PUBLIC_CLOUDINARY_API_KEY=${NEXT_PUBLIC_CLOUDINARY_API_KEY}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# ---------------------------------------------------------
# Production runner stage
# ---------------------------------------------------------
FROM node:20.19-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

CMD ["node", "server.js"]