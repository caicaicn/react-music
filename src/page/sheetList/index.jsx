import React, { Component } from "react";
import server from "../../server/index";
import "./index.css";
import Navgate from "../../components/navgate"

class Main extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            page: 0
        }
    }
    componentDidMount(){
        // page * limit
        let params = { order: true, limit: 20, offset: 0 }
        server.getPlayList()
        .then(res => {
            this.setState((state) => {
                return {
                    list: res.playlists
                }
            })
        })
        .catch( error => {
            console.log(error);
        })
    }
    // 跳转到playlist
    goPlaylist(id){
        this.props.history.push(`/playlist/${id}`)
    }

    render() {
        let list = this.state.list;
        return (
            <div className="sheet">
                <Navgate title="歌单"></Navgate>
                <div className="sheet-list">
                    {
                        list.map((item, index) => {
                            return (
                                <div onClick={this.goPlaylist.bind(this, item.id)} className="sheet-item" key={index}>
                                    <img src={item.coverImgUrl} />
                                    <div className="item-des">{item.name}</div>
                                    <div className="counter iconfont icon-icon-"> {item.playCount} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Main;