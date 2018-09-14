import React, {Component} from 'react';
import './playerbar.css';
import {Button} from 'react-bootstrap';

class PlayerBar extends Component{
  render(){
    return(
      <section id = 'playerbar'>
        <div id = 'buttons'>
          <Button id = 'previous' bsSize="xsmall" onClick = {this.props.handlePrevClick}>
            <i className = 'fas fa-step-backward'/>
          </Button>
          <Button id = 'play-pause' bsSize="xsmall" onClick = { this.props.handleSongClick}>
            <i className = {this.props.isPlaying ? 'fas fa-pause' : 'fas fa-play'}/>
          </Button>
          <Button id = 'next' bsSize="xsmall" onClick = {this.props.handleNextClick}>
            <i className = 'fas fa-step-forward'/>
          </Button>
        </div>
        <section id = 'time-control'>
          <span className = 'current-time'>{this.props.formatTime(this.props.currentTime)}</span>
          <input
            type ='range'
            className = 'seek-bar'
            value = {(this.props.currentTime/this.props.duration) || 0}
            max = '1'
            min = '0'
            step = '0.01'
            onChange = {this.props.handleTimeChange}
          />
          <span className = 'total-time'>{this.props.formatTime(this.props.duration)}</span>
        </section>
        <section id = 'volume-control'>
          <i className = 'fas fa-volume-down'/>
          <input
            type ='range'
            className = 'seek-bar'
            max = '1'
            min = '0'
            step = '0.1'
            onChange ={this.props.handleVolumeChange}
          />
          <i className = 'fas fa-volume-up'/>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
