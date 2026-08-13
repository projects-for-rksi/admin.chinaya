// Базовый адрес API.
//
// Переопределяется переменной окружения VUE_APP_API_URL (её задаёт
// docker-compose для локального стенда), по умолчанию — боевой домен,
// чтобы прод-сборка работала без дополнительной настройки.
export const API_URL =
  process.env.VUE_APP_API_URL || "https://api.xn----7sba9au1d3c.xn--p1ai";
