import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { setNext, setIsPlay, setPlayMusic } from "../../../store/action";
import MusicList from "../../musicList/index";


class Main extends Component {

    constructor(){
        super();
        this.state = {
            showCurrentList: false
        }
    }

    setShowCurrentList(boolean, e ){
        e.stopPropagation();
        this.setState({ showCurrentList: boolean })
    }

    render(){

        const { 
            title,
            time,
            setIsFull,
            isPlay,
            setNext,
            setIsPlay,
            setPlayMusic,
            playList,
            currentIndex
        } = this.props
        
        return (
            <div className="full-play">
                <div className="full-play-bg" style={{
                    'backgroundImage': `url(${title.image})`,
                }}></div>
                <header>
                    <button onClick={() => setIsFull(false)} className="iconfont icon-fanhui"></button>
                    <div>
                        <h4>{ title.name }</h4>
                        <p>{title.singer}</p>
                    </div>
                </header>
                <section onClick={this.setShowCurrentList.bind(this, false)}>
                    <img className={`needle ${this.props.isPlay ? '' : 'needle-active'}`} src={require("../../../assets/img/player/needle.png")}/>
                    <div className={`circle ${this.props.isPlay ? 'circle-active' : ''}`} style={{
                        'background': `url(${title.image}) no-repeat center center`,
                    }}>
                        <img className="circle-bg" src={require("../../../assets/img/player/disc.png")} alt="" />
                    </div>
                    <div className="play-info">
                        <div className="process">
                            <div className="time fl">{time.currentTime}</div>
                            <div className="time fr">{time.totalTime}</div>
                            <div className="line">
                                <div className="percent total"></div>
                                <div style={{ 'width': time.bufferPercent + "%" }} className="percent buffer"></div>
                                <div style={{ 'width': time.currentTimePercent + "%" }} className="percent current"></div>
                                <div style={{ 'left': time.currentTimePercent + "%" }} className="percent dot"></div>
                            </div>
                        </div>
                        <div className="control">
                            <div onClick={() => setNext("pre")} className="control-items iconfont icon-fast-backward"></div>
                            <div onClick={() => setIsPlay(!this.props.isPlay)} className={`control-items iconfont ${this.props.isPlay ? 'icon-poweroff-circle-fill' : 'icon-play-circle-fill'}`}></div>
                            <div onClick={() => setNext("next")} className="control-items iconfont icon-fast-forward"></div>
                            <div onClick={this.setShowCurrentList.bind(this, true) } className="control-items iconfont icon-liebiaoshunxu"></div>
                        </div>
                    </div>
                    {
                        this.state.showCurrentList && (<div className="full-music-list">
                            <MusicList tracks={playList} currentIndex={currentIndex} itemOnclick={(playList, index) => setPlayMusic(playList, index)}></MusicList>
                        </div>)
                    }
                    
                </section>
            </div>
        )
    }
}

export default connect(state => {
    return {
        isPlay: state.isPlay,
        playList: state.playList,
        currentIndex: state.currentIndex
    }
    
}, { setNext, setIsPlay, setPlayMusic })(Main);