import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

var Main = (props) => {
  return (
    <div>
      {/* Nav */}
      <div className="row">
        {props.children}
      </div>
    </div>
  );
};
//Comentario
module.exports = Main;

//
// export class Main  extends React.Component (props) {
//   onLogout (e) {
//     var {dispatch} = this.props;
//     e.preventDefault();
//
//     dispatch(actions.startLogout());
//   }
//   render () {
//     return (
//       <div>
//         {/* Nav */}
//         <div className="row">
//           {props.children}
//         </div>
//       </div>
//     )
//   }
// };
//
// export default Redux.connect()(Main);
