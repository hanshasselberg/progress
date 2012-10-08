# Gifsocket Progress Bar

When I thought about howto do a minimal progress bar for file uploads I remembered reading about #gifsockets at [hackernews](http://news.ycombinator.com/item?id=4521334) - thanks @videlalvaro for the inspiration.

## How does that work?

In order to stay on the same page while the file is uploaded the form is send to a hidden iframe.
An animated gif is shown and controlled by the server, which provides frames showing how much of the file is actually uploaded.
Thats all.

## Why?

Because it only requires 6 lines of javascript for the client and works theoretically for _every_ browser! Even IE6 can show animated gifs.
This is the most minimal solution I can come up with. Minimal as in minimal for the client.

## Problems?

Although every browser is able to display animated gifs I run into several problems. Turned out Firefox is the most reliable browser, at least for my tests. Chrome works sometimes, IE9 worked when I tested it once.
Controlling the gif, sending the correct chunks and so on is not that easy and needs more work.

## Installation

Install all requirements,

    brew install node
    npm install formidable@latest

start the server

    node server.js

and visit [localhost:8080](http://localhost:8080).
