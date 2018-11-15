import {connect} from 'react-redux';
import Users from '../screens/Users';

let mapStateToProps = (state) => ({
  users: state.users,
});
let mapDispatchToProps = (dispatch) => ({
  addUsers: (users) =>
    dispatch({
      type: 'ADD_USERS',
      users,
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
