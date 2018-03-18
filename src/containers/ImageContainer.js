import { connect } from 'react-redux';
import { set_imageSrc } from '../redux/action';
import EditZone from '../components/EditZone';

const mapStateToProps = (state) => ({
  imageSource: state.imageSource,
  settings: state.settings
});

const mapDispatchToProps = dispatch => {
  return {
    set_src: src => {
      dispatch(set_imageSrc(src))
    }
  };
}

const ImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditZone);

export default ImageContainer;
