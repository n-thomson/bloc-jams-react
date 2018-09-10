import React, {Component} from 'react';
import albumData from './../data/albums'

class Album extends Component{
  constructor(props){
    super(props);
    const album = albumData.find(album => album.slug === this.props.match.params.slug);
    this.state = {
      album : album,
      currentSong : album.songs[0],
      isPlaying : false,
      hoverSong : null
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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
      return <span className = 'ion-md-pause'></span>
    } else if ((this.state.hoverSong === song)){
      return <span className = 'ion-md-play'></span>
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
        <table id ='song-list'>
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
                <td>{song.duration}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}

export default Album;
