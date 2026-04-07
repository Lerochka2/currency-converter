FROM node:20-alpine

# Установка системных зависимостей для Playwright (chromium, firefox, webkit)
RUN apk add --no-cache \
    chromium \
    firefox \
    webkit \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Установка браузеров Playwright
RUN npx playwright install

# Установка wait-on глобально (для ожидания сервера)
RUN npm install -g wait-on

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]