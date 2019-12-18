import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./index.css";
import Nav from "../../components/navgate";
import AuthorList from "./authorList";
import WorldList from "./world";
import server from "../../server/index";


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        isPlay: state.isPlay,
        currentIndex: state.currentIndex
    }
}


const RankListPage = (props) => {

    const [ topList, setTopList ] = useState([]),
        { isPlay, currentIndex } = props;
    let world = [],
        authList = [];

    const init = () => {
        if (!localStorage.getItem("topList")){
            server.getTopList()
            .then(res => {
                setTopList(res.list);

                // 开发用
                localStorage.setItem("topList", JSON.stringify(res.list));
            })
            .catch(error => {
                console.log(error)
            })
        }else{
            // 开发用
            let list = JSON.parse(localStorage.getItem("topList"));
            console.log(list);
            setTopList(list);
        }
        
    }

    const goPlayList = (id) => {
        props.history.push(`/playlist/${id}`);
    }

    useEffect(() => {
        init()
    }, [])


    topList.forEach((item) => {
        item.tracks.length > 0 ? world.push(item) : authList.push(item);
    })

    return (
        <div className="rank-list">
            <Nav title="排行榜"></Nav>
            <div className="list">
                <h3>官方榜单</h3>
                <AuthorList childClick={goPlayList} list={ world }></AuthorList>
            </div>
            <div className="list">
                <h3>全球榜</h3>
                <WorldList childClick={goPlayList} list={authList }></WorldList>
            </div>
        </div>
    )
}

export default connect()(RankListPage)