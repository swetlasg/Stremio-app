import React from 'react';

/*using "imdb_id" for unique key/id, because some of the movies don't have an "id"
using the default photo - "/images/default-movie-1-3.jpg", where movies don't have a poster*/
const itemRow = (props) => {
    const posters = props.item.movies.map(movie => {
        var isFavorite = props.favorites.indexOf(movie.imdb_id) != -1;
        var favoriteIcon = isFavorite ? "/images/favorite_selected.png" : "/images/favorite.png";
        return (
            <div key={movie.imdb_id} id={movie.imdb_id} className="movie" style={{ backgroundImage: 'url(' + (movie.poster ? movie.poster : '/images/default-movie-1-3.jpg') + ')' }}>
                {/* <img  src={movie.poster} onClick={() => props.onFavoriteClicked(movie.id)} /> */}
                <div className="black-background">
                    <img className="favorite" src={favoriteIcon} onClick={() => props.onFavoriteClicked(movie.imdb_id)} />
                    <div className="info">
                        <div className="title">{movie.name}</div>
                        <div className="year">{movie.year}</div>
                    </div>
                </div>
                {isFavorite ? <img className="favorite_small" src={favoriteIcon} /> : null}
            </div>
        )
    });

    return (
        <div>
            <h3 className='item_title'>
                {props.item.title}
            </h3>
            <div className="movie-catalog">
                {posters}
            </div>
        </div>
    );
}

export default itemRow;