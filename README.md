#Шаблон проекта для быстрого старта

Шаблон помогает быстро начать вёрстку проекта.

Склонировать репозиторий и перейти в созданную папку проекта

```bash
git clone git@bitbucket.org:chenki/spt.git new-project && cd new-project
```

Перед первым запуском (_один раз на проект_):

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

Сборка проекта в *.zip-архив (_архив кладётся в корень_):

```bash
gulp zip
```

##Шаблонизация

Шаблоны собираются в папке `templates` с помощью тегов `<include>`. Составные части лежат в `blocks`. Переменные — через `@@var` (см. [gulp-html-tag-include](https://github.com/zaharin/gulp-html-tag-include)). Боевые файлы автоматически собираются в корне папки dist/.

##Стили

Верстаются в `app/styles/layout.sss` (_базовый стилевой файл_), компилируются в `dist/assets/styles/style.css`.

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
5. [PostCSS Normalize](https://github.com/seaneking/postcss-normalize). Правила [normalize.css](https://github.com/necolas/normalize.css) перед всеми своийствами в CSS;
6. [PostCSS Property-lookup](https://github.com/simonsmith/postcss-property-lookup). Ссылка на другие свойства;
7. [PostCSS Center](https://github.com/jedmao/postcss-center). Плагин для беззаботной центровки элементов;
8. [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker). Группирует медиазапросы и помещает их в конец CSS документа;
9. [PostCSS SVG](https://github.com/Pavliko/postcss-svg). Работа с SVG в CSS;
10. [PostCSS RGBa-fallback](https://github.com/postcss/postcss-color-rgba-fallback). Поддержка RGBa для IE8;
11. [PostCSS ASSETS](https://github.com/assetsjs/postcss-assets). Магия для работы с ресурсами сайта;
12. [DoIuse](https://github.com/anandthakker/doiuse). Сверяет используемые свойства с сервисом [caniuse.com](http://caniuse.com);
13. [PostCSS Grid System](https://github.com/francoisromain/postcss-grid-system). Сетка;
14. [PostCSS Responsive Type](https://github.com/seaneking/postcss-responsive-type). Адаптивная типографика.
- - - -

## Структура папок и файлов

```
├── app/                       # Исходники
│   ├── templates/             # Шаблоны
│   │   ├── blocks/            # Блоки
│   │   │   ├── _head.html     # Разметка тега <head>
│   │   │   ├── _header.html   # Разметка шапки
│   │   │   ├── _start.html    # Вводная лекция
│   │   │   └── _footer.html   # Разметка подвала
│   │   └── index.html         # Разметка страницы
│   ├── scripts/               # Скрипты
│   │   └── app.js             # Главный скрипт
│   ├── styles/                # Стили
│   │   ├── default.sss        # Стили по умолчанию
│   │   ├── variables.sss      # CSS-Переменные
│   │   ├── fonts.sss          # Подключение шрифтов
│   │   ├── typo.sss           # Типографика
│   │   └── layout.sss         # Главный стилевой файл
│   ├── fonts/                 # Шрифты
│   ├── images/                # Картинки
│   └── resources/             # Статические файлы для копирования в dist
│       └── manifest.json      # ¯\_(ツ)_/¯
├── dist/                      # Сборка (автогенерация)
│   ├── assets/                # Подключаемые ресурсы
│   │   ├── fonts/             # Шрифты
│   │   ├── images/            # Изображения
│   │   ├── scripts/           # Скрипты
│   │   └── styles/            # Стили
│   └── index.html             # Страница
├── .gitignore                 # Список исключённых файлов из Git
├── package.json               # Список модулей и прочей информации
├── gulpfile.js                # Конфигурация Gulp.js
└── readme.md                  # Документация шаблона
```
