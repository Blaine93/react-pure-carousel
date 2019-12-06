# react-pure-carousel

> Simple React Carousel Library

[![NPM](https://img.shields.io/npm/v/react-pure-carousel.svg)](https://www.npmjs.com/package/react-pure-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-pure-carousel
```
```bash
yarn add react-pure-carousel
```

## Usage

```jsx
import React, { Component } from 'react';

import { Carousel } from 'react-pure-carousel';

class Example extends Component {
  render () {
    return (
      <Carousel>
        <Carousel.Background />
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
    );
  }
}
```
## Props
### Carousel
| Name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| theme | string | 'light' | Theme for carousel. Can get the following values: `dark`, `light`  |
| duration | number | 1 | Transition duration for slides. `1` means 1 second |
| interval | number | null | Sets the interval between automatic slides scrolling. If value is `1000` it indicates 1 second. If value is `null` then auto scrolling disabled |
| className | string |   | Custom class names |

###Carousel.Background
| Name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| src | string |   | Image path for using as background image |
| color | string | transparent | Background color for carousel |
| className | string |   | Custom class names |

###Carousel.Item
| Name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| backgroundColor | string |  | Background color for certain carousel item |
| className | string |   | Custom class names |

###Carousel.Caption
| Name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| alignItems | string | 'center' | Alignment of the items inside Item. Can get the following values: `center`, `top`, `bottom` |
| className | string |   | Custom class names |

## License

MIT © [Blaine93](https://github.com/Blaine93)
