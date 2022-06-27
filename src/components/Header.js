import propTypes from 'prop-types';
import React from 'react';
import { getUser } from '../services/userAPI';
import HeaderLinks from './HeaderLinks';
import UserInfo from './UserInfo';

class Header extends React.Component {
  state = {
    userInfo: '',
    isLoading: true,
    menu: false,
  }

  componentDidMount() {
    this.handleUserApi();
  }

  handleUserApi = async () => {
    this.setState({
      userInfo: await getUser(),
      isLoading: false,
    });
  }

  handleButton = () => {
    const { menu } = this.state;
    this.setState({ menu: !menu, })
  }

  render() {
    const { isLoading, userInfo, menu } = this.state;
    const { active } = this.props;

    return (
      <header data-testid="header-component">
        <div className="divTitle">
          <h1>Space Musics</h1>

          <div className="user-info-component">
            <UserInfo name={userInfo.name} image={userInfo.image} isLoading={isLoading} />
          </div>

          <button
            className="menu-component"
            onClick={this.handleButton}
          >
            <span className="material-symbols-outlined">
              {menu ? 'menu_open' : 'menu'}
            </span>
          </button>
        </div>
        <div className="links-component">
          {menu ? (
            <div className="menu-info-component active">
              <UserInfo name={userInfo.name} image={userInfo.image} isLoading={isLoading} />
              <HeaderLinks active={active} />
            </div>
          ) : (
            <div className="menu-info-component">
            </div>
          )}
          <div className="menu-links">
            <HeaderLinks active={active} />
          </div>
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
