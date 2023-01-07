import * as fs from 'fs';
import * as path from 'path';

const {EOL} = require('os');
const showdown = require('showdown');

const converter = new showdown.Converter({tables: true});

export const compileMarkdown = (dir: string) => {
  const mdDir = path.resolve('markdown', dir);
  const htmlDir = path.resolve('public', dir);
  const meta: any[] = [];
  const metaFile = path.resolve('src', 'generated', `${dir}.json`);
  const mdList: string[] = fs.readdirSync(mdDir);

  // clean directory - removed because messes with created date
  // for (const file of fs.readdirSync(htmlDir)) {
  //   if (file.endsWith('.html')) {
  //     fs.unlinkSync(path.join(htmlDir, file));
  //   }
  // }

  mdList.forEach(mdFileName => {
    const mdFilePath = path.join(mdDir, mdFileName);
    const articleId = mdFileName.substring(0, mdFileName.length - 3);
    const htmlFileName = articleId + '.html';
    const htmlFilePath = path.join(htmlDir, htmlFileName);

    const mdStat = fs.statSync(mdFilePath);
    const md = fs.readFileSync(mdFilePath, {encoding: 'utf8'});
    const html = converter.makeHtml(md);
    fs.writeFileSync(htmlFilePath, html, {encoding: 'utf8'});

    const startOfTitle = md.indexOf('#') + 2;
    const endOfTitle = md.indexOf(EOL);
    const startOfSummary = endOfTitle + 4;
    const endOfSummary = md.indexOf(EOL + EOL, startOfSummary);

    meta.push({
      id: articleId,
      title: md.substring(startOfTitle, endOfTitle),
      summary: md.substring(startOfSummary, endOfSummary).replace(EOL, ' '),
      created: mdStat.ctime,
      size: mdStat.size
    });
  });

  meta.sort((a, b) => {
    return b.created - a.created;
  });

  fs.writeFileSync(metaFile, JSON.stringify(meta), {encoding: 'utf8'});
};




