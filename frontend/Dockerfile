# Используем базовый образ для Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Запускаем Vite-сервер
CMD ["npm", "run", "dev"]

# Указываем порт
EXPOSE 5173