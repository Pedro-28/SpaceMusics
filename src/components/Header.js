import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

const DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png';
class Header extends React.Component {
  state = {
    userInfo: '',
    isLoading: true,
  }

  componentDidMount() {
    this.handleUserApi();
  }

  handleUserApi = async () => {
    // const userAPI = await getUser();
    this.setState({
      userInfo: await getUser(),
      isLoading: false,
    });
  }
  // isLoading
  render() {
    const { isLoading, userInfo } = this.state;
    const { active } = this.props;

    // if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <div className="divTitle">
          <h1>Space Musics</h1>
          <div className="headerUserInfo">
            {isLoading ? (<Loading user="1" />) : (
              <>
                <h4 data-testid="header-user-name">{userInfo.name}</h4>
                <img className="headerUserImg" src={userInfo.image === '' ? DEFAULT_IMAGE : userInfo.image} alt={userInfo.name} />
              </>
            )}
          </div>
        </div>
        <div className="divLinks">
          <Link
            style={active === '1' ? { backgroundColor: 'rgba(207, 207, 207)', color: 'black' } :
              { backgroundColor: 'rgba(0, 0, 0, 0.274)', color: 'rgb(207, 207, 207)' }}
            className="links"
            data-testid="link-to-search"
            to="/search"
          >
            Search
          </Link>
          <Link
            className="links"
            data-testid="link-to-favorites"
            to="/favorites"
            style={active === '2' ? { backgroundColor: 'rgba(207, 207, 207)', color: 'black' } : { backgroundColor: 'rgba(0, 0, 0, 0.274)', color: 'rgb(207, 207, 207)' }}
          >
            Favorites
          </Link>
          <Link
            style={active === '3' ? { backgroundColor: 'rgba(207, 207, 207)', color: 'black' } : { backgroundColor: 'rgba(0, 0, 0, 0.274)', color: 'rgb(207, 207, 207)' }}
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

Header.propTypes = {
  active: propTypes.string,
}
Header.defaultProps = {
  active: '0',
}
