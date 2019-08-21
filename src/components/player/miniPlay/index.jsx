import React, { Component } from "react";
import "./index.css";

class Main extends Component {
    render(){
        return (
            <div className="mini-player">
                <img className="header-img" src={this.props.musicImg.image} />
                <p>
                    <div>{this.props.musicImg.name}</div>
                    <div className="music-singer">{this.props.musicImg.singer}</div>
                </p>
                <p onClick={this.props.play} className={`iconfont ${!this.props.isPlay ? 'icon-bofang' : "icon-zanting"}`}></p>
            </div>
        )
    }
}

export default Main;