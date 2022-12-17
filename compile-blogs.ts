import * as fs from 'fs';
import * as path from 'path';

const {EOL} = require('os');
const showdown = require('showdown');

const rootPath = path.resolve(__dirname);
const converter = new showdown.Converter();

const blogNames: string[] = fs.readdirSync('./blogs');
const blobMeta = [];
blogNames.forEach(mdFileName => {
  const mdFilePath = path.join(rootPath, 'blogs', mdFileName);
  const blogId = mdFileName.substring(0, mdFileName.length - 3);
  const htmlFileName = blogId + '.html';
  const htmlFilePath = path.join(rootPath, 'public/blogs', htmlFileName);

  const mdStat = fs.statSync(mdFilePath);
  const md = fs.readFileSync(mdFilePath, {encoding: 'utf8'});
  const html = converter.makeHtml(md);
  fs.writeFileSync(htmlFilePath, html, {encoding: 'utf8'});

  const startOfTitle = md.indexOf('#') + 2;
  const endOfTitle = md.indexOf(EOL);
  const startOfSummary = endOfTitle + 4;
  const endOfSummary = md.indexOf(EOL + EOL, startOfSummary);

  blobMeta.push({
    id: blogId,
    title: md.substring(startOfTitle, endOfTitle),
    summary: md.substring(startOfSummary, endOfSummary).replace(EOL, ' '),
    created: mdStat.ctime,
    size: mdStat.size
  });
});

blobMeta.sort((a, b) => {
  return b.created - a.created;
});

fs.writeFileSync('src/generated/blog-list.json', JSON.stringify(blobMeta), {encoding: 'utf8'});

