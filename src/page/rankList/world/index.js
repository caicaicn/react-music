import React from "react";
import { connect } from "react-redux";
import "./index.css";

const worldPage = (props) => {
    const { childClick, list } = props;
    return (
        <div className="world-list">
            {
                list.length > 0 && list.map((item, index) => {
                    return (
                        <div onClick={() => childClick(item.id)} className="item" key={ index }>
                            <div className="top">
                                <img src={item.coverImgUrl} />
                                <div className="i-t">{item.updateFrequency}</div>
                            </div>
                            <p>{item.name}</p>
                        </div>
                    )
                })
            }
            
        </div>
    )
}   

export default connect()(worldPage);