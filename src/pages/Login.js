import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const NUMBER_VALIDATION = 3;

class Login extends React.Component {
  state={
    login: '',
    disabled: true,
    isLoading: false,
  }

  handleInput = ({ target }) => {
    this.setState({ login: target.value }, () => {
      this.setState((prev) => ({ disabled: prev.login.length < NUMBER_VALIDATION }));
    });
  }

  handleClick= async () => {
    const { login } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: login });
    history.push('/search');
  }

  render() {
    const { login, disabled, isLoading } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-login">
        <div className="loginDiv">
          <h1 id="h1Login">Space Musics</h1>
          <div className="inputDiv">
          <input
            data-testid="login-name-input"
            type="text"
            placeholder="Type your Name"
            onChange={ (e) => this.handleInput(e) }
            value={ login }
            />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
            >
            Entrar
          </button>
            </div>
        </div>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};
