import moment from 'moment';

import firebase, {firebaseRef, facebookProvider} from 'app/firebase/';

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
      var uid;

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log('user', user.uid);
          uid = user.uid;
          console.log('variavel uid', uid);
          console.log('uid no startAddProdutoCarrinho', uid);

          var usuarioRef;
          var blnNovo = false;
          var qtd = 0;
          //console.log('Entrando na função startAddProdutoCarrinho');
          //Consultar o carrinho do usuario para ver se já possui um produto igual
          //Se possuir, somar +1 na quantidade
          //Senao criar do zero com a quatidade 1
          //console.log('Antes da chamada consultarCarrinho');
          var carrinhoUsuario = dispatch(consultarCarrinho(uid));
          //console.log('Depois da chamada consultarCarrinho');

          carrinhoUsuario.then((e)=>{
            console.log('carrinho', e);
            if(e.length > 0){
              // console.log('Dentro da condição verdadeira length > 0');
              //console.log('length', e.length);
              for(var i=0; i < e.length; i++){
                //console.log('produto', e[i].id);
                if(e[i].id === id){
                  blnNovo = true;
                  qtd = parseInt(e[i].qtd) + 1;
                  i = e.length;
                }
              }
            }else{
              // console.log('Dentro da condição falsa length > 0');
              //Primeiro produto
              //Fazer push no firebase
              //console.log('Primeiro produto');
              var arrProduto = {
                id,
                nome,
                preco,
                fotoUrl,
                qtd: 1
              };
              //console.log('gravando carrinho', 'usuarios/', uid, '/carrinho/', id );
              usuarioRef = firebaseRef.child(`usuarios/${uid}/carrinho/${id}`).set({
               ...arrProduto
              });

              //usuarioRef = firebaseRef.child(`usuarios/${uid}/carrinho`).push(arrProduto);
              return usuarioRef.then(()=>{
                return dispatch(addProdutoCarrinho({
                    ...arrProduto
                  }));
              });
            }
            //console.log('Valor da variavel blnNovo antes do if dela', blnNovo);
            // console.log('Antes do if blnNovo');
            // console.log('valor da variavel blnNovo', blnNovo);
            if(!blnNovo){
              // console.log('Dentro da condição falsa blnNovo');
              //console.log('Não tem o produto, grava!');
              var arrProduto = {
                id,
                nome,
                preco,
                fotoUrl,
                qtd: 1
              };

              //console.log('gravando carrinho', 'usuarios/', uid, '/carrinho/', id );
              usuarioRef = firebaseRef.child(`usuarios/${uid}/carrinho/${id}`).set({
               ...arrProduto
              });

              //usuarioRef = firebaseRef.child(`usuarios/${uid}/carrinho`).push(arrProduto);
              return usuarioRef.then(()=>{
                return dispatch(addProdutoCarrinho({
                    ...arrProduto
                  }));
              });
            }else {
              // console.log('Dentro da condição verdadeira blnNovo');
              //Ja tem o produto
              //console.log('atualizando qtd no carrinho', 'usuarios/', uid, '/carrinho/', id , 'quatidade', qtd);
              //atualiza evento

               firebaseRef.child(`usuarios/${uid}/carrinho/${id}`).update({
                 qtd: qtd
               });
            }
          });
        } else {
          // No user is signed in.
          //console.log('Nenhum usuario logado');
        }
      });    
  };
};
//
export var consultarCarrinho = (idUsuario) => {
  return (dispatch, getState) => {
    console.log('idUsuario', idUsuario);
    var carrinhoRef = firebaseRef.child(`usuarios/${idUsuario}/carrinho`); //<- consulta carrinho do usuario

    return carrinhoRef.once('value').then((snapshot) => {
      var carrinho = snapshot.val() || {};
      var parsedProdutos = [];
      // /console.log('objCarrinho', carrinho);

      Object.keys(carrinho).forEach((id) => {
        parsedProdutos.push({
          ...carrinho[id]
        });
      });
      // console.log('parsedProdutos', parsedProdutos);
      //dispatch(addProdutos(parsedProdutos));
      return parsedProdutos;
    });
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

   firebase.auth().createUserWithEmailAndPassword(email, senha).then(()=> {
    var obj =  dispatch(startLoginEmail(email, senha));
    var uid;
    obj.then((e)=>{
      console.log(e.uid);
      uid = e.uid;
     console.log('uid', uid);
     var usuarioRef = firebaseRef.child(`usuarios/${uid}`).set({...arrUsuario});
      console.log('usuario criado');
      return usuarioRef.then(()=>{
        dispatch(addUsuario({
           ...arrUsuario,
           id: usuarioRef.key
         }));
       });
    });
   }, (error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log('Codigo: ', error.code, '-',  error.message);
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
    return firebase.auth().signInWithPopup(facebookProvider).then((result) => {
      console.log('Auth worked!', result);
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export var startLoginEmail = (email, senha) => {
  return (dispatch, getState) => {

    // return firebase.auth().signInWithEmailAndPassword(email, senha).then((result)=>{
    //   console.log('Autenticado com email e senha', result);
    // }, (error)=>{
    //   console.log(error.code, ' - ', error.message);
    // });
    return  firebase.auth().signInWithEmailAndPassword(email, senha).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
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
