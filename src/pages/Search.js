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
    // if (loading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.handleSearch }
            value={ search }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disabled }
            onClick={ this.handleButton }
          >
            Pesquisar
          </button>
        </div>
        {loading && <Loading />}
        {result && (
          <section>
            <h3>{`Resultado de álbuns de: ${searched}`}</h3>
            <div>
              {albums.length !== 0 ? (albums.map((album) => (
                <div key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    {album.collectionName}
                  </Link>
                </div>
              ))) : (<h3>Nenhum álbum foi encontrado</h3>)}
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
