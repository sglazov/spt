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

1. Начать работу с файла стартовой страницы: `app/pages/index.html`.


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
├── app # корень проекта
│   ├── pages   # страницы
│   │   ├── index.html # стартовая страница
│   └── src # исходники
│       ├── components  # компоненты
│       │   ├── footer  # подвал
│       │   ├── header  # шапка
│       │   └── menu    # меню
│       ├── fonts/   # шрифты
│       ├── images/  # изображение
│       │   ├── favicons # фавиконки
│       │   ├── svg # svg для инлайна
│       │   └── svg-symbols # генерация svg-символов
│       ├── layouts # лэайтуы и составные части
│       │   ├── default.html    # базовый лэйаут
│       │   ├── head
│       │   │   ├── head.html
│       │   │   └── parts
│       │   │       ├── favicons.html
│       │   │       ├── og-tags.html
│       │   │       └── seo-tags.html
│       │   ├── parts
│       │   │   ├── globals.html
│       │   │   └── svg-symbols.html
│       │   └── utils
│       ├── php
│       │   └── main.php
│       ├── resources
│       │   ├── .htaccess
│       │   ├── browserconfig.xml
│       │   ├── humans.txt
│       │   ├── json
│       │   ├── robots.txt
│       │   ├── site.webmanifest
│       │   └── video
│       ├── scripts
│       │   ├── app.js
│       │   ├── libs
│       │   ├── modules
│       │   └── utils
│       ├── styles
│       │   ├── _diagnostics-and-debug
│       │   ├── app.scss
│       │   ├── components
│       │   ├── helpers
│       │   ├── layout
│       │   ├── variables
│       │   └── vendor
│       └── templates/
│           ├── data.html
│           └── svg/
├── component.js
├── gulpfile.js
│   ├── config.js
│   ├── index.js
│   ├── tasks/
│   └── utils/
├── CHANGELOG.md
├── README.md
├── README.ru.md
├── package.json
├── rsync-excludes.txt
└── webpack.config.js
```
</details>
