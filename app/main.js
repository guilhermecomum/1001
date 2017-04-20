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
      cover: false,
      url: false,
    }

    this.spotifyApi = new spotifyWebApi({
      clientId : config.client,
      clientSecret : config.secret,
    });

  }

  componentWillMount() {
    this.getAlbum()
  }

  handleClick() {
    Linking.canOpenURL(this.state.url).then(supported => {
      if (supported) Linking.openURL(this.state.url)
    });
  };

  getRandom() {
    const r = Math.floor(Math.random()  * (list.albums.length) + 1)
    return list.albums[r]
  }

  async getAlbum() {
    const album = this.getRandom()
    const split = album.split(' - ')
    const artist = split[0]
    const title = split[1]

    const spotify = await this.spotifyApi.searchAlbums(album)

    if (spotify.body.albums.items.length == 0) {
      return this.getAlbum()
    }


    const item = spotify.body.albums.items[0]
    const cover = item.images[0].url
    const url = item.uri


    this.setState({ title, artist, cover, url })
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
            fontWeight: "bold",
          }}>
            {this.state.title}
          </Text>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
          }}>
            {this.state.artist}
          </Text>
          { this.state.url &&
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
