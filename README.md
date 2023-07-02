# **Markdown Table Generator**
<br>
<br>


## **Live**
<br>

[GithubPages]()

<br>
<br>

## **About This Project**
<br>

The motivation of this project is to simplify the process of creating or updating markdown tables with image content.

<br>
<br>

Lets have a look at a table containing images that represent the technologies used to build this project:

<br>

|Languages |Frontend |Testing |Bundler |
|:--------:|:-------:|:------:|:------:|
|<a href="https://www.typescriptlang.org/docs/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="50" height="50" title="TypeScript"/> </a> |<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="50" height="50" title="HTML"/> </a> |<a href="https://eslint.org/docs/latest/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg" alt="ESLint" width="50" height="50" title="ESLint"/> </a> |<a href="https://webpack.js.org/concepts/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg" alt="Webpack" width="50" height="50" title="Webpack"/> </a> |
||<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="50" height="50" title="CSS"/> </a> |<a href="https://mochajs.org/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mocha/mocha-plain.svg" alt="Mocha" width="50" height="50" title="Mocha"/> </a> ||
||<a href="https://react.dev/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React" width="50" height="50" title="React"/> </a> |<a href="https://www.cypress.io/" target="_blank"><img src="https://raw.githubusercontent.com/voss29/voss29/main/cypress_icon.svg" alt="Cypress" width="90" height="30" title="Cypress"/> </a> ||

<br>
<br>

Since the images are links and have the same user defined dimension the markdown definition looks like this:

```markdown
|Languages |Frontend |Testing |Bundler |
|:--------:|:-------:|:------:|:------:|
|<a href="https://www.typescriptlang.org/docs/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="50" height="50" title="TypeScript"/> </a> |<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="50" height="50" title="HTML"/> </a> |<a href="https://eslint.org/docs/latest/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg" alt="ESLint" width="50" height="50" title="ESLint"/> </a> |<a href="https://webpack.js.org/concepts/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg" alt="Webpack" width="50" height="50" title="Webpack"/> </a> |
||<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="50" height="50" title="CSS"/> </a> |<a href="https://mochajs.org/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mocha/mocha-plain.svg" alt="Mocha" width="50" height="50" title="Mocha"/> </a> ||
||<a href="https://react.dev/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React" width="50" height="50" title="React"/> </a> |<a href="https://www.cypress.io/" target="_blank"><img src="https://raw.githubusercontent.com/voss29/voss29/main/cypress_icon.svg" alt="Cypress" width="90" height="30" title="Cypress"/> </a> ||
```

<br>
<br>

To simplify creating and editing markdown tables like this the tool provices the following features:

1. create new / load existing markdown table
2. visually edit markdown table
3. generate markdown table definition

<br>

The visual table editor allows you to:

1. add or remove row / column
2. define column alignment
3. add, update or delete cell content (text, image or link)

<br>
<br>

## **TODO: Missing Features**
<br>

- [ ] Add ability to parse images with links in markdown style, e.g. `[![Alt](IMG-URL "Optional Title")](href)`
- [ ] Add ability to add text or image content via drag and drop
- [ ] Add ability to swap cell content via drag and drop
- [ ] Add ability to swap rows or columns via drag and drop

<br>
<br>

## **Documentation**
<br>

You can find the documentation [here](./documentation/documentation.md)

<br>
<br>

## **How To Run Code Locally**
<br>

1. Create application directory

```bash
mkdir markdown-table-generator
```

<br>

2. Clone repository
   
```bash
git clone https://github.com/voss29/grocery-item-tracker.git
git fetch
```

<br>

3. Install dependencies

```bash
npm install
```

<br>

4. Open application


**Option 1: Start development server**

```bash
npm run start
```

Visit `localhost:8080`.

<br>

**Option 2: Generate distribution code**

```bash
npm run compile
```

Open `dist/index.html` in web browser.



