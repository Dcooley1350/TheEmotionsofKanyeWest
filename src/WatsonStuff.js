
const fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let kwString;
function makeKanyeRequest() {
    return new Promise(function (res, rej) {
        let request = new XMLHttpRequest();
        let urlKanye = 'https://api.kanye.rest';
        request.onload = function () {
            if (this.status === 200) {
                res(request.responseText);
            } else {
                rej(Error(request.statusText));
            }
        }
        request.open("GET", urlKanye, true);
        request.send();
    });
}

async function kanye() {
    let kwQuotePromises = [];
    for (let i = 0; i < 50; i++) {
        kwQuotePromises.push(makeKanyeRequest());
    }

    let kwQuotes = await kwQuotePromises;

    let kwString = '';
    for (let i = 0; i < kwQuotes.length; i++) {
        let response = await kwQuotes[i];
        let object = JSON.parse(response);
        let quote = object.quote;
        kwString += " " + quote;
    }
    return await kwString;

}

require('dotenv').config();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');




const toneAnalyzer = new ToneAnalyzerV3({
    authenticator: new IamAuthenticator({
        apikey: process.env.watsonKey,
    }),
    version: process.env.watsonVersion,
    url: process.env.watsonURL,
});

export default async function watsonRequest() {
    const K = await kanye();
    let params = {
        toneInput: { 'text': K },
        content_type: 'text/plain',
    };
    toneAnalyzer.tone(params)
        .then(toneAnalysis => {
            kwString = JSON.stringify(toneAnalysis, null, 2);
            fs.writeFile('kanyeQuotesResponse.json', kwString, (err) => {
                if (err) throw err;
            });
        })
        .catch(err => {
            console.log('error:', err);
        });
        return kwString;
}



