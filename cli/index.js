import fs from 'fs'
import request from 'request-promise'
import spotifyWebApi from 'spotify-web-api-node'
import { exec } from 'child_process'
import readline from 'readline'
import config from './config'

// credentials are optional
const spotifyApi = new spotifyWebApi({
  clientId : 'config.client',
  clientSecret : 'config.secret',
  redirectUri : 'http://www.example.com/callback'
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get list with all albums
const list = JSON.parse(fs.readFileSync('db.json', 'utf-8')).items

const getRandom = () => {
  let r = Math.floor(Math.random()  * (list.length))
  return list[r]
}

const options = {
  uri: getRandom().resource_url,
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

const getAlbum = () => {
  request(options)
    .then((album) => {
      console.log(`${album.title} - ${album.artists[0].name} (${album.year})`)
      return album })
    .then((album) => {
      spotifyApi.searchAlbums(`${album.title} - ${album.artists[0].name}`)
                .then( (data) => {
                  if (data.body.albums.items[0].uri) {
                    rl.question('Quer ouvir no spotify? s/n: \n', (answer) => {
                      if ( answer === 's') {
                        exec(`spotify play uri ${data.body.albums.items[0].uri}`)
                        return rl.close()
                      } else {
                        rl.close()
                      }
                    })
                  }
                })
    })
}

getAlbum()
