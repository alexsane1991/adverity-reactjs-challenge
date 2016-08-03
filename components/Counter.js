import React from 'react';

class Counter extends React.Component {
  render() {
    return (
      <div>
        {this.props.label}: <span className="number">{this.props.number}</span>
      </div>
    )
  }
}

export default Counter
