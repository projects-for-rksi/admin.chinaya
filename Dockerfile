# vue-cli-service 4 (webpack 4) не собирается на современных Node из-за OpenSSL 3.
FROM node:14-alpine

WORKDIR /app

EXPOSE 8080

# Проверяем бинарник, а не каталог: node_modules существует всегда — это том.
CMD ["sh", "-c", "[ -x node_modules/.bin/vue-cli-service ] || npm install; npm run serve -- --host 0.0.0.0 --port 8080"]
