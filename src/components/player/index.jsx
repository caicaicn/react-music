import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { setIsPlay } from "../../store/action";
import MiniPlayer from "./miniPlay";
import server from "../../server/index";

const mapStateToProps = (state) => {
    return {
        currentMusic: state.currentMusic,
        isPlay: state.isPlay,
        playList: state.playList,
        showPlayer: state.showPlayer
    }
}

class Main extends Component {
    constructor() {
        super();
        this.state = {
            audioEl:""
        }
    }
    componentDidMount(){
        // this.audioEl = ReactDOM.findDOMNode(this.refs.audioEl)
        this.audioEl = this.refs.audioEl;
    }
    // 暂停
    play(){
        this.props.dispatch(setIsPlay(!this.props.isPlay ))
    }
    
    // 播放
    toggle() {
        setTimeout(() => {
            this.props.isPlay ? this.audioEl.play() : this.audioEl.pause();
        }, 0);
    }

    render() {
        this.toggle()
        let currentMusic = this.props.currentMusic;
        return (
            <div className="player">
                {this.props.showPlayer && <MiniPlayer isPlay={this.props.isPlay} musicImg={currentMusic} play={this.play.bind(this)}></MiniPlayer>}
                <audio ref="audioEl" src={`https://music.163.com/song/media/outer/url?id=${
                    currentMusic.id
                    }.mp3`}></audio>
            </div>
        )
    }
}

export default connect(mapStateToProps, dispatch => ({
    dispatch: dispatch
}))(Main)