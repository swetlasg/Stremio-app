import React, { Component } from 'react';
import client from 'stremio-addon-client';
import officialAddons from 'stremio-official-addons';
import aggregators from 'stremio-aggregators';
import ItemRow from './components/ItemRow/ItemRow';


export class StremioApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      favorites: localStorage.getItem('favoriteMovies') ? JSON.parse(localStorage.getItem('favoriteMovies')) : []
    }
  }

  componentDidMount() {
    const self = this;
    const col = new client.AddonCollection();
    col.load(officialAddons)
    const aggr = new aggregators.Catalogs(col.addons);
    aggr.run();

    aggr.evs.on('updated', function () {
      aggr.results.forEach(function (result) {
        if (result.response && result.response.metas) {
          const newItem = {
            title: result.type,
            movies: result.response.metas
          }
          const newItems = [...self.state.items, newItem];
          self.setState({ items: newItems });
        }
      });
    });


  }

  makeFavorite = (movieId) => {
    //console.log(movieId);
    
    /*saving in localStorage*/
    var favorites = localStorage.getItem('favoriteMovies');
    if (!favorites) {
      localStorage.setItem('favoriteMovies', "[]");
      favorites = [];
    }else {
      favorites = JSON.parse(favorites);
    }

    if (favorites.indexOf(movieId) != -1) {
      var favIndex = favorites.indexOf(movieId);
      favorites.splice(favIndex, 1);
    } else {
      favorites.push(movieId);
      var items = [...this.state.items];
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    this.setState({favorites: favorites});
  }

  render() {
    return (
      <div className='container'>
        {this.state.items.map((item, index) =>
          <ItemRow key={item.title + Math.random()} item={item} onFavoriteClicked={(movieId) => this.makeFavorite(movieId)} favorites={this.state.favorites}
          />)}
      </div>
    )
  }
}