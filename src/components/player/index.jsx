import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { setIsPlay, setNext } from "../../store/action";
import MiniPlayer from "./miniPlay";
import FullPlay from "./fullPlay";
import server from "../../server/index";

const mapStateToProps = (state) => {
    return {
        currentMusic: state.currentMusic,
        isPlay: state.isPlay,
        playList: state.playList,
        showPlayer: state.showPlayer
    }
}

//格式化时间
function formatTime(time) {//默认获取的时间是时间戳改成我们常见的时间格式
    //分钟
    var minute = time / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    var second = time % 60;
    var seconds = parseInt(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var allTime = "" + minutes + "" + ":" + "" + seconds + ""
    return allTime;
}

class Main extends Component {
    constructor() {
        super();
        this.state = {
            audioEl:"",
            isFull: false,
            time: {
                currentTime: "00:00",
                bufferPercent: 0,
                totalTime: "00:00",
                currentTimePercent: 0
            }
        }
    }
    componentDidMount(){
        // this.audioEl = ReactDOM.findDOMNode(this.refs.audioEl)
        this.audioEl = this.refs.audioEl;
        this.audioEl.addEventListener("timeupdate", () => {
            let time;
            try {
                time = {
                    currentTime: formatTime(this.audioEl.currentTime),
                    bufferPercent: (this.audioEl.buffered.end(this.audioEl.buffered.length - 1)) / (this.props.currentMusic.duration) * 100,
                    totalTime: formatTime(this.props.currentMusic.duration),
                    currentTimePercent: this.audioEl.currentTime / this.props.currentMusic.duration * 100
                }
            } catch (error) {
                time = {
                    currentTime: "00:00",
                    bufferPercent: 0,
                    totalTime: "00:00",
                    currentTimePercent: 0
                };
            }
            this.setState(() => ({ time }))
        })
    }

    componentWillReceiveProps(){
        this.toggle()
    }

    componentWillUnmount(){
        this.setIsFull(false);
    }

    setIsFull(boolean){
        this.setState({ isFull: boolean})
    }

    // 暂停
    play(){
        this.props.dispatch(setIsPlay(!this.props.isPlay ))
    }
    
    // 播放
    toggle() {
        setTimeout(() => {
            if (this.props.isPlay ){
                this.audioEl.play()
                .catch(error => {
                    this.props.dispatch(setNext("next"))
                })
            }else{
                this.audioEl.pause();
            }
        }, 0);
    }

    render() {

        let currentMusic = this.props.currentMusic;

        const miniPlayer = <MiniPlayer 
        isPlay={this.props.isPlay} 
        musicImg={currentMusic} 
        play={this.play.bind(this)} 
        setIsFull={this.setIsFull.bind(this)}
        >
        </MiniPlayer>
        
        const fullPlay = <FullPlay 
        title={currentMusic} 
        time={this.state.time}
        setIsFull={this.setIsFull.bind(this)}
        >
        </FullPlay>
        
        return (
            <div className="player">
                {
                    this.props.showPlayer ? this.state.isFull ? fullPlay: miniPlayer : null
                }
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