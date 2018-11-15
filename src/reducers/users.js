//@flow
import type {User} from '../types/User';
type State = Array<User>;
type Action = {
  type: 'ADD_USERS',
  users: Array<User>,
};
const users = (state: State = [], action: Action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return [...state, ...action.users];
    default:
      return state;
  }
};

export default users;
