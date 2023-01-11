# Инструкция по запуску проекта

## Установка переменных окружения

### сервис users

Создать файл /taskforce/environments/.users.env и прописать переменные окружения по примеру файла .users.env-example:

PORT - порт для запуска сервиса
MONGO_DB - название базы данных mongodb
MONGO_HOST - хост базы данных mongodb
MONGO_PORT - порт базы данных mongodb
MONGO_USER - логин пользователя mongodb
MONGO_PASSWORD - пароль пользователя mongodb
MONGO_AUTH_BASE - база данных пользователей mongodb
JWT_SECRET - секретный ключ для токена авторизации
RT_SECRET - секретный ключ для refresh токена
RABBIT_USER - пользователь rabbitmq
RABBIT_PASSWORD - пароль вроль пользователя rabbitmq
RABBIT_HOST - хост rabbitmq
RABBIT_PORT - порт rabbitmq
RABBIT_NOTIFY_SERVICE_QUEUE - название очереди сервиса уведомлений rabbitmq
FILES_UPLOAD_FOLDER - папка для загрузки файлов пользователя (аватары)

### сервис tasks

Создать файл /taskforce/environments/.tasks.env и прописать переменные окружения по примеру файла .tasks.env-example:

PORT - порт для запуска сервиса
RABBIT_USER - пользователь rabbitmq
RABBIT_PASSWORD - пароль вроль пользователя rabbitmq
RABBIT_HOST - хост rabbitmq
RABBIT_PORT - порт rabbitmq
RABBIT_NOTIFY_SERVICE_QUEUE - название очереди сервиса уведомлений rabbitmq
FILES_UPLOAD_FOLDER - папка для загрузки изображений задания
JWT_SECRET - секретный ключ для токена авторизации

Создать файл /taskforce/apps/tasks/prisma/.env и прописать переменные окружения по примеру файла .env-example:

DATABASE_URL - URL для соединения с postgres db

### сервис notify

Создать файл /taskforce/environments/.notify.env и прописать переменные окружения по примеру файла .notify.env-example:

PORT - порт для запуска сервиса
MAIL_PROTOCOL - протокол почтового сервиса
MAIL_HOST - хост почтового сервиса
MAIL_PORT - порт почтового сервиса
MAIL_FROM - отправитель писем от сервиса уведомлений
MONGO_DB - название базы данных mongodb
MONGO_HOST - хост базы данных mongodb
MONGO_PORT - порт базы данных mongodb
MONGO_USER - логин пользователя mongodb
MONGO_PASSWORD - пароль пользователя mongodb
MONGO_AUTH_BASE - база данных пользователей mongodb
RABBIT_USER - пользователь rabbitmq
RABBIT_PASSWORD - пароль вроль пользователя rabbitmq
RABBIT_HOST - хост rabbitmq
RABBIT_PORT - порт rabbitmq
RABBIT_NOTIFY_SERVICE_SUBSCRIBERS_QUEUE - название очереди rabbitmq для новых подписчиков (используется в сервисе users)
RABBIT_NOTIFY_SERVICE_TASKS_QUEUE - название очереди rabbitmq для новых заданий (используется в сервисе tasks)

### сервис BFF

Создать файл /taskforce/environments/.bff.env и прописать переменные окружения по примеру файла .bff.env-example:

PORT - порт для запуска сервиса
USERS_SERVICE_URL - адрес сервиса users
USERS_STATIC_URL - адрес для раздачи статики сервиса users
TASKS_SERVICE_URL - адрес сервиса tasks
TASKS_STATIC_URL - адрес для раздачи статики сервиса tasks
NOTIFY_SERVICE_URL - адрес сервиса notify

## Установка зависимостей

Перейти в папку /taskforce и выполнить команду npm i

## подготовка к работе prisma orm (сервис tasks)

- Перейти в папку /taskforce/app/tasks и выполнить команду nx run db-generate для генерации prisma клиента
- Выполнить команду nx run db-reset для создания структуры БД

## Запуск сервисов

Перейти в папку /taskforce и выполнить команды:

- nx run users:serve
- nx run tasks:serve
- nx run notify:serve
- nx run bff:serve
