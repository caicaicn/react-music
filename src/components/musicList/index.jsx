import React, { Component } from "react";

import "./index.css";
class Main extends Component{
    constructor(){
        super();
    }
    shouldComponentUpdate(nextProps){
        const { tracks, currentIndex } = this.props;
        return !tracks || tracks.length != nextProps.tracks.length || currentIndex != nextProps.currentIndex
    }
    selectMusic(list, index){
        this.props.itemOnclick(list, index)
    }
    componentDidMount(){
        let root = document.getElementById("root"),
            distance = window.innerHeight + 1;
        root.addEventListener("scroll", () => {
            if (this.refs.musicList){
                let bottom = this.refs.musicList.getBoundingClientRect().bottom;
                
                if (bottom < distance){
                    // 加载更多
                    this.props.loadMore()
                }
            }
        })
    }

    render(){
        
        const { tracks, itemOnclick, currentIndex } = this.props
        return(
            <div ref='musicList' className="music-list">
                {
                    tracks && tracks.length > 0 && tracks.map((item, index) => {
                        return (
                            <div key={index} 
                            onClick={this.selectMusic.bind(this, tracks, index)} 
                            className={`music-item ${ currentIndex == index ? 'music-item-active' : ''}`}
                            >
                                <span>{index + 1}</span>
                                <div className="music-des">
                                    <h4>{item.name}</h4>
                                    <p>{item.singer}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <p className="no-more">没有更多</p>
            </div>
        )
    }
}

export default Main;