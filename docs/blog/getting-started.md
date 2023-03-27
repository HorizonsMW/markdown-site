I need to find a way to build the blog on my own. PS: There are ways and tools to do that but I want to build the blog from scratch. And yes, I am using AI.

Bing says: You can use **Node.js** to get a list of markdown files in a directory. Here's an example of how to do it:

```javascript
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'markdowns');

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(function (file) {
    if (path.extname(file) === '.md') {
      console.log(file);
    }
  });
});
```

Is there anything else I can help you with?

Source: Conversation with Bing, 3/25/2023(1) markdown - Is there a way to represent a directory tree in a Github .... https://stackoverflow.com/questions/23989232/is-there-a-way-to-represent-a-directory-tree-in-a-github-readme-md Accessed 3/25/2023.
(2) Print Directory & File Structure with icons for representation in Markdown. https://stackoverflow.com/questions/19699059/print-directory-file-structure-with-icons-for-representation-in-markdown Accessed 3/25/2023.
(3) Getting Started | Markdown Guide. https://www.markdownguide.org/getting-started Accessed 3/25/2023.

#### Yoooh! So this is big, I literally pasted Bing's reply as is, and turns out the Chatbot's replies are built using Markdown, which is also what I am using on this entire website to document.