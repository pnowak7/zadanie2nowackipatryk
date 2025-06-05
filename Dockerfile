#etap 1: builder
FROM node:18-alpine AS builder
WORKDIR /app

#wykorzystywanie cache i instalacja zaleznosci
COPY package.json package-lock.json ./
RUN npm install --production

#kopiowanie calego kodu zroflowego
COPY . .

#etap 2: final
FROM node:18-alpine
WORKDIR /app

LABEL author="Twoje Imię i Nazwisko"

#przeniesienie katalogu z zaleznosciami i kodem i odsloniecie portu
COPY --from=builder /app /app

EXPOSE 3000

#healthcheck co 30s: zapytanie HTTP
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "app.js"]
