import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    loading: true,
    img: '',
    artistName: '',
    albumName: '',
    favorite: [],
  }

  async componentDidMount() {
    const getFavorite = await getFavoriteSongs();
    const imgUrl = getFavorite[0] === undefined ? '' : getFavorite[0].artworkUrl100;
    const artistName = getFavorite[0] === undefined ? '' : getFavorite[0].artistName;
    const albumName = getFavorite[0] === undefined ? '' : getFavorite[0].collectionName;
    this.setState({
      favorite: getFavorite,
      loading: false,
      img: imgUrl,
      artistName,
      albumName,
    });
  }

  handleFavorite = async () => {
    const getFavorite = await getFavoriteSongs();
    await this.setState({ favorite: getFavorite });
  }

  render() {
    const { loading, favorite, img, albumName, artistName } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header active="2" />
        {loading ? <Loading /> : (
          <div>
            <div className="divAlbumName">
              <img src={img} alt={albumName} />
              <div className="divArtistName">
                <h2>{albumName}</h2>
                <h3>{artistName}</h3>
              </div>
            </div>

            {favorite.map((music) => (
              <MusicCard
                key={music.trackId}
                songObj={music}
                favorite={favorite}
                update={this.handleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
