import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import server from "../../server/index";
import "./index.css";
import Navgate from "../../components/navgate"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            more: true
        }
        this.sheetlist = React.createRef();
    }

    loadMore(){
        let params = { order: true, limit: 20 },
            { list, more } = this.state;
        
        if (!more) return false;
        server.getPlayList(params)
        .then(res => {
            const { playlists, more } = res;

            list.push(...playlists)

            this.setState((state) => {
                return {
                    list,
                    more
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    scrollFun(){
        if (this.sheetlist) {
            let distance = window.innerHeight + 1;
            let bottom = this.sheetlist.current.getBoundingClientRect().bottom;
            if (bottom < distance) {
                this.loadMore()
            }else{
                
            }
        }
    }

    componentDidMount(){
        this.loadMore();
        let root = document.getElementById("root");
        root.addEventListener("scroll", this.scrollFun.bind(this), false)
    }
    componentWillUnmount(){
        let root = document.getElementById("root");
        root.removeEventListener("scroll", this.scrollFun.bind(this), false)
    }
    // 跳转到playlist
    goPlaylist(id){
        this.props.history.push(`/playlist/${id}`)
    }

    countFilter(val){
        if (val > 9999) {
            return `${parseInt(val / 10000)}万`
        } else {
            return val;
        }
    }

    render() {
        const { list, more } = this.state;
        const { location } = this.props;
        
        return (
            <div ref={this.sheetlist} className={location && location.pathname == "/sheetlist" ? 'p-t' : ''}>
                {
                    location && location.pathname == "/sheetlist" && <Navgate title="歌单"></Navgate>
                }
                <div className="sheet-list">
                    {
                        list.map((item, index) => {
                            return (
                                <div onClick={this.goPlaylist.bind(this, item.id)} className="sheet-item" key={index}>
                                    <img src={item.coverImgUrl} />
                                    <div className="item-des">{item.name}</div>
                                    <div className="counter iconfont icon-icon-"> {this.countFilter(item.playCount)} </div>
                                </div>
                            )
                        })
                    }
                    {
                        !more && <p style={{ "textAlign": 'center', 'padding': "10px", 'color': "#999" }}>没有更多</p>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Main);