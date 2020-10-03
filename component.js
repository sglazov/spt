/**
 * Хелпер для создания блоков с .html, .scss и .js-файлами
 *
 * node ./component.js "clients" "about" "etc"
 */
const fs = require('fs');
const path = require('path');


// директория компонентов
const componentsPath = './app/src/components/';
const componentFiles = {
  html : `<section class="{component}">\n\t<div class="{component}__wrap wrap">\n\t\t\n\t\</div>\n</section><!-- /section.{component} -->`,
  scss : `.{component} {\n\t\n}\n`
};


const args = process.argv.slice(2);
if ( args !== '' )
{
  args.map(component => createComponent(component));

} else {
  console.log('Не задано имя блока');
}


/**
 * Создание компонента
 */
function createComponent(component) {
  createFolder(component); // директория
  createFiles(component); // директория
}


/**
 * Создание директории компонента
 */
function createFolder(component) {
  fs.mkdir(componentsPath + component, (err) => {
    if (err) throw err;
    console.log(`Директория компонента ${component} успешно создана`);
  });
}

/**
 * Создание файлов компонента
 */
function createFiles(component) {
  const componentPath = path.join(componentsPath, component);

  Object.keys(componentFiles).forEach(extension => {
    const fileName = `${component}.${extension}`;
    const fileSource = componentFiles[extension].replace(/\{component}/g, component);
    const filePath = path.join(componentPath, fileName);

    fs.writeFile(filePath, fileSource, 'utf8', (err) => {
      if (err) throw err;
      console.log(`Файл ${fileName} компонента ${component} успешно создан`)
    });
  });
}
