import React, { Component } from 'react';

function FavoriteItem(props) {
  function pressFavorite() {
    props.toggleFavorite(props.name);
  }

  return (
    <div>
      <p>{props.name} <button onClick={pressFavorite}>V</button></p>
    </div>
  )
}

export class StremioApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isFavorite: false
    }
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }
  toggleFavorite(item) {
    let newItems = this.state.items;
    let itemID = newItems.indexOf(item);
    itemID.isFavorite = true;
    this.setState({ items: newItems });
  }
  render() {
    //var newList = this.state.items.map((item) => {return <FavoriteItem name={item} toggleFavorite={this.toggleFavorite}/> })
    //var newList = this.state.items;
    //console.log(newList);
    return (
      <div className='container'>
        {this.items}
      </div>
    )
  }
}