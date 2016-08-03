import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import Stats from './Stats';

class Selector extends React.Component {

  constructor() {
    super();
    //state updaters
    this.updateOptions = this.updateOptions.bind(this);
    this.updateSelectedValue = this.updateSelectedValue.bind(this);
    this.updateStats = this.updateStats.bind(this);
    this.updateRecords = this.updateRecords.bind(this);

    this.handleOptionSelected = this.handleOptionSelected.bind(this);
    this.getAggregatedStats = this.getAggregatedStats.bind(this);

    this.state = {
      records: [],
      options: [],
      selectedValue: "",
      stats: {
        clicks: 0,
        impressions: 0
      }
    };
  }

  updateRecords(records) {
    this.setState({records: records})
  }

  updateOptions(options) {
    this.setState({options: options})
  }

  updateSelectedValue(option) {
    this.setState({selectedValue: option.value})
  }

  updateStats(stats) {
    this.setState({
      stats: {
        clicks: stats.clicks,
        impressions: stats.impressions
      }
    });
  }

  getAggregatedStats(option) {
    let clicks = 25;
    let impressions = clicks * 3;
    return {
      clicks: clicks,
      impressions: impressions
    }
  }

  handleOptionSelected(option) {
    this.updateSelectedValue(option);
    //let agregatedStats = this.getAggregatedStats(option);
    //find selected option
    //collect clicks and impressions in all records, where option.value matches record.campaign or record.channel


    let matchesCampaign = _.filter(this.state.records, _.iteratee({"campaign": option.value}));
    let matchesChannel = _.filter(this.state.records, _.iteratee({"channel": option.value}));
    let allMatches = _.union(matchesCampaign, matchesChannel);
    let aggregatedStats = {
      clicks: _.reduce(allMatches, function (sum, record) {
        return sum + record.clicks;
      }, 0),
      impressions: _.reduce(allMatches, function (sum, record) {
        return sum + record.impressions;
      }, 0)
    }

    this.updateStats(aggregatedStats);
  }

  convertChannelsToOptions(records) {
    //create an array holding values of all channels and campaign values in the channels object array;
    let optionsArray = _.union(_.map(records, 'campaign', _.trim),
      _.map(records, 'channel', _.trim));
    //remap the resulting array to value-label for the selector
    let optionsValueLabel = optionsArray.map(function (obj) {
      return {value: obj, label: obj}
    });
    this.updateOptions(optionsValueLabel);
  }

  componentWillMount() {
    axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then(data => {
      let records = [];
      let rows = _.split(_.trim(data.data), '\n');
      //let dataHeaders = _.split(_.head(rows), ',');
      let dataRows = _.tail(rows);

      _(dataRows).forEach(function (row) {
        let cells = _.split(row, ',');
        records.push({
          campaign: cells[0],
          channel: cells[1],
          clicks: _.toInteger(cells[2]),
          impressions: _.toInteger(cells[3])
        });
      });
      this.updateRecords(records);
      this.convertChannelsToOptions(records);

    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="challenge">
        Choose channel or campaign:
        <Select value={this.state.selectedValue} options={this.state.options} onChange={this.handleOptionSelected}
                clearable={false}/>
        <Stats clicks={this.state.stats.clicks} impressions={this.state.stats.impressions}/>
      </div>
    );
  }
}
export default Selector
