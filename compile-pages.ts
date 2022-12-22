import * as fs from 'fs';
import * as path from 'path';

const showdown = require('showdown');

const rootPath = path.resolve(__dirname);
const converter = new showdown.Converter();

const pageNames: string[] = fs.readdirSync('./pages');
pageNames.forEach(mdFileName => {
  const mdFilePath = path.join(rootPath, 'pages', mdFileName);
  const pageId = mdFileName.substring(0, mdFileName.length - 3);
  const htmlFileName = pageId + '.html';
  const htmlFilePath = path.join(rootPath, 'public/pages', htmlFileName);

  const md = fs.readFileSync(mdFilePath, {encoding: 'utf8'});
  const html = converter.makeHtml(md);

  fs.writeFileSync(htmlFilePath, html, {encoding: 'utf8'});
});

