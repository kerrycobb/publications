# Publications-js
A plugin to embed publications or a bibliography into a webpage using a bibtex file.

[See demo here](https://kerrycobb.github.io/publications-js/)

### Get Started
Include the following lines in the `<head>` section of your webpage:
```html
<link rel='stylesheet' href='YOUR-PATH/publications.css'>
<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.3.1/css/all.css'
  integrity='sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU'
  crossorigin='anonymous'>
```

Include the following lines at the end of the `<body>` section of your webpage:
```html
<script src='YOUR-PATH/bibtexParse.js'></script>
<script src='YOUR-PATH/publications.js'></script>
```

Include a bibtext file named `pubs.bib` inside a folder called `pubs`. The easiest way to produce this file would be to export it from a reference manager.

Optional:
Include pdfs inside of the `pubs` directory. These pdfs should have the same file name that appears inside of pubs.bib file. The easiest way to do this would be to use the `Open Containing Folder` or `Open File Location` option available in most reference managers. Simply copy the pdfs from this location into the `pubs` directory.
