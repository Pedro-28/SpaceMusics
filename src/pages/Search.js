import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    search: '',
    searched: '',
    albums: [],
    disabled: true,
    loading: false,
    result: false,
  }

  handleSearch = ({ target }) => {
    this.setState({ search: target.value }, () => {
      this.setState((prev) => ({ disabled: prev.search.length < 2 }));
    });
  }

  handleButton = () => {
    this.setState((prev) => ({
      loading: true,
      search: '',
      searched: prev.search,
    }), async () => {
      const { searched } = this.state;
      const api = await searchAlbumsAPI(searched);
      this.setState({
        loading: false,
        albums: api,
        result: true,
      });
    });
  }

  render() {
    const { search, searched, disabled, loading, result, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header active="1"  />
        <div className="search">
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.handleSearch }
            value={ search }
            placeholder="Search"            
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disabled }
            onClick={ this.handleButton }
          >
            Search
          </button>
        </div>
        {loading && <Loading />}
        {result && (
          <section>
            <h3 className="searchResult" >{`Resultado de álbuns de: ${searched}`}</h3>
            <div className="albums">
              {albums.length !== 0 ? (albums.map((album) => (
                <div key={ album.collectionId } className="album">                  
                  <Link
                    className="albumLink"
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <img src={album.artworkUrl100} alt={album.collectionName} />
                    <h3>{album.collectionName}</h3>                    
                  </Link>
                </div>
              ))) : (<h3 className="searchResult">Nenhum álbum foi encontrado</h3>)}
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
