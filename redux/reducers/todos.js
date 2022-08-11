import { ADD_TODO, DELETE_TODO } from "../actions/todoapp/actionTypes";

const initialState = {
  todo_list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      // console.log('+++', action.payload);
      const { id, task } = action.payload
      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task }] // { id: id, task: task }
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }
    default:
      return state;
  }
}
