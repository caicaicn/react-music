import React, { Component} from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import server from "../../server/index.js";
import { setIsPlay } from "../../store/action";
import SheetList from "../../page/sheetList";
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
        this.state = {
            list: []
        }
    }
    play(){
        this.props.dispatch(setIsPlay(true))
    }

    componentDidMount(){
        if (!localStorage.getItem("recomeList")){
            server.getRecomm()
                .then(res => {
                    this.setState((state) => {
                        return {
                            list: res.result
                        }
                    })
                    localStorage.setItem("recomeList", JSON.stringify(res.result))
                })
        }else{
            this.setState((state) => {
                return {
                    list: JSON.parse(localStorage.getItem("recomeList"))
                }
            })
        }
        console.log(this.state);
        
    }
    render(){
        // console.log(this.state.list);
        
        return (
            <div className="home">
                <div className="type">
                    <Link className="music-type" to="/sheetlist" >
                        <img src={require("../../assets/img/discover/icn_playlist.png")} />
                        <h3>歌单</h3>
                    </Link>
                    <Link className="music-type" to="/rankList" >
                        <img src={require("../../assets/img/discover/icn_rank.png")} />
                        <h3>排行榜</h3>
                    </Link>
                </div>
                <h3>推荐歌单</h3>
                <SheetList list={this.state.list}></SheetList>
            </div>
        )
    }
}

export default connect(mapStateToProps, dispatch => ({
    dispatch: dispatch
}))(Main)