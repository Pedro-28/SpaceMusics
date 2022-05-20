import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state={
    loading: true,
    favorite: [],
  }

  async componentDidMount() {
    const getFavorite = await getFavoriteSongs();
    this.setState({ favorite: getFavorite, loading: false });
  }

  handleFavorite= async () => {
    const getFavorite = await getFavoriteSongs();
    await this.setState({ favorite: getFavorite });
  }

  render() {
    const { loading, favorite } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          { favorite.map((music) => (
            <MusicCard
              key={ music.trackId }
              songObj={ music }
              favorite={ favorite }
              update={ this.handleFavorite }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
