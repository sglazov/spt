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
$stp_Font: 'Helvetica Neue', Helvetica, Arial, sans-serif;
```
Вложенность ([postcss-nested](https://github.com/postcss/postcss-nested)) для элементов в БЭМе:

```css
// Inline comments
.parent >
.child
  color: black
  ...
  &__element
    ...
```

1. [CSSNext](http://cssnext.io). Штуки из CSS 4, префиксы, кастомные медиа-запросы;
2. [SugarSS](https://github.com/postcss/sugarss). Синтаксис Stylus со всеми штуками PostCSS;
3. [PostCSS Clearfix](https://github.com/seaneking/postcss-clearfix). Добавляет Clearfix аттрибуты для очистки плавающих элементов;
4. [PostCSS Size](https://github.com/postcss/postcss-size). Добавляет CSS свойство size для обозначения ширины и высоты элемента;
5. [PostCSS Normalize](https://github.com/seaneking/postcss-normalize). [normalize.css](https://github.com/necolas/normalize.css) перед всеми своийствами в CSS;
6. [PostCSS Property-lookup](https://github.com/simonsmith/postcss-property-lookup). Ссылка на другие свойства.

- - - -

## Структура папок и файлов

```
├── templates/                     # Шаблоны вёрстки
│   └── blocks/                    # Блоки
│       ├── _head.html             # Разметка тега <head>
│       ├── _header.html           # Разметка шапки
│       ├── _start.html            # Вводная лекция
│       └── _footer.html           # Разметка подвала
├── assets/                        # Подключаемые ресурсы
│   ├── source/                    # Исходники
│   │   ├── scripts/               # Исходники скриптов
│   │   └── styles/                # Исходники стилей
│   │       ├── default.sss        # Стили по умолчанию
│   │       ├── variables.sss      # Переменные
│   │       ├── fonts.sss          # Подключение шрифтов
│   │       ├── typo.sss           # Типографика
│   │       └── layout.sss         # Базовый стилевой файл
│   ├── fonts/                     # Шрифты
│   ├── images/                    # Изображения
│   ├── js/                        # Скрипты
│   └── css/                       # Стили
├── index.html                     # Разметка страницы
├── progress.html                  # Прогресс разработки
├── package.json                   # Список модулей и прочей информации
├── gulpfile.js                    # Конфигурация Gulp.js
├── manifest.json                  # СервисВоркеры (¯\_(ツ)_/¯)
├── .readme.md                     # Документация шаблона
└── .gitignore                     # Список исключённых файлов из Git
```
