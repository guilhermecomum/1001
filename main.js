import React from 'react'
import Expo from 'expo'
import spotifyWebApi from 'spotify-web-api-node'
import { StatusBar, StyleSheet, Image, Text, View, TouchableOpacity, Linking } from 'react-native'
import { Components } from 'expo'
import { Entypo } from '@expo/vector-icons'

import config from './config'
import list from './db/db.json'
import NavBar from './components/NavBar'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      title: '',
      artist: '',
      cover: false,
      url: false,
      random: '',
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
    return r
  }

  async getAlbum() {
    const random = this.getRandom()
    const album = list.albums[random]
    const split = album.split(' - ')
    const artist = split[0]
    const title = split[1]

    const spotify = await this.spotifyApi.searchAlbums(album, {limit: 1})

    if (spotify.body.albums.items.length == 0) {
      return this.getAlbum()
    }


    const item = spotify.body.albums.items[0]
    const cover = item.images[0].url
    const url = item.uri


    this.setState({ title, artist, cover, url, random })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingTop: Expo.Constants.statusBarHeight,
      }}
      >
        <StatusBar barStyle='light-content' />
        <NavBar index={`Album n. ${this.state.random}`} />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
          {this.state.cover &&
           <View>
             <Image
               source={{uri: this.state.cover}}
               style={{
                 flex: 0,
                 resizeMode: 'contain',
                 height: 250,
                 width: 250,
                 alignSelf: 'center',
                 marginBottom: 20,
                 position: 'relative',
               }}
             />
             <View style={{
               position: 'absolute',
               width: 250,
               height: 250,
               alignSelf: 'center',
               alignItems: 'flex-start',
               justifyContent: 'flex-end',
               paddingLeft: 10,
               paddingBottom: 10,
               backgroundColor: 'rgba(0,0,0, 0.2)'
             }}>
               <Entypo name="info-with-circle" size={20} color="#f1c40f" />
             </View>
           </View>
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
              onPress={this.handleClick.bind(this)} style={{ alignSelf: 'center', marginTop: 20}}>
              <View style={{ alignSelf: 'center' }}>
                <Entypo name="spotify" size={40} color="#1ED760" />
              </View>
            </TouchableOpacity>
          }
        </View>
        <TouchableOpacity
          onPress={this.getAlbum.bind(this)}
          style={{
            flex: 0,
            paddingVertical: 20,
            justifyContent: 'center',
            height: 60,
            flexDirection: 'row',
          }}
        >
          <Entypo name="ccw" size={16} color="#f1c40f" />
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            marginLeft: 10,
          }}>
            Random
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Expo.registerRootComponent(App);
