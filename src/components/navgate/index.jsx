import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./index.css";

class Main extends Component {
    constructor(){
        super();
    }

    render() {
        const { title, history } = this.props;
        return (
            <div className="navgate">
                <button onClick={history.goBack} className="iconfont icon-fanhui"></button>
                <span>{ title }</span>
            </div>
        )
    }r
}

export default withRouter(Main);