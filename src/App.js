import './App.scss';
import React, { useState, useEffect } from 'react'
import logo from './assists/logo colored-01.png'
import profilePic from './assists/profile icon-01.png'
import fotterLogo from './assists/logo white-01.png'
import hitIt from './assists/hit it-01.png'
import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';
import {
  gql
} from '@apollo/client';
import { Grid, Paper } from '@material-ui/core';

const allArtists = new ApolloClient({
  uri: 'http://127.0.0.1:8000/music/allArtists',
  cache: new InMemoryCache()
});
const allAlbums = new ApolloClient({
  uri: 'http://127.0.0.1:8000/music/allAlbums',
  cache: new InMemoryCache()
});
const allSongs = new ApolloClient({
  uri: 'http://127.0.0.1:8000/music/allSongs',
  cache: new InMemoryCache()
});


function App() {
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])

  useEffect(() => {
    loadDataOnce();
  }, [])


  const loadDataOnce = () => {
    getArtists();
    getAlbums();
    getSongs();
  }

  const getArtists = () => {
    allArtists
      .query({
        query: gql`
      query allArtists{
        allArtists{
          id
          artistName
          photo
        }
      }`
      })
      .then(result => setArtists(result));
  }

  const getAlbums = () => {
    allAlbums
      .query({
        query: gql`
    query allAlbums{
      allAlbums{
        id
        albumTitle
      }
    }`
      })
      .then(result => setAlbums(result));

  }

  const getSongs = () => {
    allSongs
      .query({
        query: gql`
    query allSongs{
      allSongs{
        id
        songTitle
      }
    }`
      })
      .then(result => setSongs(result));

  }

  return (
    <div>
      <div className="row header">
        <div className="col-6">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="col-6 profile-pic-container">
          <span >PROFILE</span>
          <img src={profilePic} alt="profilePic" className="profile-pic" />
        </div>
      </div>
      <div className="row main-container">
        <div className="col-12 main">
          <div className="row">
            <div className="col-4 main-title">
              <h1 className="big-title">AMP UP THOSE DBS</h1>
              <br />
              <h3 className="small-title">MAKE MUSIC ON THE GO.</h3>
              <br />
              <img src={hitIt} alt="hitIt" className="hit-it" />
            </div>
            <div className="col artists">
              <div className="row">
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={3}>
                    {artists.data ? artists.data.allArtists.map((value, index) => (
                      <Grid key={index} item className="col-lg-4 col-md-4 col-sm-6">
                        <Paper className="artist-pic" >
                          <img src={value.photo} className="artist-photo" />
                        </Paper>
                      </Grid>
                    )) : undefined}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row second-main">
        <div className="col-12">
          <h1 className="second-main-title">GET PRODUCIN WITH MUSICDB</h1>
        </div>
        <div className="col-12">
          <h4 className="second-main-text1">PICK YOUR PREFERED INSTRUMENT</h4>
        </div>
        <div className="col-12">
          <h5 className="second-main-text2">PICK THE INSTRUMENT YOU NEED TO COMPOSE YOUR PIECE</h5>
        </div>
        <div className="col-12">
          <h5 className="second-main-start-composing">START COMPOSING</h5>
        </div>
      </div>
      <footer className="footer">
        <div className="row">
          <div className="footer-logo">
            <img className="footer-logo" src={fotterLogo}></img>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
          </div>
          <div className="col">
            PROFILE
          </div>
        </div>
        <div className="row">
          <div className="col-3">
          </div>
          <div className="col">
            SIGN IN
          </div>
        </div>
        <div className="row">
          <div className="col-3">
          </div>
          <div className="col">
            MUSIC
          </div>
        </div>
        <div className="row footer-buttons">
          <div className="col-lg-1 col-md-1 col-sm-1">

          </div>
          <div className="col-1">
            LEGAL
          </div>
          <div className="col-1" >
            PRIVACY CENTER
          </div>
          <div className="col-1" >
            PRIVACY POLICY
          </div>
          <div className="col-1">
            COOKIES
          </div>
          <div className="col-1">
            ABOUT ADS
          </div>
          <div className="col" style={{ textAlign: "end", marginRight: "50px" }}>
            © 2019 MUSICDB
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
