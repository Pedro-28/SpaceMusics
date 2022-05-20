import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state={
    musicApi: [],
    favorite: [],
    artistName: '',
    albumName: '',
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    await this.handleFavoriteSongs();
    const api = await getMusics(id);
    this.setState({
      musicApi: api,
      artistName: api[0].artistName,
      albumName: api[0].collectionName,
      loading: false,
    });
  }

  handleFavoriteSongs= async () => {
    const getFavorite = await getFavoriteSongs();
    await this.setState({ favorite: getFavorite });
  }

  render() {
    const { loading, artistName, albumName, musicApi, favorite } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{albumName}</h2>
          <h3 data-testid="artist-name">{artistName}</h3>
        </div>
        <div>
          {musicApi.filter((_element, i) => i !== 0)
            .map((music) => (
              <MusicCard
                key={ music.trackId }
                songObj={ music }
                favorite={ favorite }
                update={ this.handleFavoriteSongs }
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }) }).isRequired,
};
