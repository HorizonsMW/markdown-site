# What is this site all about?

***
Hello, thank you for being here. This site is a demo used to learn markdown. I have always looked at markdown with a rather curious face. I started working with markdown a few years back, but then I did not know what I can really do with it except write project documentations. Markdown started having an impact on me when I learned that it can be used to make some "**colourful**" readme's. My first markdown documenation was literally just a text file, I mean it had nothing "**colourful**" in it. I later learned of tools that can make great readme's. I was so amazed. I went on and put my all into it, and boy was I in for a ride. I'll just link it [here](https://github.com/HorizonsMW/HorizonsMW.github.io/blob/main/README.md).

So after that, fancy readme's kind of became a thing for me, I'd just see them everywhere. The turning point, when I decided I was going to learn markdown, was when [Chris Titus](https://christitus.com/) showcased his site that he built with markdown. I was amazed - poof! It was fast and the web pages were flawless, so I thought, "Why not try it..." And, well, here we are.

I'll keep on learning markdown, thanks to a book I found [online](https://www.markdownguide.org/book) by Matt Cone. 

Publishing this site has been made possible and deployed using [Netlify](https://app.netlify.com/) which I also saw, for the first time, in one of Chris Titus's videos on Youtube.

PS: I started working on markdown using Docusaurus but I have since then decided to build my own static website using `md-block` and some good old Javascript. You are looking at the new site. 

The initial Docusaurus site `code` is housed in this **[directory](https://github.com/HorizonsMW/docusaurus-base/tree/main/my-website)** on Github. This current site has a new [repository](https://github.com/HorizonsMW/markdown-site.git).

## About the code, including major functionalities
***
This website revolves around a single HTML file - essentially this is a single-page website. A single HTML file is manipulated while naviagting this website to display the relevant information. The basic structure of this website was derived from this [tutorial](https://itnext.io/build-a-single-page-web-app-javascript-and-the-dom-90c99b08f8a9) posted on [Medium](https://medium.com/). However, a significant part of the main javascript code has been tinkered to suit my needs.
#### For example:
```js
/**Original Code*/
function getContent(fragmentId, callback){
    /**This function fetches and returns data based on the hash location, e.g, #home, which is passed to the fuction
     *  via the fragmentId parameter
    */
  var pages = {
    home: "This is the Home page. Welcome to my site.",
    about: "This page will describe what my site is about",
    contact: "Contact me on this page if you have any questions"
  };

  callback(pages[fragmentId]); 
  /**The limitation of this function as it is is that, for new pages that are not included in the pages object,
   * I would have to come back and add the entry. Now doing this would have been exhausting for the next couple of 
   * pages so I opted to switch it up a little bit.
  */
}
```
#### I altered the code to this: 
```js
/**My code*/
function getContent(fragmentId, callback) {
    // lets do some custom content for each page of your website
    var page = `<md-block src="./docs/pages/${fragmentId}.md" id="md-block-app"></md-block>`;
    /**The line above fetches and returns a markdown document based on the location provided by the fragmentId parameter.
     * The catch is that the location and the document to preview must have the same name. To counter this,
     * for the about page which renders the README.md document, I used an if fuction to redirect to the file - README.md.
    */
   // console.log(page); //For informational purposes during development
    if (fragmentId === "about") {
        callback(`<md-block src="./README.md" id="md-block-app"></md-block>`);
    } else {
        callback(page);
    }
    //callback(pages[fragmentId]); //from original code
}

```

There is a lot more tinkering that has happened to build this site. Oh! Before I forget, Markdown + HTML is an heavenly combination. For clarity, using HTML tags in Markdown documents is a very recommendable way to overcome the limitations of Markdown. For example, the [contact](#contact) page is an intricate blend of the two technologies to bring out the best of both. 

>Kind Regards,
>
>Brian Mulwa.

***
