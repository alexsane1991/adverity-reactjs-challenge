import React from 'react';
import Selector from './Selector';
class Wrapper extends React.Component {
  render() {
    return ( <div className="wrapper">
        <div className="header">Adverity Challenge</div>
        <Selector />
      </div>
    )
  }
}
export default Wrapper
