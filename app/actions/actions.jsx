import moment from 'moment';

import firebase, {firebaseRef, githubProvider} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};



export var consultarProdutos = () => {
  return (dispatch, getState) => {
    var produtosRef = firebaseRef.child(`produtos`);

    return produtosRef.once('value').then((snapshot) => {
      var produtos = snapshot.val() || {};
      var parsedProdutos = [];
      // console.log('produtos', produtos);

      Object.keys(produtos).forEach((produtoId) => {
        parsedProdutos.push({
          id: produtoId,
          ...produtos[produtoId]
        });
      });
      // console.log('parsedProdutos', parsedProdutos);
      dispatch(addProdutos(parsedProdutos));
      return parsedProdutos;
    });
  };
};


//Metodos relacionados a Carrinho
//Add ao carrinho
export var addProdutoCarrinho = (arrProduto) => {
  return{
    type: "ADD_PRODUTO_CARRINHO",
    arrProduto
  };
};

export var startAddProdutoCarrinho = (id, nome, preco, fotoUrl) => {
    return (dispatch, getState) => {
      var arrProduto = {
        id,
        nome,
        preco,
        fotoUrl
      };
      console.log('arrProdutoCarrinho', arrProduto);
    return dispatch(addProdutoCarrinho({
        ...arrProduto
      }));

  };
};
//Metodos relacionados a Carrinho


//Metodos relacionados a usuarios
//Gravar novo usuario
export var addUsuario = (arrUsuario) => {
  return{
    type: "ADD_USUARIO",
    arrUsuario
  };
};

export var startAddUsuario = (nome, email, senha, facebookId, cpf ) => {
  return (dispatch, getState) => {

    var arrUsuario = {
      email,
      nome,
      senha,
      facebookId,
      cpf,
      createdAt: moment().unix(),
    };

    var uid = getState().auth.uid;
    var usuarioRef = firebaseRef.child(`usuarios`).push(arrUsuario);

    return usuarioRef.then(()=>{
      //console.log('Cadastro de usuario com sucesso no firebase', usuarioRef.key);
      dispatch(addUsuario({
        ...arrUsuario,
        id: usuarioRef.key
      }));
    });
  };
};

//Atualizar usuario
export var updateUsuario = (id, arrUsuario) =>{
  return {
    type: 'UPDATE_USUARIO',
    id,
    arrUsuario
  };
};


//Excluir usuario

//Metodos para gravar um novo usuario no firebase


//Metodos relacionados a produtos

//Gravar novo
export var addProdutos = (produtos) => {
  return {
    type: 'ADD_PRODUTOS',
    produtos
  };
};

export var addProduto = (arrProduto) => {
  return{
    type: "ADD_PRODUTO",
    arrProduto
  };
};

export var startAddProduto = (nome, preco, fotoUrl ) => {
  return (dispatch, getState) => {

    var arrProduto = {
      nome,
      preco,
      fotoUrl,
      createdAt: moment().unix(),
    };

    var uid = getState().auth.uid;
    var produtoRef = firebaseRef.child(`produtos`).push(arrProduto);

    return produtoRef.then(()=>{
      //console.log('Cadastro de produto com sucesso no firebase', produtoRef.key);
      return ( dispatch(addProduto({
        ...arrProduto,
        id: produtoRef.key
      })));
    });
  };
};

//Atualizar produto
//Excluir produto

//Metodos relacionados a produtos




export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log('Auth worked!', result);
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out!');
    });
  };
};
