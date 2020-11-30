import React, {Component} from "react";
import axios from 'axios'


var xhr;

class IPAddressContainer extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            ip_address: ""
        };
        this.processRequest = this.processRequest.bind(this);
    }
    componentDidMount(){
        xhr = new XMLHttpRequest();
        xhr.open("GET", "https://192.168.1.100:5000/api/PACS/tt");
        xhr.onreadystatechange = function () {
            console.log('test');
            if (xhr.readyState === 4 && xhr.status === 'success') {
                console.log('test');
                alert(xhr.responseText);
            }
        };
        xhr.send();
        
        xhr.addEventListener("readystatechange", this.processRequest, false);  
    
    }

    processRequest(){
        if(xhr.readyState === 4 && xhr.status ===200){
          //var response = JSON.parse(xhr.responseText);

          this.setState({
            ip_address: xhr.responseText
        });
        }
    }
    render(){
        return(
        <p>{this.state.ip_address}</p>
        );
    }
}

export default IPAddressContainer;