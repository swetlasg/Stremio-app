import React, { Component } from 'react';
import client from 'stremio-addon-client';
import officialAddons from 'stremio-official-addons';
import aggregators from 'stremio-aggregators';
import ItemRow from './components/ItemRow/ItemRow';

// function FavoriteItem(props) {
//   function pressFavorite() {
//     props.toggleFavorite(props.name);
//   }

//   return ( 
//     <div>
//       <p>{props.name} <button onClick={pressFavorite}>V</button></p>
//     </div>
//   )
// }  

export class StremioApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    //this.toggleFavorite = this.toggleFavorite.bind(this);
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
            movies: result.response.metas,
            isFavourite: false
          }
          
          const newItems = [...self.state.items, newItem];
          self.setState({items: newItems});
        }
      });
    });


  }

  /*toggleFavorite(item) {
    let newItems = [ ...this.state.items ];
    let itemID = newItems.indexOf(item);
    itemID.isFavorite = true;
    this.setState({ items: newItems });
  }*/

  makeFavorite = (index,movieId) => {
    console.log(index);
    console.log(movieId);
    //let newMovies = [...this.state.items];

  }

  render() {
    //var newList = this.state.items.map((item) => {return <FavoriteItem name={item} toggleFavorite={this.toggleFavorite}/> })
    //var newList = this.state.items;
    //console.log(newList);
    return (
      <div className='container'>
        {this.state.items.map((item,index) =>
         <ItemRow key={item.title + Math.random()} item={item} onFavoriteClicked={(movieId) => this.makeFavorite(index, movieId)} 
         />)}
      </div>
    )
  }
}