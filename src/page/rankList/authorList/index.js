import React from "react";
import { connect } from "react-redux";
import "./index.css";

const authorList = (props) => {
    const { childClick, list } = props;
    
    return (
        <div className="author-list">
            {
                list.map((item, index) => {
                    return (
                        <div className="item" onClick={() => childClick(item.id) } key={index}>
                            <div className="left">
                                <img src={item.coverImgUrl} />
                                <div className="c-tips">每天更新</div>
                            </div>
                            <div className="contain">
                                {
                                    item.tracks.map((t, i) => {
                                        return (
                                            <p key={i}>{t.first}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
                
            }
        </div>
    )
} 

export default connect()(authorList);
