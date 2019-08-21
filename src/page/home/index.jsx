import React, { Component} from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import server from "../../server/index.js";
import { setIsPlay } from "../../store/action";
import "./index.css";

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        isPlay: state.isPlay
    }
}


class Main extends Component{
    constructor(){
        super();
    }
    play(){
        this.props.dispatch(setIsPlay(true))
    }
    render(){
        return (
            <div className="music-home">
                <Link className="music-type" to="/sheetlist" >
                    <img src={require("../../assets/img/discover/icn_playlist.png")} />
                    <h3>歌单</h3>
                </Link>
                <Link className="music-type" to="/toplist" >
                    <img src={require("../../assets/img/discover/icn_rank.png")} />
                    <h3>排行榜</h3>
                </Link>
            </div>
        )
    }
}

export default connect(mapStateToProps, dispatch => ({
    dispatch: dispatch
}))(Main)