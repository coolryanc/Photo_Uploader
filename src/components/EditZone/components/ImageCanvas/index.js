import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CanvasFunction from './CanvasFunction';
import CSSModules from 'react-css-modules';
import styles from './imageCanvas.sass';

const propTypes = {
  imgSrc: PropTypes.string,
  settings: PropTypes.object
};

class ImageCanvas extends Component {
  constructor(props) {
    super(props);
    this.defaultSettings = this.props.settings;
    this.state = {
      filter: '',
      drawImagePara: {
      },
    };

    this.initCanvas = this.initCanvas.bind(this);
    this.switchSetting = this.switchSetting.bind(this);
    this.drawImageProp = this.drawImageProp.bind(this);
  }

  componentDidMount() {
    this.initCanvas();
    window.addEventListener('resize', this.initCanvas);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settings !== nextProps.settings) {
      const newProps = nextProps.settings
      let filter = ''
      for(let name in newProps) {
        if(newProps[name] !== this.defaultSettings[name]) {
          filter += `${this.switchSetting(name, newProps[name])} `;
        }
      }
      this.setState({filter: filter});
    }
  }

  switchSetting(funcName, funcVal) {
    switch (funcName) {
      case 'Blur':
        return `${funcName}(${funcVal}px)`;
      default:
        return `${funcName}(${funcVal}%)`
    }
  }

  initCanvas() {
    const contain = document.querySelector("#editContain");
    const containWidth = contain.offsetWidth;
    const containHeight = contain.offsetHeight;

    const canvas = document.getElementById("editCanvas");
    canvas.width = containWidth;
    canvas.height = containHeight;
    let context = canvas.getContext("2d");
    let img = new Image();
    const self = this;
    img.onload = function() {
      self.drawImageProp(context, img, 0, 0, canvas.width, canvas.height, 0.5, 0.5)
    };
    img.src = this.props.imgSrc;
  }

  drawImageProp(context, img, x = 0, y = 0, canvasWidth, canvasHeight, offsetX, offsetY) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.save();
    let iw = img.width,
        ih = img.height,
        r = Math.min(canvasWidth / iw, canvasHeight / ih),
        nw = iw * r,
        nh = ih * r,
        sx, sy, sw, sh, ar = 1;

    /// decide which gap to fill
    if (nw < canvasWidth) ar = canvasWidth / nw;
    if (nh < canvasHeight) ar = canvasHeight / nh;
    nw *= ar;
    nh *= ar;

    /// calc source rectangle
    sw = iw / (nw / canvasWidth);
    sh = ih / (nh / canvasHeight);
    sx = (iw - sw) * offsetX;
    sy = (ih - sh) * offsetY;

    /// make sure source rectangle is valid
    if (sx < 0) sx = 0;
    if (sy < 0) sy = 0;
    if (sw > iw) sw = iw;
    if (sh > ih) sh = ih;

    this.setState({drawImagePara: {
      img: img,
      sx: sx,
      sy: sy,
      sw: sw,
      sh: sh,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
    }});
    context.drawImage(img, sx, sy, sw, sh,  x, y, canvasWidth, canvasHeight);
    context.restore();
  }

  render() {
    return (
      <div id="editContain" styleName="zone-contain">
        <canvas id="editCanvas" style={{filter: this.state.filter}} />
        <CanvasFunction drawPara={this.state.drawImagePara} imgSrc={this.props.imgSrc} />
      </div>
    );
  }
}

ImageCanvas.propTypes = propTypes;

export default CSSModules(ImageCanvas, styles);
