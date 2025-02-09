Новостной портал с загрузкой новостей с сервера и возможность аутентификации. Проект сделан с помощью React, Redux (+ Thunk), Router и axios.  
Использован airbnb-конфиг для ESlint и prettier. Верстка с помощью UI-фреймворка Bulma.

Тестовый аккаунт  
Имя пользователя: **max@test.com**  
Пароль: **12345**

Запуск `npm start`

## Описание

* Если пользователь вошел в аккаунт, ему доступна страница профиля (и соответствующая ссылка в меню).
* Если пользователь не вошел, при попытке перехода в профиль выполняется редирект на страницу входа. Когда пользователь выходит из аккаунта, тоже выполняется редирект на эту страницу.
* Есть досерверная и серверная валидация. При отсутствии пароля или имени пользователя, а также во время серверной проверки кнопка "Войти" блокируется.
* Новости подгружаются с сервера.
* Адаптивный дизайн с помощью Bulma.
