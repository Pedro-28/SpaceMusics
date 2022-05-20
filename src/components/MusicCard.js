import propTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
state = {
  check: false,
  loading: false,
}

unmounted = false;

componentDidMount() {
  const { songObj: { trackId }, favorite } = this.props;
  const checked = favorite.some((fav) => fav.trackId === trackId);
  this.setState({ check: checked });
}

componentWillUnmount() {
  this.unmounted = true;
}

handleCheckbox= async ({ target: { checked } }) => {
  const { songObj, update } = this.props;
  this.setState({ check: checked, loading: true });
  if (checked) {
    await addSong(songObj);
    await update();
  } else {
    await removeSong(songObj);
    await update();
  }
  if (!this.unmounted) {
    this.setState({ loading: false });
  }
}

render() {
  const { songObj: { trackName, previewUrl, trackId } } = this.props;
  const { loading, check } = this.state;
  if (loading) return <Loading />;
  return (
    <div>
      <h4>{trackName}</h4>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
        .
      </audio>
      <label htmlFor="checkFavorite">
        Favorita
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          id="checkFavorite"
          onChange={ this.handleCheckbox }
          checked={ check }
        />
      </label>
    </div>
  );
}
}

export default MusicCard;

MusicCard.propTypes = {
  songObj: propTypes.shape({
    trackName: propTypes.string,
    previewUrl: propTypes.string,
    trackId: propTypes.oneOfType([
      propTypes.string,
      propTypes.number,
    ]),
  }).isRequired,
  favorite: propTypes.arrayOf(Object).isRequired,
  update: propTypes.func.isRequired,
};
