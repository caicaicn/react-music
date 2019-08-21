import React, { Component } from "react";

import "./index.css";
class Main extends Component{
    constructor(){
        super();
    }
    selectMusic(list, index){
        this.props.itemOnclick(list, index)
    }
    render(){
        const { tracks, itemOnclick, currentIndex } = this.props
        return(
            <div className="music-list">
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

            </div>
        )
    }
}

export default Main;