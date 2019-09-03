import React, { Component } from "react";
import "./index.css";

class Main extends Component {
    render(){
        const { setIsFull, musicImg, play, isPlay } = this.props;
        return (
            <div className="mini-player">
                <img onClick={() => setIsFull(true)} className="header-img" src={musicImg.image} />
                <div className="music-info">
                    <div>{musicImg.name}</div>
                    <div className="music-singer">{musicImg.singer}</div>
                </div>
                <p onClick={() => play()} className={`iconfont ${!isPlay ? 'icon-bofang' : "icon-zanting"}`}></p>
            </div>
        )
    }
}

export default Main;