import React from 'react';

const itemRow = (props) => {
    const posters = props.item.movies.map(photo => (
        <img key={photo.id} src={photo.poster} onClick={() => props.onFavoriteClicked(photo.id)} />
    ));

    return (
        <div>
            <h3 className='titles'>
                <span className='itemTitle'>{props.item.title}</span>
            </h3>
            {posters}
        </div>
    );
}

export default itemRow;