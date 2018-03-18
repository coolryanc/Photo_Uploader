import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from './components/ImageUpload';
import ImageCanvas from './components/ImageCanvas';

const propTypes = {
  set_src: PropTypes.func.isRequired,
  imageSource: PropTypes.string.isRequired,
  settings: PropTypes.object
}

class EditZone extends Component {
  constructor(props) {
    super(props);

    this.editArea = this.editArea.bind(this);
  }

  editArea() {
    if (this.props.imageSource.length) {
      return <ImageCanvas imgSrc={this.props.imageSource} settings={this.props.settings} />;
    }
    return <ImageUpload dispathfunc={this.props.set_src}/>
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        {this.editArea()}
      </div>
    );
  }
}

EditZone.propTypes = propTypes;

export default EditZone;
