import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import './landing.css';

class Landing extends Component{
  render(){
    return(
      <section className = 'landing'>
          <h2 className = 'hero-title'>Turn the music up!</h2>
          <Row className="show-grid">
            <Col xs={12} md={4} className = 'selling-points'>
              <i className = 'icon ion-md-musical-note'></i>
              <div className = 'point'>
                <h2 className = 'point-title'>Choose your music</h2>
                <p className = 'point-description'>The world is full of music; why should you have to listen to music that someone else chose?</p>
              </div>
            </Col>
            <Col xs={12} md={4} className = 'selling-points'>
              <i className = 'icon ion-md-wifi'></i>
              <div className = 'point'>
                <h2 className = 'point-title'>Unlimited, streaming, ad-free</h2>
                <p className = 'point-description'>No arbitrary limits. No distractions.</p>
              </div>
            </Col>
            <Col xs={12} md={4} className = 'selling-points'>
              <i className = 'icon ion-md-phone-portrait'></i>
              <div className = 'point'>
                <h2 className = 'point-title'>Mobile enabled</h2>
                <p className = 'point-description'>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
              </div>
            </Col>
          </Row>
      </section>
    )
  }
}

export default Landing;
