import * as cheerio from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';

const website = 'https://memegen-link-examples-upleveled.netlify.app/';

const response = await fetch(website);
const htmlContent = await response.text();
// console.log(htmlContent);

let m,
    urls = [],
    rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ( m = rex.exec( htmlContent ) ) {
    urls.push( m[1] );
}

console.log( urls );


let files = fs.readdirSync('./memes');
/* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
let chosenFile = files[Math.floor(Math.random() * files.length)];
