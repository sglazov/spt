#Шаблон проекта для быстрого старта

Шаблон помогает быстро начать вёрстку проекта.

Склонировать репозиторий и перейти в созданную папку проекта:

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

Сборка проекта в *.zip-архив. Архив появляется в корне проекта; CSS- и JS-файлы в архиве собираются в двух экземплярах: минифицированный и оригинальный без комментариев:

```bash
gulp zip --prod
```

##Шаблонизация

Шаблоны собираются в папке `app/templates/` с помощью тегов `<include>`. Составные части лежат в `blocks`. Переменные — через `@@var` (см. [gulp-html-tag-include](https://github.com/zaharin/gulp-html-tag-include)). Боевые файлы автоматически собираются в корне папки `dist/`.

##Стили

Верстаются в `app/styles/layout.sss` (_базовый стилевой файл_), компилируются в `dist/assets/styles/style.css`.

###PostCSS

Переменные ([postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)):

```css
$stp_Font: 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

Вложенность ([postcss-nested](https://github.com/postcss/postcss-nested)) для элементов в БЭМе, ссылки на свойства ([postcss-property-lookup](https://github.com/simonsmith/postcss-property-lookup)), миксины ([postcss-mixins](https://github.com/postcss/postcss-mixins)), ([postcss-extend](https://github.com/travco/postcss-extend)) для использования `@extend`:

```css
// Комментарии
...
.head
  color: white
.parent,
.synonym
  ...
  color: rgba(0,0,0,.95)
  width: 200px
  height: @width
  ...
  &__element
    all: initial
    top: center
    size: 50px
    ...
  &__mod
    @extend .first
```

#### PostCSS-плагины

1. [CSSNext](http://cssnext.io). Штуки из CSS 4, перменные, кастомные медиа-запросы;
1. [SugarSS](https://github.com/postcss/sugarss). Синтаксис Stylus со всеми штуками PostCSS;
1. [Container Queries Prolyfill](https://github.com/ausi/cq-prolyfill). Адаптивные контейнеры;
1. [DoIuse](https://github.com/anandthakker/doiuse). Сверяет используемые свойства с [caniuse.com](http://caniuse.com) и ругается в консоль;
1. [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker). Группирует медиазапросы и помещает их в конец CSS документа;
1. [PostCSS Short](https://github.com/jonathantneal/postcss-short). Логичные укороченные конструкции дял свойств;
1. [PostCSS Center](https://github.com/jedmao/postcss-center). Плагин для беззаботной центровки элементов;
1. [PostCSS SVG](https://github.com/Pavliko/postcss-svg). Работа с SVG в CSS;
1. [PostCSS ASSETS](https://github.com/assetsjs/postcss-assets). Магия для работы с ресурсами сайта;
1. [PostCSS Sprites](https://github.com/2createStudio/postcss-sprites). Генерация спрайтов;
1. [PostCSS Grid System](https://github.com/francoisromain/postcss-grid-system). Сетка;
1. [PostCSS Rucksack](https://github.com/simplaio/rucksack). Полезные CSS-[штуки](http://simplaio.github.io/rucksack/);
1. [PostCSS Initial](https://github.com/maximkoretskiy/postcss-initial). Сброс CSS-стилей элемента;

##Графика и файлы проекта

###Вектор

SVG-иконки собираются в папке `app/images/`, в CSS:

```css
background-image: svg('name.svg', '[fill]: #000000');
```

###Растр

PNG-иконки для спрайтов собираются в папке `app/images/sprites/`, в CSS:

```css
background: url('images/sprites/name.png') no-repeat 0 0;
```

Общий спрайт автоматически собирается в `dist/assets/images/sprites/`.

###Изображения

Графика размещается в `app/images`, собираются в `dist/assets/images`, в CSS:

```css
background: resolve('name.jpg')
width: width('name.png')
```

##Шрифты и файлы проекта

Шрифты и файлы размещаются в папках `app/fonts` и `app/resources`, копируются в `dist/assets/fonts/` и `dist/assets/resources/` соответственно.

##JS

Никаких `#id` для JS. Классы для JS начинаются с `_`, чтобы не мешать стили и логику в одну кучу.

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
│   ├── images/                # Картинки
│   │   ├── sprites/           # Папка PNG-иконок для генерации растрового спрайта
│   │   └── test/              # Папка для тестовых картинок
│   ├── resources/             # Статические файлы для копирования в dist/
│   │   ├── manifest.json      # ¯\_(ツ)_/¯
│   │   └── robots.txt         # Для роботов
│   └── fonts/                 # Шрифты
├── dist/                      # Сборка (автогенерация)
│   ├── assets/                # Подключаемые ресурсы
│   │   ├── fonts/             # Шрифты
│   │   ├── images/            # Изображения
│   │   │   └── sprites/       # Спрайты (автогенерация)
│   │   ├── scripts/           # Скрипты
│   │   └── styles/            # Стили
│   └── index.html             # Страница
├── .gitignore                 # Список исключённых файлов из Git
├── package.json               # Список модулей и прочей информации
├── gulpfile.js                # Конфигурация Gulp.js
└── readme.md                  # Документация шаблона
```
