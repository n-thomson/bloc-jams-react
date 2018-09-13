import React, {Component} from 'react';
import PlayerBar from './PlayerBar';
import albumData from './../data/albums'
import './album.css';
import {Table} from 'react-bootstrap';

class Album extends Component{
  constructor(props){
    super(props);
    const album = albumData.find(album => album.slug === this.props.match.params.slug);
    this.state = {
      album : album,
      currentSong : album.songs[0],
      isPlaying : false,
      hoverSong : null,
      currentTime : 0,
      duration : album.songs[0].duration
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount(){
    this.eventListeners = {
      timeupdate : (e) => {
        this.setState({currentTime : this.audioElement.currentTime});
      },
      durationchange : (e) => {
        this.setState({duration : this.audioElement.duration});
      }
    }
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange)
  }

  componentWillUnmount(){
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play(){
    this.audioElement.play();
    this.setState({isPlaying : true});
  }

  pause(){
    this.audioElement.pause();
    this.setState({isPlaying : false});
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong:song});
  }

  handleSongClick(song){
    const isSameSong = this.state.currentSong === song;
    if(this.state.isPlaying && isSameSong){
      this.pause();
    } else {
      if(!isSameSong){
        this.setSong(song);
      }
      this.play();
    }
  }

  handleIcon(song, index){
    if ((this.state.currentSong === song) && (this.state.isPlaying)){
      return <i className = 'fas fa-pause-circle'/>
    } else if ((this.state.hoverSong === song)){
      return <i className = 'fas fa-play-circle'/>
    } else {
      return <span>{`${index+1}`}</span>
    }
  }

  onMouseEnter(song){
    this.setState({hoverSong: song})
  }

  onMouseLeave(song){
  this.setState({hoverSong : null})
  }

  handlePrevClick(){
    const currentIndex = this.state.album.songs.findIndex(song => (this.state.currentSong === song));
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick(){
    const currentIndex = this.state.album.songs.findIndex(song => (this.state.currentSong === song));
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e){
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({currentTime : this.audioElement.currentTime});
  }

  handleVolumeChange(e){
    this.audioElement.volume = e.target.value;
  }

  formatTime(time){
    if (!time.isNaN){
      const min = parseInt(time/60);
      const sec = Math.round(time%60);
      return ((sec<10) ? `${min}:0${sec}` : `${min}:${sec}`)
    } else {
      return "-:--";
    }
  }

  render(){
    return(
      <section className = 'album'>
        <section id = 'album-info'>
          <img id = 'album-cover-art' src={this.state.album.albumCover} alt = {this.state.album.title}/>
          <div className = 'album-details'>
            <h2 id ='album-title'> {this.state.album.title} </h2>
            <h3 className = 'artist'> {this.state.album.artist} </h3>
            <div id = 'release-info'> {this.state.album.releaseInfo} </div>
          </div>
        </section>
        <Table id ='song-list' responsive>
          <colgroup>
            <col id = 'song-number-column'/>
            <col id = 'song-title-column'/>
            <col id = 'song-duration-column'/>
          </colgroup>
          <tbody>
            {this.state.album.songs.map((song, index) => (
              <tr className = 'song' key = {index} onClick = {() => this.handleSongClick(song)} onMouseEnter = {() => this.onMouseEnter(song)}  onMouseLeave = {() => this.onMouseLeave(song)} >
                <td>{this.handleIcon(song,index)}</td>
                <td>{song.title}</td>
                <td>{this.formatTime(song.duration)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PlayerBar
          isPlaying = {this.state.isPlaying}
          currentSong = {this.state.currentSong}
          currentTime = {this.state.currentTime}
          duration = {this.state.duration}
          handleSongClick = { () => this.handleSongClick(this.state.currentSong)}
          handlePrevClick = {() => this.handlePrevClick()}
          handleNextClick = {() => this.handleNextClick()}
          handleTimeChange = {(e) => this.handleTimeChange(e)}
          handleVolumeChange = {(e) => this.handleVolumeChange(e)}
          formatTime = {(time) => this.formatTime(time)}
        />
      </section>
    )
  }
}

export default Album;
