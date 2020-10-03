# 🚀 Основа для старта проекта
This readme is also available [in English](./README.md). _(WIP, help wanted)_

----

Gulp-шаблон помогает быстро начать вёрстку проекта.

## С чего начать?
1. Склонировать репозиторий в папку `new-project`, перейти в созданную папку проекта и удалить скрытую папку `.git`:
   ```bash
   git clone https://github.com/sglazov/spt.git new-project && \
   cd $_ && \
   rm -rf .git
   ```

1. Перед первым запуском нужно установить зависимости; один раз на проект:
   ```bash
   npm install
   ```
   `package-lock.json`, разумеется, лежит в репозитории.

1. Начать работу с файла стартово страницы: `app/pages/index.html`.


## Режимы сборки

Все доступные команды запуска описаны [в секции `scripts` файла `package.json:15`](./package.json:15).

Запуск живой сборки локально:
```bash
npm run start
```

Сборка прод-версии проекта с минифицированной статикой:
```console
npm run build
```

Сборка проекта с минифицированной статикой и архивация в _*.zip_-архив:
```console
npm run zip
```

## Шаблонизация


## Стили

### PostCSS-плагины всякие


## Графика и файлы проекта


## Скрипты


## Структура папок и файлов
<details>
  <summary>Показать стуктуру SPT</summary>

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
