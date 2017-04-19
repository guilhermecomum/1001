import Expo from 'expo';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity,  } from 'react-native';
import { Components } from 'expo';
import config from './config'
import list from './db/db.json';
const { BlurView } = Components;


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

  getRandom() {
    const r = Math.floor(Math.random()  * (list.items.length) + 1)
    return list.items[r]
  }

  async getAlbum() {
    const album = this.getRandom()
    const artist = album.display_title.split(' - ')[0]
    const title = album.display_title.split(' - ')[1]
    const API_KEY = config.api
    const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${title}&format=json`

    try {
      let response = await fetch(url);
      let albumInfo = await response.json();
      console.log(albumInfo.album.image[2]['#text'])
      this.setState({
        title: title,
        artist: artist,
        cover: albumInfo.album.image[2]['#text'] || false
      })
      return albumInfo
    } catch(error) {
      console.error(error);
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
