import propTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';

const DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png';
class UserInfo extends React.Component {

  render() {
    const { name, image, isLoading } = this.props;

    return (
      <div className="headerUserInfo">
        {isLoading ? (<Loading user="1" />) : (
          <>
            <h4 data-testid="header-user-name">{name}</h4>
            <img className="headerUserImg" src={image === '' ? DEFAULT_IMAGE : image} alt={name} />
          </>
        )}
      </div>
    );
  }
}

export default UserInfo;

UserInfo.propTypes = {
  name: propTypes.string,
  image: propTypes.string,
  isLoading: propTypes.bool.isRequired,
}

UserInfo.defaultProps = {
  name: '',
  image: '',
}
