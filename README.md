#Шаблон проекта для быстрого старта

Шаблон помогает быстро начать вёрстку проекта.

Склонировать репозиторий, перейти в созданную папку проекта и удалить скрытую папку _.git_:

```bash
git clone git@bitbucket.org:chenki/spt.git new-project && cd new-project && rm -rf ./.git
```

Перед первым запуском нужно установить зависимости (_один раз на проект_):

```bash
sudo npm install
```

##Режимы

Одноразовая сборка:

```bash
npm run one
```

Запуск живой сборки на локальном сервере:

```bash
npm start
```

Сборка проекта в *.zip-архив. Архив создаётся в корне проекта; CSS- и JS-файлы в архиве собираются в двух экземплярах: минифицированный и оригинальный без комментариев:

```bash
npm run zip
```

##Шаблонизация

Шаблоны собираются в папке `app/templates/` с помощью тегов `<include>`. Составные части лежат в `blocks/`. [Переменные](https://github.com/zaharin/gulp-html-tag-include) — через `@@var`. Боевые файлы автоматически собираются в корне папки `dist/`.

##Стили

Верстаются в `app/styles/layout.sss` (_базовый стилевой файл_), компилируются в `dist/assets/styles/style.css`.

###PostCSS

Переменные ([postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)):

```css
$stp_Font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
```

Вложенность ([postcss-nested](https://github.com/postcss/postcss-nested) и [postcss-nested-ancestors](https://github.com/toomuchdesign/postcss-nested-ancestors)) для элементов и модификаторов в [БЭМ](https://ru.bem.info/methodology/css/)-методолгии; ссылки на свойства ([postcss-property-lookup](https://github.com/simonsmith/postcss-property-lookup)); миксины ([postcss-mixins](https://github.com/postcss/postcss-mixins)); `@extend` с помощью ([postcss-extend](https://github.com/travco/postcss-extend)):

```css
// Комментарии
...
.head
  color: white
.block
  ...
  color: rgba(0,0,0,.95)
  width: 200px
  height: @width
  ...
  &__element
    all: initial
    top: center
    size: 50px
    &:hover
      ^&-part
        color: rgb(255, 102, 0)
    ...
  &--modifier
    @extend .head
```

#### PostCSS-плагины

1. [CSSNext](http://cssnext.io). Штуки из CSS4, перменные, кастомные медиа-запросы;
1. [SugarSS](https://github.com/postcss/sugarss). Синтаксис Stylus со всеми штуками PostCSS;
1. [Container Queries Prolyfill](https://github.com/ausi/cq-prolyfill). Адаптивные контейнеры;
1. [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker). Группирует медиазапросы и помещает их в конец CSS документа;
1. [PostCSS Short](https://github.com/jonathantneal/postcss-short). Логичные укороченные конструкции дял свойств;
1. [PostCSS Center](https://github.com/jedmao/postcss-center). Плагин для беззаботной центровки элементов;
1. [PostCSS SVG](https://github.com/Pavliko/postcss-svg). Работа с SVG в CSS;
1. [PostCSS ASSETS](https://github.com/assetsjs/postcss-assets). Магия для работы с ресурсами сайта;
1. [PostCSS Sprites](https://github.com/2createStudio/postcss-sprites). Генерация спрайтов;
1. [Lost Grid System](https://github.com/peterramsing/lost). Сетка, [работающая](http://lostgrid.org/) через `calc()`;
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

Графика размещается в `app/images`, собираются в `dist/assets/images/`, в CSS:

```css
background: resolve('name.jpg')
width: width('name.png')
```

##Шрифты и файлы проекта

Шрифты и файлы размещаются в папках `app/fonts` и `app/resources`, копируются в `dist/assets/fonts/` и `dist/assets/resources/` соответственно.

##JS

Никаких `#id` для JS. Классы для JS начинаются с `_`, чтобы не мешать стили и логику в одну кучу. Исходники скриптов размещаются в `app/scripts/app.js`, компилируются в `dist/assets/scripts/scripts.js`.

Сторонние скрипты и библиотеки кладутся в папку `app/scripts/vendor`, компилируются в `dist/assets/scripts/vendor.js`.

- - - -

## Структура папок и файлов

```
├── app/                              # Исходники
│   ├── templates/                    # Шаблоны
│   │   ├── base/                     # Базовые блоки
│   │   │   └── _head.html            # Разметка тега <head>
│   │   ├── blocks/                   # Блоки
│   │   │   ├── _header               # Блок шапки
│   │   │   │   ├── _header.html      # Разметка шапки
│   │   │   │   └── _header.sss       # Стили шапки
│   │   │   ├── _footer               # Блок подвала
│   │   │   │   ├── _footer.html      # Разметка подвала
│   │   │   │   └── _footer.sss       # Стили подвала
│   │   │   ├── _start.html           # Вводная лекция
│   │   ├── guideline.html            # Типовая текстовая страница
│   │   ├── index.html                # Карта сайта с прогрессом работ
│   │   └── home.html                 # Главная страница шаблона
│   ├── scripts/                      # Скрипты
│   │   ├── vendor/                   # Сторонние скрипты и JS-библиотеки
│   │   └── app.js                    # Главный скрипт
│   ├── styles/                       # Стили
│   │   ├── base/                     # Блоки
│   │   │   ├── default.sss           # Типографика
│   │   │   └── typo.sss              # Разметка подвала
│   │   ├── helpers/                  # Блоки
│   │   │   ├── variables.sss         # CSS-Переменные
│   │   │   └── normalize.sss         # Разметка подвала
│   │   └── layout.sss                # Главный стилевой файл
│   ├── images/                       # Картинки
│   │   ├── sprites/                  # Папка PNG-иконок для генерации растрового спрайта
│   │   └── test/                     # Папка для тестовых картинок
│   ├── resources/                    # Статические файлы для копирования в dist/
│   │   ├── manifests                 # Манифесты (в том числе и для Яндекс.Табло)
│   │   │   └── manifest.json         # Файл манифеста
│   │   └── robots.txt                # Для роботов
│   └── fonts/                        # Шрифты
├── dist/                             # Сборка (автогенерация)
│   ├── assets/                       # Подключаемые ресурсы
│   │   ├── fonts/                    # Шрифты
│   │   ├── images/                   # Изображения
│   │   │   └── sprites/              # Спрайты (автогенерация)
│   │   ├── scripts/                  # Скрипты
│   │   └── styles/                   # Стили
│   ├── manifests                     # Манифесты (в том числе и для Яндекса)
│   ├── robots.txt                    # Файл для поисковых роботов
│   ├── index.html                    # Карта сайта с прогрессом работ
│   ├── guideline.html                # Типовая текстовая страница
│   └── home.html                     # Сборка главной страницы
├── .gitignore                        # Список исключённых файлов из Git
├── package.json                      # Список модулей и прочей информации
├── gulpfile.js                       # Конфигурация Gulp.js
└── README.md                         # Документация шаблона
```
