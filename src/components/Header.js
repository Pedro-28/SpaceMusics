import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state ={
    nameInfo: '',
    isLoading: true,
  }

  componentDidMount() {
    this.handleUserApi();
  }

  handleUserApi = async () => {
    // const userAPI = await getUser();
    this.setState({
      nameInfo: await getUser(),
      isLoading: false,
    });
  }

  render() {
    const { isLoading, nameInfo } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <div className="divTitle">
          <h1>TrybeTunes</h1>
          <h4 data-testid="header-user-name">{nameInfo.name}</h4>
        </div>
        <div className="divLinks">
          <Link className="links" data-testid="link-to-search" to="/search">Search</Link>
          <Link
            className="links"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites
          </Link>
          <Link
            className="links"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
