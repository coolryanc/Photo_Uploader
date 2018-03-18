import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './imageUpload.sass';

const propTypes = {
  dispathfunc: PropTypes.func.isRequired,
};

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: "",
    };

    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(way, e) {
    e.preventDefault();
    switch(way) {
      case 'file':
        let reader = new FileReader();
        let file = e.target.files[0];
        let fileType = file.type.indexOf('image');
        if (fileType !== -1) {
          let self = this;
          reader.onload = function(event) {
            self.props.dispathfunc(event.target.result);
          }
        } else {
          this.setState({warning: "Please choose valid file types."});
        }
        reader.readAsDataURL(file);
        break;
      case 'url':
        if (e.key === 'Enter') {
          this.props.dispathfunc(e.target.value);
        }
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    const fileCropper = document.querySelector("#fileCropper");
    const self = this;
    fileCropper.ondragover = function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      fileCropper.style.backgroundColor = "rgba(0,0,0,0.2)";
      return false;
    };
    fileCropper.ondragleave = function () {
      fileCropper.style.backgroundColor = "inherit";
      return false;
    };
    fileCropper.ondrop = function(e) {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if(file.type.indexOf("image") !== -1) {
        self.props.dispathfunc(URL.createObjectURL(file));
      } else {
        fileCropper.style.backgroundColor = "inherit";
        self.setState({warning: "Please drop valid file types."});
      }
    };
  }

  render() {
    return (
      <div styleName="upload-contain">
        <div id="fileCropper" styleName="cropper">
          <div style={{marginBottom: '30px'}}>
            <label>
              Browse
              <input
               type="file"
               onChange={(e) => this.handleImage('file', e)}
              />
            </label>
            <span>&nbsp; or Drag image here.</span>
          </div>
          <input
           id="input-box"
           type="text"
           placeholder="Paste image URL here"
           onKeyUp={(e) => this.handleImage('url', e)}
          />
          <span styleName="message">{this.state.warning}</span>
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = propTypes;

export default CSSModules(ImageUpload, styles);
