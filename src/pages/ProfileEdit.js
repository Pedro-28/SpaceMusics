import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userDescription: '',
    userImage: '',
    loading: true,
    disable: true,
  }

  async componentDidMount() {
    const userApi = await getUser();
    this.setState({
      userName: userApi.name,
      userEmail: userApi.email,
      userDescription: userApi.description,
      userImage: userApi.image,
      loading: false,
    });
  }

  handleButton = async () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser({
      name: userName,
      email: userEmail,
      description: userDescription,
      image: userImage,
    });
    history.push('/profile');
  }

  handleValidation = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;

    if (userName.length !== 0 && userEmail.length !== 0
      && userDescription.length !== 0 && userImage.length !== 0) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.handleValidation);
  }

  render() {
    const { userName, userEmail, userDescription, userImage, loading,
      disable } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <section className="form-section-container">
            <form className="form-container">
              <label htmlFor="editName">
                <input
                  data-testid="edit-input-name"
                  name="userName"
                  type="text"
                  id="editName"
                  onChange={this.handleChange}
                  value={userName}
                  placeholder="Name"
                />
              </label>
              <label htmlFor="editEmail">
                <input
                  data-testid="edit-input-email"
                  name="userEmail"
                  type="email"
                  id="editEmail"
                  onChange={this.handleChange}
                  value={userEmail}
                  placeholder="Email"
                />
              </label>
              <label htmlFor="editDescription">
                <textarea
                  data-testid="edit-input-description"
                  name="userDescription"
                  id="editDescription"
                  onChange={this.handleChange}
                  value={userDescription}
                  placeholder="Description"
                  maxLength={150}
                />
              </label>
              <label htmlFor="editImage">
                <input
                  data-testid="edit-input-image"
                  name="userImage"
                  type="text"
                  id="editImage"
                  onChange={this.handleChange}
                  value={userImage}
                  placeholder="Image Url"
                />
              </label>
              <button
                className="button-container"
                data-testid="edit-button-save"
                type="button"
                onClick={this.handleButton}
                disabled={disable}
              >
                Edit Profile
              </button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};
