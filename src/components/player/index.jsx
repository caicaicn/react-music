import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { setIsPlay, setNext } from "../../store/action";
import MiniPlayer from "./miniPlay";
import FullPlay from "./fullPlay";
import server from "../../server/index";
import { formatTime, initPlayerTime } from "../../utils/player";
let timer = null;


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
            audioEl:"",
            isFull: false,
            time: initPlayerTime()
        }
    }
    // 播放更新节流  避免多次渲染
    updateThrottle(time){
        return (() => {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    this.setState(() => ({ time }))
                }, 1000);
            }
        })()
    }

    // 播放更新
    timeupdate() {
        let time;
        try {
            time = {
                currentTime: formatTime(this.audioEl.currentTime),
                bufferPercent: (this.audioEl.buffered.end(this.audioEl.buffered.length - 1)) / (this.props.currentMusic.duration) * 100,
                totalTime: formatTime(this.props.currentMusic.duration),
                currentTimePercent: this.audioEl.currentTime / this.props.currentMusic.duration * 100
            }
        } catch (error) {
            time = initPlayerTime()
        }
        this.updateThrottle(time);
    }

    // 播放结束 自动播放下一首
    ended(){
        this.props.dispatch(setNext())
    }

    componentDidMount(){
        this.toggle();
        // this.audioEl = ReactDOM.findDOMNode(this.refs.audioEl)
        this.audioEl = this.refs.audioEl;
        this.audioEl.addEventListener("timeupdate", this.timeupdate.bind(this), false)
        this.audioEl.addEventListener('ended', this.ended.bind(this), false);
    }

    // react 17版本之后取消
    // componentWillReceiveProps(){
    //     this.toggle()
    // }
    shouldComponentUpdate(nextProps, nextState){
        this.toggle()
        // let isInitFlag = nextProps.currentMusic && nextProps.currentMusic.id && this.props.currentMusic && this.props.currentMusic.id && (nextProps.currentMusic.id != this.props.currentMusic.id)
        // if (!!isInitFlag) {
        //     this.setState({
        //         time: initPlayerTime()
        //     })
        //     timer = null;
            // if (timer) clearTimeout(timer)
        // } 

        // return !!nextProps.isPlay;
        return true;
    }

    componentWillUnmount(){
        this.setIsFull(false);
        this.audioEl.removeEventListener("timeupdate", this.timeupdate.bind(this), false)
        this.audioEl.removeEventListener("ended", this.ended.bind(this), false)
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
        console.log('reRender...');
        
        const { currentMusic, isPlay, showPlayer } = this.props;
        const { time, isFull } = this.state;

        const miniPlayer = <MiniPlayer 
        isPlay={isPlay} 
        musicImg={currentMusic} 
        play={this.play.bind(this)} 
        setIsFull={this.setIsFull.bind(this)}
        >
        </MiniPlayer>
        
        const fullPlay = <FullPlay 
        title={currentMusic} 
        time={time}
        setIsFull={this.setIsFull.bind(this)}
        >
        </FullPlay>
        
        return (
            <div className="player">
                {
                    showPlayer ? isFull ? fullPlay: miniPlayer : null
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