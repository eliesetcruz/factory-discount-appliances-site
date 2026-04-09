const fs = require('fs');
const path = require('path');

const root = __dirname;

function loadFile(name) {
  return fs.readFileSync(path.join(root, name), 'utf8');
}

module.exports = (req, res) => {
  try {
    const url = req.url || '/';

    if (url === '/styles.css') {
      const css = loadFile('styles.css');
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
      res.status(200).send(css);
      return;
    }

    const html = loadFile('index.html');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(500).send(`Server error: ${error.message}`);
  }
};
