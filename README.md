# Шаблон проекта для быстрого старта

Шаблон помогает быстро начать вёрстку проекта.

Склонировать репозиторий, перейти в созданную папку проекта и удалить скрытую папку _.git_:

```bash
git clone git@github.com:4enki/spt.git new-project && cd new-project && rm -rf ./.git
```

Перед первым запуском нужно установить зависимости (_один раз на проект_):

```bash
npm i
```

## Режимы

Одноразовая сборка:

```bash
npm run one
```

Запуск живой сборки на локальном сервере:

```bash
npm run start
```

Сборка проекта в _*.zip_-архив. Архив создаётся в корне проекта; CSS- и JS-файлы в архиве собираются в двух экземплярах: минифицированный и оригинальный без комментариев:

```bash
npm run zip
```

## Шаблонизация

Шаблоны собираются в папке `app/templates/` с помощью тегов `<include>`. Составные части лежат в `blocks/`. [Переменные](https://github.com/zaharin/gulp-html-tag-include) — через `@@var`. Боевые файлы автоматически собираются в корне папки `dist/`.

## Стили

Верстаются в `app/styles/layout.sss` (_базовый стилевой файл_), компилируются в `dist/assets/styles/style.css`. Синтаксис [SugarSS](https://github.com/postcss/sugarss).

### PostCSS

Переменные ([PreCSS](https://github.com/jonathantneal/precss#variables)):

```css
$GeneralFontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
```

Вложенность ([postcss-nested](https://github.com/postcss/postcss-nested) и [postcss-nested-ancestors](https://github.com/toomuchdesign/postcss-nested-ancestors)) для элементов и модификаторов в [БЭМе](https://ru.bem.info/methodology/css/); ссылки на свойства ([postcss-property-lookup](https://github.com/simonsmith/postcss-property-lookup)); миксины ([postcss-mixins](https://github.com/postcss/postcss-mixins)); `@extend` с помощью ([postcss-extend](https://github.com/travco/postcss-extend)):

```css
// Пример того, что может быть
...
.head
  color: rgba(255,255,255,1)
  ...
.block
  ...
  background-color: rgba(0,0,0,.95)
  display: block
  width: 200px
  height: @width
  ...
  &__element
    top: center
    size: 50px
    &:hover
      ^&-part
        all: initial
        color: rgb(255, 102, 0)
    ...
  &--modifier
    @extend .head
    border: 1px solid rgba(235,126,26,.8)
```

#### PostCSS-плагины

1. [CSSNext](http://cssnext.io). Штуки из CSS4, перменные, кастомные медиа-запросы;
1. [PreCSS](https://github.com/jonathantneal/precss);
1. [Container Queries Prolyfill](https://github.com/ausi/cq-prolyfill). Адаптивные контейнеры;
1. [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker). Группирует медиазапросы и помещает их в конец CSS документа;
1. [PostCSS Short](https://github.com/jonathantneal/postcss-short). Логичные укороченные конструкции дял свойств;
1. [PostCSS Center](https://github.com/jedmao/postcss-center). Плагин для беззаботной центровки элементов;
1. [PostCSS SVG](https://github.com/Pavliko/postcss-svg). Работа с SVG в CSS;
1. [PostCSS ASSETS](https://github.com/assetsjs/postcss-assets). Магия для работы с ресурсами сайта;
1. [PostCSS Sprites](https://github.com/2createStudio/postcss-sprites). Генерация спрайтов;
1. [Lost Grid System](https://github.com/peterramsing/lost). Сетка, [работающая](http://lostgrid.org/) через `calc()`;
1. [PostCSS Initial](https://github.com/maximkoretskiy/postcss-initial). Сброс CSS-стилей элемента;

## Графика и файлы проекта

### Вектор

SVG-иконки собираются в папке `app/images/svg/`, в CSS:

```css
background-image: svg-load('name.svg', '[fill]: #000000');
```

### Растр

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

## Статические файлы для копирования

Статические файлы для копирования в готовую сборку размещены в `app/resources`, копируются в `dist/assets/resources/`.

## Скрипты

Можно писать на es2015 — подключен и работает Babel. Включен jQuery v3.

Никаких `#id` для JS. Классы для JS нужно начинать с `_`, чтобы не мешать стили и логику в одну кучу. Исходники скриптов собираются в `app/scripts/app.js`, компилируются в `dist/assets/scripts/scripts.js`.

Сторонние скрипты и библиотеки кладутся в папку `app/scripts/vendor`, компилируются в `dist/assets/scripts/vendor.js`.

----

## Структура папок и файлов

```
├── app/                              # Исходники
│   ├── images/                       # Изображения и графика
│   │   ├── _debug/                   # Картинки для отладки (Pixel-perfect)
│   │   ├── sprites/                  # Папка PNG-иконок для генерации растрового спрайта
│   │   └── svg/                      # SVG иконки
│   ├── resources                     # Статические файлы для копирования в /dist
│   │   └── robots.txt                # Роботс для поисковых систем
│   ├── scripts/                      # Скрипты
│   │   ├── vendor/                   # Сторонние скрипты и JS-библиотеки
│   │   └── app.js                    # Главный скрипт
│   ├── styles/                       # Стили
│   │   ├── _debug/                   # Стили для отладки
│   │   │   ├── diagnostics.sss       # Быстрая диагностика
│   │   │   └── px2px.sss             # CSS-файл Pixel-perfect
│   │   ├── base/                     # Стандратные стили
│   │   │   ├── default.sss           # Базовые стили
│   │   │   ├── form.sss              # Формы и элементы
│   │   │   ├── table.sss             # Таблицы
│   │   │   └── typo.sss              # Типографика
│   │   ├── helpers/                  # Помощники
│   │   │   ├── normalize.sss         # Сброс стилей (опционально)
│   │   │   └── variables.sss         # Переменные
│   │   └── layout.sss                # Главный стилевой файл
│   └── templates/                    # Шаблоны
│       ├── blocks/                   # Блоки
│       │   ├── _base/                # Базовые блоки для общего шаблона
│       │   │   ├── _head.html        # Разметка блока <head>
│       │   │   └── _social.html      # Open Graph и meta-теги для соцсетей
│       │   └── block/                # Блок
│       │       ├── block.html        # Разметка блока
│       │       ├── block.sss         # Стили блока
│       │       └── block.js          # Скрипт блока
│       └── pages/                    # Страницы
│           ├── guideline.html        # Разметка типовой текстовой страницы
│           ├── home.html             # Разметка домашней страницы проекта
│           └── index.html            # Разметка карты сайта с прогрессом работ
├── dist/                             # Сборка проекта (автогенерация)
│   ├── assets/                       # Подключаемые ресурсы
│   │   ├── manifests/                # Манифесты
│   │   ├── images/                   # Изображения
│   │   │   └── sprites/              # Спрайты (автогенерация)
│   │   ├── scripts/                  # Скрипты
│   │   └── styles/                   # Стили
│   ├── robots.txt                    # Файл для поисковых систем
│   ├── index.html                    # Карта сайта с прогрессом работ
│   ├── guideline.html                # Типовая текстовая страница
│   └── home.html                     # Сборка стартовой страницы
├── .editorconfig                     # Конфигурационный файл IDE
├── .gitignore                        # Список исключённых файлов из Git
├── browserslist                      # Список поддерживаемых браузеров для Автопрефиксера
├── package.json                      # Список модулей и прочей информации
├── yarn.lock                         # Список модулей и прочей информации для Yarn
├── gulpfile.js                       # Конфиг Gulp.js
└── README.md                         # Документация проекта
```
