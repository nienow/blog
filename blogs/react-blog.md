# Creating a blog with react and markdown

Were so used to separating data from code. When I was thinking about the architecture for a simple blog, I immediately
assumed I would need a server side part to the application, with a database or the likes. But after doing a little
research, there is a much simpler way.

1. Use markdown to write the blog posts and push to the GIT repo
2. At buildtime, convert the markdown to html, and also gather the metadata
3. Use CI to build application and deploy live

## Using markdown to write blog posts

Markdown is fast and simple. It includes everything you need in a developer blog: Code blocks, Images, Links, Embedded
Code, etc.

```
# This is a blog title

This is a summary...
```

## Converting to HTML

I'm using [showdown](https://showdownjs.com/) for the markdown to html conversion. There were several libraries to
choose from, and I just chose the one that looked the lightest and fastest.

I created a script that would run at build time to convert the blogs and also gather the metadata for the article list
page. I'll let the code speak for itself:

```javascript
import * as fs from 'fs';
import * as path from 'path';
const {EOL} = require('os');
const rootPath = path.resolve(__dirname);

const showdown = require('showdown');
const converter = new showdown.Converter();

const blogNames: string[] = fs.readdirSync('./blogs');
const blogList = [];
blogNames.forEach(mdFileName => {
  const blogId = mdFileName.substring(0, mdFileName.length - 3);
  
  // read markdown file and stats
  const mdFilePath = path.join(rootPath, 'blogs', mdFileName);
  const mdStat = fs.statSync(mdFilePath);
  const mdContents = fs.readFileSync(mdFilePath, {encoding: 'utf8'});
  const mdTitle = mdContents.substring(mdContents.indexOf('#') + 2, mdContents.indexOf(EOL));

  // write HTML file
  const htmlFileName = blogId + '.html';
  const htmlFilePath = path.join(rootPath, 'public/blogs', htmlFileName);
  fs.writeFileSync(htmlFilePath, converter.makeHtml(mdContents), {encoding: 'utf8'});

  blogList.push({
    id: blogId,
    title: mdTitle,
    created: mdStat.ctime,
    size: mdStat.size
  });
});

fs.writeFileSync('src/generated/blog-list.json', JSON.stringify(blogList), {encoding: 'utf8'});


```

## Article List Page

This page simply reads the metadata that we gathered about the blogs, and generates a list of the articles.

```javascript
import blogs from 'generated/blog-list.json';

const ArticleList = () => {
  return (
    <div>
      {
        blogs.map(blog => <a href={'article/' + blog.id}>{blog.title}</a>)
      }
    </div>
  );
}
```

## Article Content Page

Since the HTML of the article is static and doesn't contain scripts, we can simply fetch the html and set it into the
innerHTML property. 

Then I'm using highlight.js to syntax highlight the code blocks. The highlighting is completely optional but
looks good.

```javascript
const Article = () => {
  const {id} = useParams();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    fetch('/blogs/' + id + '.html').then(res => res.text()).then((html) => {
      ref.current.innerHTML = html;
      
      // syntax highlight code blocks
      document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
      });
    });
  }, []);

  return (
    <div className="article" ref={ref}></div>
  );
}
```

## Styling

For styling, you can create a single SASS file that is scoped to the **.article** classname. 
I normally use styled-components for styling, but of course that won't work in this scenario, since the article HTML is plain HTML.

```scss
.article {
  font-family: "Candara Light";

  h1 {
    font-size: 32px;
    text-align: center;
  }

  p {
    font-size: 18px;
  }

  code {
    background-color: #ddd;
    border-radius: 5px;
    padding: 10px;
  }
}
```

## CI Build

Use Github or another CI workflow to generate the blogs first, and then build:

```yaml
name: Build

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'yarn'
      - run: yarn install --immutable
      - run: yarn run blogs
      - run: yarn run build
      
```

## Why React?

There is nothing dynamic about this webapp. You could use any framework, or no framework at all. I chose React because
it is the simplest to get started.
