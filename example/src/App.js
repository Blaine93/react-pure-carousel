import React, { Component } from 'react';
import { Carousel } from 'react-pure-carousel';
import bgImg from './assets/bgImage.png';

export default class App extends Component {
  render () {
    return (
      <div className="wrapper">
        <h1>React Pure Carousel</h1>
        <div className="carousel">
          <Carousel>
            <Carousel.Background src={bgImg} />
            <Carousel.Item>
              <Carousel.Caption>
                <p>Text 1</p>
                <h5>Title 1</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <p>Text 2</p>
                <h5>Title 2</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <p>Text 3</p>
                <h5>Title 3</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}
