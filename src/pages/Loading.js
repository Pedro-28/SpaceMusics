import React from 'react';
import propTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className={user === "1" ? "loadingUser" : "loading"}>
      </div>
    );
  }
}

export default Loading;

Loading.propTypes = {
  user: propTypes.func,
};

Loading.defaultProps = {
  user: '0',
}
