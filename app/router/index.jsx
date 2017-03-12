import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import firebase from 'app/firebase/';

import Main from 'Main';
import Carrinho from 'Carrinho';
import CadastroUsuario from 'CadastroUsuario';
import CadastroProduto from 'CadastroProduto';
import Master from 'Master';

export default (
  <Router history={hashHistory}>
    <Route path="/"  component={Main}>
      <Route path="carrinho" component={Carrinho}/>
      <Route path="cadastrousuario" component={CadastroUsuario}/>
      <Route path="cadastroproduto" component={CadastroProduto}/>
      <IndexRoute component={Master}/>
    </Route>
  </Router>
);
