import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <section data-testid="page-not-found" className="not-found-section-container">
        <div className="not-found-container">
          <h1>404</h1>
          <h2>Opps, page not found</h2>
          <Link to="/" className='not-found-link-container'>Home Page</Link>
        </div>
      </section>
    );
  }
}

export default NotFound;
