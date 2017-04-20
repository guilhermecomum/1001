import React from 'react'
import Expo from 'expo'
import spotifyWebApi from 'spotify-web-api-node'
import { StyleSheet, Image, Text, View, TouchableOpacity, Linking } from 'react-native'
import { Components } from 'expo'
import { Entypo } from '@expo/vector-icons'

import config from './config'
import list from './db/db.json'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      title: '',
      artist: '',
    }
  }

  componentWillMount() {
    this.getAlbum()
  }

  handleClick() {
    Linking.canOpenURL(this.state.spotify).then(supported => {
      if (supported) {
        Linking.openURL(this.state.spotify);
      } else {
        console.log('Don\'t know how to open URI: ' + this.state.spotify);
      }
    });
  };

  getRandom() {
    const r = Math.floor(Math.random()  * (list.albums.length) + 1)
    return list.albums[r]
  }

  async getAlbum() {
    const album = this.getRandom()
    const artist = album.split(' - ')[0]
    const title = album.split(' - ')[1]

    const spotifyApi = new spotifyWebApi({
      clientId : config.client,
      clientSecret : config.secret,
    });

    const API_KEY = config.api
    const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${title}&format=json`
    try {
      const response = await fetch(url);
      const albumInfo = await response.json();
      const spotify = await spotifyApi.searchAlbums(album)
      const cover = albumInfo.album.image.filter( (i) => { return i.size === 'extralarge'} )[0]['#text']

      this.setState({
        title: title,
        artist: artist,
        cover: cover || false,
        spotify: spotify.body.albums.items[0].uri || false,
      })
      return albumInfo
    } catch(error) {
      console.error("OMG: ", error);
    }
  }

  render() {

    return (
      <View style={{
        flex: 8,
        backgroundColor: '#000',
        justifyContent: 'center',
      }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
          {this.state.cover &&
           <Image
             source={{uri: this.state.cover}}
             style={{
               flex: 0,
               resizeMode: 'contain',
               height: 200,
               width: 200,
               alignSelf: 'center',
               marginBottom: 20,
             }}
           />
          }
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
            paddingBottom: 10,
          }}>
            {this.state.title}
          </Text>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
          }}>
            {this.state.artist}
          </Text>
          { this.state.spotify &&
            <TouchableOpacity
              onPress={this.handleClick.bind(this)}>
              <View style={{ alignSelf: 'center', marginTop: 20 }}>
                <Entypo name="spotify" size={48} color="#1ED760" />
              </View>
            </TouchableOpacity>
          }
        </View>
        <TouchableOpacity
          onPress={this.getAlbum.bind(this)}
          style={{
            flex: 0,
            paddingVertical: 20,
            backgroundColor: '#2980b9',
            justifyContent: 'center',
            height: 50
          }}
        >
          <Text style={{
            color: '#fff',
            textAlign: 'center',
          }}>
            Random
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Expo.registerRootComponent(App);
