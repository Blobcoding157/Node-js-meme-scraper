import * as fs from 'node:fs';
import https from 'node:https';
import fetch from 'node-fetch';

// Fetching, Converting and saving HTML text to htmlContent
const website = 'https://memegen-link-examples-upleveled.netlify.app/';
const responseHtml = await fetch(website);
const htmlContent = await responseHtml.text();

// Selecting the src="Link" using regex
let m;
const urls = [];
const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ( m = rex.exec( htmlContent ) ) {
    urls.push( m[1] );
}

// Choose random arrays from the meme links
function memeSelector(howManyMemes){
  const spicyMemes = [];
  for(let i=0; i < howManyMemes; i++){
    spicyMemes.push(urls[Math.floor(Math.random()*urls.length)]);
  }
  return spicyMemes
}

// creating the desired *memeStack*
const memeStack = memeSelector(10);


// function that uses "https" and "fs" to saves images from links to /memes
function downloadImage(url, fileName) {
  https.get(url, (res) => {
      res.pipe(fs.createWriteStream("./memes/"+fileName));
  });
}

// function that fills the meme folder with 10 memes in the desired format and name. Still missing feature: delete folder
function createMemeFolder(){
  for(let i=0; i < memeStack.length; i++)
  {
    i < 9 ? downloadImage(memeStack[i], `0${i+1}.jpg`) : downloadImage(memeStack[i], `1${i-9}.jpg`);
  }
}

createMemeFolder();
