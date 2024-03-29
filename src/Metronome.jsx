import React from 'react';
import logo from './logo.svg';
import dial from './button.png';

import './Metronome.css';

// sounds
import click1 from './click1.wav';
import click2 from './click2.wav';
import clack1 from './clack1.mp3';

export default class Metronome extends React.Component {

  click1 = new Audio(click1);
  click2 = new Audio(click2);
  clack1 = new Audio(clack1);

  state = {
    playing: false,
    count: 0,
    bpm: 100,
    beatsPerMeasure: 4,
  }

  // ui methods
  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    if (count % beatsPerMeasure === 0) {
      this.clack1.play();
    } else {
      this.click1.play();
    }

    this.setState( state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
    this.setState({playing: false});
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
        },
        this.playClick
      );
      
    }
    
  };

  handleMeasureChange = (event) => {
    const measure = event.target.value;
    
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        beatsPerMeasure: measure,
        count: 0
      });
    } else {
      this.setState({beatsPerMeasure: measure})
    }
  }

  handleBpmChange = (event) => {
    const bpm = event.target.value;
    
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        bpm,
        count: 0
      });
    } else {
      this.setState({bpm})
    }
  }

  render() {
    const { playing, bpm, count, beatsPerMeasure } = this.state;
// handleMeasureChange
  const buttonValue = playing ? '■' : '▶'
  const rotate = (count / beatsPerMeasure) * 360;
  
    return (
      <div
        style={{
          // this is where the transforms/rotations occur
          boxShadow: (`0px 4px 20px 0px black, -5px -5px 180px 20px ${count % 2 === 0 ? 'red' : 'blue'}`),
        }}
        className="metronome"
      >
        <div className="controls">
          <label>measure</label>
          <input
            className="measure"
            value={beatsPerMeasure}
            onChange={this.handleMeasureChange.bind(this)}  
          />
          <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input
              type="range"
              min="60"
              max="240"
              value={bpm}
              onChange={this.handleBpmChange.bind(this)}
              />
          </div>
        </div>
        <button
          onClick={this.startStop}
          >{`${count }` + buttonValue}</button>
        <img
          alt='knob'
          className="knob"
          // this is where the transforms/rotations occur
          style={{
            transform: `rotateZ(${rotate}deg)`,
          }}
          src={dial}
          />
    <hr></hr>
      </div>
    );
  }
}
