var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
};

//Usuarios
export var usuariosReducer = (state = [], action) =>{
  switch (action.type) {
    case 'ADD_USUARIO':
      return [
        ...state,
        action.arrUsuario
      ];
    case 'UPDATE_USUARIO':
      return state.map((usuario) => {
        if (usuario.id === action.id) {
          return {
            ...usuario,
            ...action.arrUsuario
          };
        } else {
          return usuario;
        }
      });
    default:
      return state;
  }
};
//Usuarios

//Produtos
export var produtosReducer = (state = [], action) =>{
  switch (action.type) {
    case 'ADD_PRODUTO':
      return [
        ...state,
        action.arrProduto
      ];
    case 'ADD_PRODUTOS':
      return [
        ...state,
        ...action.produtos
      ];
    default:
      return state;
  }
};
//Produtos

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            ...action.updates
          };
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos
      ];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
