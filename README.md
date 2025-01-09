# URL-shortener

# Сервис сокращения URL

Это простой сервис для сокращения URL, разработанный с использованием Node.js, Express, MongoDB и минимального фронтенда для тестирования.

## Возможности

- Создание коротких URL на основе длинных URL
- Переадресация на оригинальный URL при переходе по короткой ссылке
- Удаление коротких URL
- Получение информации о ссылке
- Просмотр аналитики по ссылкам (количество кликов и последние IP)

## Используемые технологии

- Node.js
- Express
- MongoDB (с использованием Mongoose)
- Nanoid (для генерации коротких URL)
- Docker (для контейнеризации сервиса)
- HTML, CSS, JavaScript (для фронтенд-тестирования)

## Начало работы

Эти инструкции помогут вам запустить проект на локальной машине для разработки и тестирования.

### Предварительные требования

- [Node.js](https://nodejs.org/) (версии 16+)
- [Docker](https://www.docker.com/) (для контейнеризации)
- [MongoDB](https://www.mongodb.com/) (локально или через облако)

### Установка

1. Клонируйте репозиторий:
    ```bash
    https://github.com/lutsenkosasha/URL-shortener.git
    cd URL-shortener
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

3. Запустите MongoDB (либо локально, либо через Docker):
    - Локально:
      ```bash
      mongod --dbpath /your/db/path
      ```
    - Либо через Docker:
      ```bash
      docker-compose up
      ```

4. Запустите сервер:
    ```bash
    npm start
    ```

5. Откройте в браузере `http://localhost:3000` для тестирования.

### Использование через Docker

1. Постройте Docker-образы и запустите контейнеры:
    ```bash
    docker-compose up --build
    ```

2. Откройте `http://localhost:3000` для использования.

## Тестирование API

Для тестирования API можно использовать [Postman](https://www.postman.com/).

Примеры запросов:

### 1. **Создание короткой ссылки (POST)**

- **По умолчанию (без алиаса):**
    ```bash
    POST http://localhost:3000/shorten
    Body (JSON): {
      "originalUrl": "https://example.com"
    }
    ```
    В ответе вы получите автоматически сгенерированный `shortUrl`.

- **С использованием алиаса:**
    ```bash
    POST http://localhost:3000/shorten
    Body (JSON): {
      "originalUrl": "https://example.com",
      "alias": "myAlias"
    }
    ```
    Если алиас уже существует, вернется ошибка.

### 2. **Переадресация по короткой ссылке (GET):**
    ```bash
    GET http://localhost:3000/{shortUrl}
    ```

### 3. **Удаление короткой ссылки (DELETE):**
    ```bash
    DELETE http://localhost:3000/delete/{shortUrl}
    ```

### 4. **Получение информации о ссылке (GET):**
    ```bash
    GET http://localhost:3000/info/{shortUrl}
    ```

### 5. **Получение аналитики (GET):**
    GET http://localhost:3000/analytics/{shortUrl}
    
