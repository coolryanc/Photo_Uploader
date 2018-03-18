import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './imageCanvas.sass';

const propTypes = {
  imgSrc: PropTypes.string,
  drawPara: PropTypes.object.isRequired
};

class CanvasFunction extends Component {
  constructor(props) {
    super(props);
    // Resize settings
    this.minResizeWidth = 240;
    this.minResizeHeight = 180;

    this.state = {
      h: 1,
      isCrop: false,
      selected: null,
      cropLeft: 0,
      cropTop: 0,
      cropWidth: this.minResizeWidth * 2,
      cropHeight: this.minResizeHeight * 2,
    };

    this.test = this.minResizeHeight * 2;

    this.mouseX = 0;
    this.mouseY = 0;
    this.elemX = 0;
    this.elemY = 0;

    this.mainpulateCanvas = this.mainpulateCanvas.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderCropCover = this.renderCropCover.bind(this);
    this.setCrop = this.setCrop.bind(this);
    this.drag_init = this.drag_init.bind(this);
    this.move_crop = this.move_crop.bind(this);
    this.resize_init = this.resize_init.bind(this);
    this.startResizing = this.startResizing.bind(this);
    this.stopResizing = this.stopResizing.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.drawPara !== nextProps.drawPara) {
      let para = Object.assign({}, this.props.drawPara, nextProps.drawPara);
      this.setState({para});
      this.setState({
        cropWidth: nextProps.drawPara.canvasWidth,
        cropHeight: nextProps.drawPara.canvasHeight,
      });
    }
  }

  mainpulateCanvas(d) {
    const canvas = document.getElementById("editCanvas");
    let context = canvas.getContext("2d");
    const img = this.state.para.img;
    const sx = this.state.para.sx;
    const sy = this.state.para.sy;
    const sw = this.state.para.sw;
    const sh = this.state.para.sh;
    const canvasWidth = this.props.drawPara.canvasWidth;
    const canvasHeight = this.props.drawPara.canvasHeight;

    // clear Canvas
    context.save();
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    switch (d) {
      case 'h':
        let flipH = this.state.h === 1 ? -1 : 1;
        context.translate(canvasWidth, 0);
        context.scale(-1, 1);
        this.setState({h: flipH});
        break;
      default:
        let new_d = this.state.h === -1 ? -d : d;
        context.translate(canvasWidth / 2, canvasHeight / 2);
        context.rotate(new_d * Math.PI / 180);
        context.translate(-canvasWidth / 2, -canvasHeight / 2);
        break;
    }
    const l = this.state.cropLeft * (sw / canvasWidth);
    const t = this.state.cropTop * (sh / canvasHeight);

    context.drawImage(img, sx + l, sy + t, this.state.cropWidth * (sw / canvasWidth), this.state.cropHeight * (sh / canvasHeight),  this.state.cropLeft, this.state.cropTop, this.state.cropWidth , this.state.cropHeight);
    context.save();
  }

  renderOptions() {
    if(!this.state.isCrop) {
      return (
        <div styleName="function-contain">
          <button onClick={(e) => this.setCrop(e)}>Crop</button>
          <button onClick={() => this.mainpulateCanvas(90)}>ClockWise</button>
          <button onClick={() => this.mainpulateCanvas(-90)}>CounterClockWise</button>
          <button onClick={() => this.mainpulateCanvas('h')}>Flip</button>
        </div>
      );
    }

    return null;
  }

  renderPresets() {
    if (!this.state.isCrop) {
      const presets = ['NORMAL', 'C1', 'F2', 'G3', 'P5', 'HB1', 'HB2', 'ACG', 'LV3', 'M5', 'A6', 'KK2', 'M3', 'T1', 'B5', 'X1'];
      const presetNodes = presets.map(el => (
        <div key={el} styleName="preset-block">
          <div styleName="img-contain">
            <img alt={el} src={this.props.imgSrc} />
          </div>
          <div styleName="text">
            {el}
          </div>
        </div>
      ));

      return presetNodes;
    }

    return null;
  }

  setCrop(e, action = 'crop') {
    e.preventDefault();
    if (action === 'crop') {
      if (this.state.isCrop) {
        const canvas = document.getElementById("editCanvas");
        let context = canvas.getContext("2d");
        const img = this.state.para.img;
        const sx = this.state.para.sx;
        const sy = this.state.para.sy;
        const sw = this.state.para.sw;
        const sh = this.state.para.sh;
        const canvasWidth = this.state.para.canvasWidth;
        const canvasHeight = this.state.para.canvasHeight;
        context.save();
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        const l = this.state.cropLeft * (sw / canvasWidth);
        const t = this.state.cropTop * (sh / canvasHeight);

        context.drawImage(img, sx + l, sy + t, this.state.cropWidth * (sw / canvasWidth), this.state.cropHeight * (sh / canvasHeight),  this.state.cropLeft, this.state.cropTop, this.state.cropWidth , this.state.cropHeight);
        context.save();
      }
    }
    const is_crop = this.state.isCrop ? false : true;
    this.setState({isCrop: is_crop});
  }

  drag_init(e) {
    if (!e.target.id) {
      this.setState({selected: e.target});
    }
    const elem = e.target;
    this.elemX = this.mouseX - elem.offsetLeft;
    this.elemY = this.mouseY - elem.offsetTop;
  }

  move_crop(e) {
    const canvas = document.getElementById("editCanvas");
    const offsetX = canvas.getBoundingClientRect().left;
    this.mouseX = e.pageX - offsetX;
    this.mouseY = e.pageY;

    if (this.state.selected !== null) {
      this.setState({cropLeft: this.mouseX - this.elemX});
      this.setState({cropTop: this.mouseY - this.elemY});
    }
  }

  resize_init(e) {
    e.preventDefault();
    window.addEventListener('mousemove', this.startResizing, false);
   	window.addEventListener('mouseup', this.stopResizing, false);
  }
  startResizing(e) {
    const canvas = document.getElementById("editCanvas");
    const offsetX = canvas.getBoundingClientRect().left;
    let w = e.clientX - offsetX - this.state.cropLeft;
    let h = e.clientY - this.state.cropTop;
    w = w < this.minResizeWidth ? this.minResizeWidth : w;
    h = h < this.minResizeHeight ? this.minResizeHeight : h;
    this.setState({cropWidth: w});
    this.setState({cropHeight: h});
  }
  stopResizing(e) {
    window.removeEventListener('mousemove', this.startResizing, false);
    window.removeEventListener('mouseup', this.stopResizing, false);
  }

  renderCropCover() {
    if (this.state.isCrop) {
      return (
        <div
         styleName="crop-block"
         onMouseDown={(e) => this.drag_init(e)}
         onMouseMove={(e) => this.move_crop(e)}
         onMouseUp={() => this.setState({selected: null})}
         style={{left: `${this.state.cropLeft}px`, top: `${this.state.cropTop}px`, width: `${this.state.cropWidth}px`, height: `${this.state.cropHeight}px`}}
        >
          <span
           id="reHandle"
           onMouseDown={(e) => this.resize_init(e)}
           style={{bottom: "-2px", right: "-2px", cursor: "nwse-resize"}}
          />
          <button onClick={(e) => this.setCrop(e)}>Apply</button>
          <button onClick={(e) => this.setCrop(e, "cancel")}>Cancel</button>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div
      style={{width: "100%", height: "100%"}}
      >
        {this.renderOptions()}
        {this.renderCropCover()}
        <div styleName="presets-scroll">
          {this.renderPresets()}
        </div>
      </div>
    );
  }
}

CanvasFunction.propTypes = propTypes;

export default CSSModules(CanvasFunction, styles);
