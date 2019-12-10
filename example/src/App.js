import React, { Component } from 'react';
import { Carousel } from 'react-pure-carousel';
import bgImg from './assets/bgImage.png';

export default class App extends Component {
  render () {
    return (
      <div className="wrapper">
        <h1>React Pure Carousel</h1>
        <div className="demo-carousel">
          <Carousel>
            <Carousel.Background src="https://cdn.dodowallpaper.com/full/671/wallpaper-outer-space-1.jpg" />
            <Carousel.Item>
              <Carousel.Caption alignItems="bottom">
                <h2>Carousel with Space Background</h2>
                <p>Made by React Pure Carousel</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption alignItems="bottom">
                <h2>Carousel with Space Background</h2>
                <p>Made by React Pure Carousel</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption alignItems="bottom">
                <h2>Carousel with Space Background</h2>
                <p>Made by React Pure Carousel</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
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
