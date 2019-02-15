# Шаблон проекта для быстрого старта
Шаблон помогает быстро начать вёрстку проекта.

Склонировать репозиторий в папку `new-project`, перейти в созданную папку проекта, удалить скрытую папку _.git_:

```bash
git clone https://github.com/4enki/spt.git new-project && cd $_ && rm -rf ./.git
```

Перед первым запуском нужно установить зависимости (_быстрее через [Yarn](https://yarnpkg.com); один раз на проект_):

```bash
npm/yarn install
```

## Режимы сборки
Запуск живой сборки на локальном сервере:

```bash
npm run start
```

Одноразовая сборка в браузере, без вотчеров:

```bash
npm run one
```

Сборка проекта с минифицированной статикой и архивация в _*.zip_-архив:

```bash
npm run zip
```

Сборка боевой версии проекта с минифицированной статикой:

```bash
npm run prod
```

## Шаблонизация
Для шаблонизации использован [Nunjucks](https://www.npmjs.com/package/gulp-nunjucks-render). Шаблоны собираются в папке `app/templates/`, страницы размещаются в `app/templates/pages/` и состоят из компонентов (блоков) `app/templates/components/`.

Системные части для страниц размещены в `app/templates/layouts`. Общие данные проекта для шаблонизатора класть в `app/templates/data/data.html`.

Данные отдельной страницы указываются в начале самой страницы [между символами](https://github.com/4enki/spt/blob/master/app/templates/pages/index.html#L1-L6) `---`.

Внутри дирректории отдельного компонента размещается всё, что имеет к нему отношение — файл разметки, стили, JS, изображения.

Готовые страницы компилируются в корень папки `dist/`.

В шаблонах работает антикэш — к ссылкам на стили и скрипты добавляется md5-хэш.

## Стили
Верстаются в `app/styles/styles.scss` и в отдельном компоненте `app/templates/components/`, компилируются в файл `dist/assets/styles/style.css`. Для лёгкого упрощения жизни есть коллекция миксинов и несколько вспомогательных файлов.

### PostCSS-плагины и всякое
1. [Autoprefixer](https://github.com/postcss/autoprefixer) — конечно же, префиксы расставляем не руками.
2. [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker) — группирует медиазапросы и помещает их в конец CSS документа;
3. [PostCSS ASSETS](https://github.com/assetsjs/postcss-assets) — магия для работы с ресурсами сайта;
4. [Postcss Inline-SVG](https://github.com/TrySound/postcss-inline-svg) — работа с SVG;

## Графика и файлы проекта
Вся графика размещается в `app/images`, собираются в `dist/assets/images/` с сохранением структуры.

В `app/images/_debug/` размещается графика для Pixel-perfect сравнения.

Изображения для отдельного блока размещаются в папке `app/templates/components/**/images/` и копируются в корень папки `dist/assets/images/` без сохранения структуры.


<details>
  <summary>Про вектор и растр</summary>

  ### Вектор
  SVG-иконки собираются в папке `app/images/svg/`, в CSS так:

  ```css
  background-image: svg-load('name.svg', fill: #000');
  ```

  ### Растр
  PNG-иконки для спрайтов собираются в папке `app/images/sprites/`, в CSS так:

  ```css
  background: url('images/sprites/name.png') no-repeat 0 0;
  ```

  Общий спрайт автоматически собирается в `dist/assets/images/sprites/`.
</details>

## Статические файлы для копирования
Статические файлы автоматически собираются из директории `app/resources`, копируются в `dist/assets/resources/`. Структура при копировании сохраняется.

## Скрипты
Можно писать на es2015 — подключен и работает Babel. Включен jQuery v3.

Классы для JS в разметке начинаются с символа `_`, чтобы не мешать стили и логику в одну кучу. Исходники скриптов рамещены в `app/scripts/app/modules` и в отдельный дирректория компонентов в `app/templates/*`, компилируются в `dist/assets/scripts/app.js`.

Используемые JS-библиотеки размещаются в `app/scripts/vendor/libs`, компилируются в `dist/assets/scripts/vendor.js`.

## Структура папок и файлов
```
├── design                            # Дизайн, макеты и всякое
├── app/                              # Исходники
│   ├── images/                       # Изображения и графика
│   │   ├── _debug/                   # Картинки для отладки (Pixel-perfect)
│   │   ├── i/                        # Favicons
│   │   └── svg/                      # SVG иконки
│   ├── resources                     # Статические файлы для копирования в /dist
│   │   └── robots.txt                # Роботс для поисковых систем
│   ├── scripts/                      # Скрипты
│   │   ├── app/                      # базовые JS-файлы проекта
│   │   └── vendor/                   # JS-библиотеки
│   ├── styles/                       # Стили
│   │   ├── _debug/                   # Стили для отладки
│   │   │   ├── diagnostics.scss      # Быстрая диагностика
│   │   │   └── px2px.scss            # CSS-файл Pixel-perfect
│   │   ├── base/                     # Стандратные стили
│   │   │   ├── default.scss          # Базовые стили
│   │   │   ├── form.scss             # Формы и элементы
│   │   │   ├── links-and-btn.scss    # Ссылки и кнопки
│   │   │   ├── table.scss            # Таблицы
│   │   │   └── typo.scss             # Типографика
│   │   ├── helpers/                  # Помогаторы
│   │   │   ├── animations.scss       # CSS-анимации
│   │   │   ├── flexboxgrid.scss      # Flexbox Grid by https://github.com/kristoferjoseph/flexboxgrid
│   │   │   ├── mixins.scss           # SCSS-Миксины
│   │   │   └── normalize.scss        # Normalize.css
│   │   ├── libs/                     # CSS-библиотеки
│   │   ├── variables.scss            # SCSS-Переменные
│   │   └── style.scss                # Главный стилевой файл приложения
│   └── templates/                    # Шаблоны HTML-разметки страниц и блоков
│       ├── components/               # Компоненты и блоки
│       │   └── component/            # Отдельный компонент
│       │       ├── images/           # Изображения, используемые в этом компоненте
│       │       ├── template.html     # Разметка компонента
│       │       ├── style.sсss        # Стили компонента
│       │       └── script.js         # JS для компонента
│       ├── data/                     # Данные для шаблонизатора
│       ├── layouts/                  # Базовые блоки для общего шаблона
│       │   ├── layout.html           # Базовая разметка шаблона документа
│       │   ├── favicons.html         # Базовый джентльменский набор иконок всех пород и размеров
│       │   ├── svg.symbols.html      # SVG-символы
│       │   └── social.html           # Базовый джентльменский набор OpenGraph-тегов
│       └── pages/                    # Страницы приложения
│           └── index.html            # Стартовая страницы приложения
├── dist/                             # Сборка проекта (автогенерация)
│   ├── assets/                       # Подключаемые ресурсы
│   │   ├── images/                   # Изображения
│   │   ├── scripts/                  # Скрипты
│   │   └── styles/                   # Стили
│   ├── robots.txt                    # Файл для поисковых систем
│   └── index.html                    # Карта сайта с прогрессом работ
├── gulpfile.js/                      # Конфиг Gulp.js
│   ├── tasks/                        # Отдельные файлы с задачами
│   ├── utils/                        # Помогаторы
│   ├── paths.js                      # Пути к ресурсам проекта
│   └── index.js                      # Основные задачи
├── .editorconfig                     # Конфигурационный файл IDE
├── .gitignore                        # Список исключённых файлов из Git
├── browserslist                      # Список поддерживаемых браузеров для Автопрефиксера
├── package.json                      # Файл-конфиг сборщика: пакеты, скприты, выходные данные
├── sass-lint.yml                     # Конфиг SCSS-линтера
└── README.md                         # Документация проекта
```
