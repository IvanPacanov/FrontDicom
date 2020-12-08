import React, {Component} from "react";
import {
    Route,
    HashRouter
} from "react-router-dom";
import IPAddressContainer from "./IPAddressContainer";
import "./index.css"

class Main extends Component{
    render() {
        return(
            <HashRouter>
                <div>
                    <div className="content">
                        <Route path="/" component={IPAddressContainer}/>     
                    </div>
                </div>
            </HashRouter>
        )
    }
}
export default Main;