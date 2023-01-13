import https from 'node:https';
import * as fs from 'fs';
import fetch from 'node-fetch';

// import path from 'path';

const website = 'https://memegen-link-examples-upleveled.netlify.app/';

const responseHtml = await fetch(website);
const htmlContent = await responseHtml.text();
let m;
const urls = [];
const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ( m = rex.exec( htmlContent ) ) {
    urls.push( m[1] );
}

function memeSelector(howManyMemes){
  let spicyMemes = [];
  for(let i=0; i < howManyMemes; i++){
    spicyMemes.push(urls[Math.floor(Math.random()*urls.length)]);
  }
  return spicyMemes
}
const memeStack = memeSelector(10);


function downloadImage(urls, fileName) {
  https.get(urls, (res) => {
      res.pipe(fs.createWriteStream("./memes/"+fileName));
  });
}


function createMemeFolder(){
  for(let i=0; i < memeStack.length; i++)
  {
    i < 9 ? downloadImage(memeStack[i], `0${i+1}.jpg`) : downloadImage(memeStack[i], `1${i-9}.jpg`);
  }
}

createMemeFolder();
