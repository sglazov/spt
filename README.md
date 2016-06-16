#Шаблон проекта для быстрого старта
Шаблон помогает быстро начать вёрстку проекта.

Перед первым запуском:
```bash
sudo npm install
```

##Режимы
Одноразовая сборка:
```bash
gulp
```

Запуск живой сборки на локальном сервере:
```bash
gulp live
```

Живая сборка на локальном сервере и туннель в интернет:
```bash
gulp external-world
```

##Шаблонизация
Шаблоны собираются в папке `templates` с помощью тегов `<include>`. Составные части лежат в `blocks`. Переменные — через `@@var` (см. [gulp-html-tag-include](https://github.com/straykov/gulp-html-tag-include)). Боевые файлы автоматически собираются в корне проекта.

##Стили
Верстаются в `assets/source/styles/layout.sss`, компилируются в `assets/css/style.css`.

####PostCSS
Переменные ([postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)):
```css
$f_Helvetica: "Helvetica Neue", Arial, sans-serif;
```
Вложенность ([postcss-nested](https://github.com/postcss/postcss-nested)) для элементов в БЭМе:
```css
.block {
  ...

  &__element {
    ...
  }
}
```
[CSSNext](http://cssnext.io). Штуки из CSS 4, префиксы, кастомные медиа-запросы.

- - - -

## Структура папок и файлов

```
├── templates/                 # Шаблоны вёрстки
│   ├── includes/              # Подключаемые блоки
│   │   └── _header.html       # Разметка тега <head>
│   └── blocks/                # Блоки
│       ├── _header.html       # Разметка шапки
│       └── _footer.html       # Разметка подвала
├── assets/                        # Подключаемые ресурсы
│   ├── source/                    # Исходники
│   │   ├── scripts/               # Исходники скриптов
│   │   └── styles/                # Исходники стилей
│   │       ├── helpers/           # Помощники
│   │       └── _variables.css     # Переменные
│   ├── fonts/                     # Шрифты
│   ├── images/                    # Изображения
│   ├── js/                        # Скрипты
│   └── css/                       # Стили
├── index.html                     # Разметка страницы
├── progress.html                  # Прогресс разработки
├── package.json                   # Список модулей и прочей информации
├── gulpfile.js                    # Конфигурация Gulp.js
├── .readme.md                     # Документация шаблона
└── .gitignore                     # Список исключённых файлов из Git
```