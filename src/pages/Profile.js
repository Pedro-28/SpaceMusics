import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

// const DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png';
class Profile extends React.Component {
  state = {
    user: '',
    loading: true,
  }

  async componentDidMount() {
    const userApi = await getUser();
    this.setState({ user: userApi, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header active="3"  />
        {loading ? <Loading /> : (
          <section>
            <div>
              <img
                className="userImg"
                data-testid="profile-image"
                src={ user.image }
                alt={ user.name }
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <div>
              <h3>Name</h3>
              <p>{user.name}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <h3>Description</h3>
              <p>{user.description}</p>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
