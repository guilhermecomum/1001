import React, { Component } from 'react'
import Expo from 'expo'
import spotifyWebApi from 'spotify-web-api-node'
import { StyleSheet, Image, Button, Text, View, TouchableOpacity, Linking } from 'react-native'

import config from '../config'
import list from '../db/db.json'
import AlbumInfo from '../components/albumInfo'
import Colors from '../Colors'
import { Router } from '../main';

export default class Home extends Component {

  static route = {
    navigationBar: {
      title: 'Home',
      tintColor: Colors.white,
      backgroundColor: Colors.black
    },
  };

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
    return random
  }

  render() {
    return (
      <AlbumInfo album={this.state} getAlbum={this.getAlbum.bind(this)} />
    );
  }
}

Expo.registerRootComponent(Home);
