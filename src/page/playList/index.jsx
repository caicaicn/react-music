import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import server from "../../server/index";
import { createPlayListDetail } from '../../utils/playlist';
import Navgate from "../../components/navgate";
import MusicList from "../../components/musicList"
import { setPlayMusic } from "../../store/action";
class Main extends Component {
    constructor(){
        super();
        this.state = {
            id: "",
            list: []
        }
    }
    componentDidMount(){
        this.init();
    }

    init(){
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            // this.setState({
            //     list: JSON.parse(localStorage.getItem("list"))
            // })
            server.getPlayListDetail({ id })
            .then(res => {
                this.setState({
                    list: createPlayListDetail(res.playlist)
                })
                // localStorage.setItem("list", JSON.stringify(createPlayListDetail(res.playlist)))
            })
            .catch(error => {
                console.log(error);
            })
        }else{
            this.props.history.push("/")
        }
    }

    playCountFilter(val){
        return val > 10000 ? Math.ceil(val / 10000) + "万" : val;
    }

    selectMusic(list, index){
        this.props.setPlayMusic(list, index);
    }

    render(){
        let headerStyle = { 
            'backgroundImage': `url(${this.state.list.coverImgUrl})`,
        }
        const {
            coverImgUrl,
            avatarUrl,
            name,
            nickname,
            playCount,
            tracks
        } = this.state.list
        return(
            <div className="play-list">
                <div style={headerStyle} className="play-list-bg"></div>
                <Navgate title={name}></Navgate>
                <header >
                    <div className="play-header-img">
                        <img src={coverImgUrl} />
                        <span className="iconfont icon-icon-"> {this.playCountFilter(playCount)}</span>
                    </div>
                    <div className="play-des">
                        <h3>{name}</h3>
                        <div className="play-user">
                            <img src={ avatarUrl }/>
                            <span>{ nickname }</span>
                        </div>
                    </div>
                </header>
                <MusicList currentIndex={this.props.currentIndex} tracks={tracks} itemOnclick={this.selectMusic.bind(this)}></MusicList>
            </div>
        )
    }
}

export default connect( state => {
    return {
        currentIndex: state.currentIndex
    }
}, { setPlayMusic })(Main);
