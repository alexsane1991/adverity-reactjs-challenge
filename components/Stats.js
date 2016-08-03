import React from 'react';
import Counter from './Counter';

class Stats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stats">
        <Counter number={this.props.clicks} label="clicks"></Counter>
        <Counter number={this.props.impressions} label="impressions"></Counter>
      </div>
    )
  }
}

export default Stats

