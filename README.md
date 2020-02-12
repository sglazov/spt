# Шаблон проекта для быстрого старта
Gulp-шаблон помогает быстро начать вёрстку проекта.

## С чего начать?
1. Склонировать репозиторий в папку `new-project`, перейти в созданную папку проекта, удалить скрытую папку `.git`:
   ```console
   git clone https://github.com/sglazov/spt.git new-project && cd $_ && rm -rf ./.git
   ```

1. Перед первым запуском нужно установить зависимости; один раз на проект:
   ```console
   npm install / yarn
   ```

1. Начать работу с файла `app/templates/pages/index.html`.

## Режимы сборки
Запуск живой сборки локально:
```console
npm run start
```
`npm run dev` — просто синоним и забота, чтобы не ошибаться;

Одноразовая сборка в браузер, без вотчеров:
```console
npm run one
```

Сборка проекта с минифицированной статикой и архивация в _*.zip_-архив:
```console
npm run zip
```

Сборка прод-версии проекта с минифицированной статикой:
```console
npm run prod
```

Если работа происходит с кодом на GitHub _(вы сейчас здесь)_ — можно собрать и закоммитить в ветку `gh-pages` одной командой:
```console
npm run deploy
```

## Шаблонизация
Для шаблонизации использован [Nunjucks](https://www.npmjs.com/package/gulp-nunjucks-render). Файлы разметки живут в папке `app/templates/`, страницы размещаются в `app/templates/pages/` и состоят из компонентов _(= блоков)_ `app/templates/components/`.

Системные части страниц размещены в `app/templates/layouts`. Общие данные проекта для шаблонизатора класть в `app/templates/data/data.html`.

Данные отдельной страницы указываются в начале самой страницы [между символами](https://github.com/sglazov/spt/blob/master/app/templates/pages/index.html#L1-L6) `---`.

Внутри дирректории отдельного компонента размещается всё, что имеет к нему отношение — файл разметки (`*.html`), стили (`*.scss`), JS, изображения в отдельной папке `images/`.

Готовые страницы компилируются в корень папки `dist/*`.

В шаблонах работает антикэш — к ссылкам на стили и скрипты добавляется хэш.


## Стили
Препроцессор — [SASS](https://sass-scss.ru/) + чуть-чуть PostCSS. Базовые стили инклюдятся в файле `app/styles/styles.scss`.

Файлы стилей отдельного компонента размещены внутри папки компонента и собираются в базовый файл: `app/templates/**/*.scss`.

CSS компилируются в файл `dist/assets/styles/style.css`.

Для лёгкого упрощения жизни есть коллекция миксинов и несколько вспомогательных файлов и PostCSS-плагины.

### PostCSS-плагины всякие
1. [Autoprefixer](https://github.com/postcss/autoprefixer) — конечно же, префиксы расставляем не руками.
2. [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker) — группирует медиазапросы и помещает их в конец CSS документа; не забывайте о том, что `@media`-запросы можно вкладывать друг в друга. Даже в чистом CSS.
3. [PostCSS ASSETS](https://github.com/assetsjs/postcss-assets) — магия для работы с ресурсами сайта;
4. [Postcss Inline-SVG](https://github.com/TrySound/postcss-inline-svg) — работа с SVG;


## Графика и файлы проекта
Вся графика размещается в `app/images`, собираются в `dist/assets/images/` с сохранением структуры.

В `app/images/_debug/` размещается графика для Pixel-perfect сравнения.

Изображения для отдельного блока размещаются в папке `app/templates/components/**/images/` и копируются в корень папки `dist/assets/images/` без сохранения структуры.

Для сжатия изрбражений рекомендуется [Squoosh](https://squoosh.app/).

<details>
  <summary>Про SVG-иконки</summary>

  ### SVG
  SVG-иконки собираются в папке и подпапках внутри `app/images/svg/` по смыслу:

  Для использования в CSS использовать [URL-encoder for SVG](https://yoksel.github.io/url-encoder/) от прекрасной @yoksel.

  И не забывать про [SVGOMG](https://jakearchibald.github.io/svgomg/).
</details>

## Статические файлы для копирования
Статические файлы автоматически собираются из директории `app/resources`, копируются в `dist/assets/resources/`. Структура при копировании сохраняется.


## Скрипты
Можно писать на es2016 — подключен и работает Babel. В SPT есть jQuery v3.

Классы для JS в разметке начинаются с символа `_`, чтобы не мешать стили и логику в одну кучу. Исходники скриптов рамещены в `app/scripts/app/modules` и в отдельный дирректория компонентов в `app/templates/*`, компилируются в `dist/assets/scripts/app.js`.

Используемые JS-библиотеки размещаются в `app/scripts/vendor/libs`, компилируются в `dist/assets/scripts/vendor.js`.

## Структура папок и файлов
<details>
  <summary>Показать стуктуру папок и файлов</summary>

```
├── design                            # Дизайн, макеты и всякое
├── app/                              # Исходники проекта
│   ├── images/                       # Изображения и графика
│   │   ├── _debug/                   # Картинки для отладки (Pixel-perfect)
│   │   ├── i/                        # Зоопарк для Favicons
│   │   └── svg/                      # SVG-иконки
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
</details>
