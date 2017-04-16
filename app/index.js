import fs from 'fs'
import request from 'request'
import spotifyWebApi from 'spotify-web-api-node'
import { exec } from 'child_process'
import readline from 'readline'

// credentials are optional
const spotifyApi = new spotifyWebApi({
  clientId : '',
  clientSecret : '',
  redirectUri : 'http://www.example.com/callback'
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const list = JSON.parse(fs.readFileSync('db.json', 'utf-8')).items

const getRandom = () => {
  let r = Math.floor(Math.random()  * (list.length))
  return list[r]
}

let random = getRandom()

request({url: random.resource_url, headers: {'User-Agent': 'request'}}, (error, response, body) => {
  const album = JSON.parse(body)

  console.log(`${album.title} - ${album.artists[0].name} (${album.year})`)

  spotifyApi.searchAlbums(`${album.title} - ${album.artists[0].name}`)
  .then( (data) => {
    if (data.body.albums.items[0].uri) {
      rl.question('Quer ouvir no spotify? s/n', (answer) => {
        if ( answer === 's') {
          exec(`spotify play uri ${data.body.albums.items[0].uri}`)
          return rl.close()
        } else {
          rl.close()
        }
      })
    }
  });
})
