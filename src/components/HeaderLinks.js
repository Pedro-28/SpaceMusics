import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';


class HeaderLinks extends React.Component {

  render() {
    const { active } = this.props;
    return (
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
    );
  }
}

export default HeaderLinks;

HeaderLinks.propTypes = {
  active: propTypes.string.isRequired,
}
