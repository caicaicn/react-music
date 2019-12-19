import React, { Component} from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import server from "../../server/index.js";
import { setIsPlay } from "../../store/action";
import SheetList from "../../page/sheetList";
import Banner from "../../components/banner";
import { setLocalStorage, getLocalStorage } from "../../utils/localstorage";
import "./index.css";
const mapStateToProps = (state) => {
    return {
        isPlay: state.isPlay
    }
}

class Main extends Component{
    constructor(){
        super();
        this.state = {
            recomeList: [],
            bannerList: []
        }
    }
    play(){
        this.props.dispatch(setIsPlay(true))
    }

    getBanner(){
        server.getBanner()
        .then(res => {
            console.log(res);
            this.setState({
                bannerList: res.banners
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    getLocalStorage(serverName, stateName, key){
        const value = getLocalStorage(key);

        if (value) {
            this.setState((state) => {
                return {
                    [stateName]: value
                }
            })
        } else {
            server[serverName]()
            .then(res => {
                this.setState((state) => {
                    return {
                        [stateName]: res.result || res.banners
                    }
                })
                setLocalStorage(key, res.result || res.banners)
            })
        }
    }

    init(){
        this.getLocalStorage('getRecomm', 'recomeList', 'recomeList')
        this.getLocalStorage('getBanner', 'bannerList', 'bannerList')
    }

    componentDidMount(){
        this.init();
    }

    render(){
        const { bannerList } = this.state;
        return (
            <div className="home">
                <section className={bannerList.length > 0 ? 'banner' : ''}>
                    {
                        bannerList.length > 0 && <Banner bannerList={bannerList} interval={1000}></Banner>
                    }
                </section>
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
                <SheetList list={this.state.recomeList}></SheetList>
            </div>
        )
    }
}

export default connect(mapStateToProps, dispatch => ({
    dispatch: dispatch
}))(Main)