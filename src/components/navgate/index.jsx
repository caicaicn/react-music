import React, { Component } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"; // 解决孙节点获取不到路由对象的问题
import "./index.css";
import { setInitPlay } from "../../store/action.js"

const mapStateToProps = (state) => {
    return {
        currentMusic: state.currentMusic,
        isPlay: state.isPlay,
        playList: state.playList,
        showPlayer: state.showPlayer
    }
}

class Main extends Component {
    constructor(){
        super();
    }

    goBack(dispatch, history){
        console.log(111);
        dispatch(setInitPlay());
        history.goBack()
    }

    render() {
        const { title, history, dispatch } = this.props;
        return (
            <div className="navgate">
                <button onClick={this.goBack.bind(this, dispatch, history)} className="iconfont icon-fanhui"></button>
                <span>{ title }</span>
            </div>
        )
    }
}

// export default withRouter(Main);
export default connect(mapStateToProps, dispatch => ({
    dispatch: dispatch
}))(withRouter(Main))
// export default withRouter(connect(mapStateToProps, dispatch => ({
//     dispatch: dispatch
// }))(Main)