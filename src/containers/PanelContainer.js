import { connect } from 'react-redux';
import { set_filter } from '../redux/action';
import Panel from '../components/Panel';

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => {
  return {
    set_filter: (id, val) => {
      dispatch(set_filter(id, val))
    }
  };
}

const PanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel);

export default PanelContainer;
