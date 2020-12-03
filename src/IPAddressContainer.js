import React, {Component} from "react";
import axios from 'axios'


var xhr;

class IPAddressContainer extends Component{
    constructor(props)
    {
        super(props);
        this.SendInfo = this.SendInfo.bind(this);
        this.test ="";
        this.LoginModel ={
            ip_address: "",
            port_server:"",
            aet_server: "",
            port_client: "",
            aet_client: ""
            
        };
      
        this.processRequest = this.processRequest.bind(this);
    }
    SendInfo(e){
        xhr = new XMLHttpRequest();
        xhr.open("POST", "https://192.168.1.104:5000/api/PACS/move");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            console.log('test');
            if (xhr.readyState === 4 && xhr.status === 'success') {
                console.log('test');
                alert(xhr.responseText);
            }
        };

       // test = JSON.stringify(this.LoginModel, (key, value) =>
        // typeof value === 'string'
        //   ? value // return value * 2 for numbers
        //   : undefined     // return everything else unchanged
        // );
      this.test=JSON.stringify({
        "Ip_address": this.LoginModel.ip_address.value, 
        "Port_server": this.LoginModel.port_server.value, 
        "Aet_server": this.LoginModel.aet_server.value, 
        "Port_client": this.LoginModel.port_client.value, 
        "Aet_client": this.LoginModel.aet_client.value
    });
        xhr.send(JSON.stringify({
            "Ip_address": this.LoginModel.ip_address.value, 
            "Port_server": this.LoginModel.port_server.value, 
            "Aet_server": this.LoginModel.aet_server.value, 
            "Port_client": this.LoginModel.port_client.value, 
            "Aet_client": this.LoginModel.aet_client.value
        }));
      //  xhr.send(JSON.stringify(this.LoginModel));
        xhr.addEventListener("readystatechange", this.processRequest, false); 
        
    }

    componentDidMount(){
        // xhr = new XMLHttpRequest();
        // xhr.open("POST", "https://192.168.1.100:5000/api/PACS/move");
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.onreadystatechange = function () {
        //     console.log('test');
        //     if (xhr.readyState === 4 && xhr.status === 'success') {
        //         console.log('test');
        //         alert(xhr.responseText);
        //     }
        // };
        // xhr.send(JSON.stringify({"ID":"01"}));
        
        // xhr.addEventListener("readystatechange", this.processRequest, false);  
    
    }

    processRequest(){
        if(xhr.readyState === 4 && xhr.status ===200){
          //var response = JSON.parse(xhr.responseText);

        this.setState({
            test: xhr.responseText
        });
        }
    }
    render(){
        return(
        <div className="ipAddresContainer">
            <div className="header">
                <form>
                    <input placeholder="Podaj IP Servera" ref={(ip) => this.LoginModel.ip_address = ip}/>
                </form>
                <p></p>
                <form> 
                    <input placeholder="Podaj Port Servera" ref={(port) => this.LoginModel.port_server = port}/>
                </form>
                <p></p>
                <form>
                    <input placeholder="Podaj AET Servera" ref={(AET) => this.LoginModel.aet_server = AET}/>
                </form>
                <p></p>
                <form> 
                    <input placeholder="Podaj Port Klienta" ref={(port) => this.LoginModel.port_client = port}/>
                </form>
                <p></p>
                <form> 
                    <input placeholder="Podaj AET Klienta" ref={(AET) => this.LoginModel.aet_client = AET}/>
                </form>
                
            
                <form onClick={this.SendInfo}> 
                <button type="button">Połącz</button>   
                </form> 
            </div>
        </div>
        );
    }
}

export default IPAddressContainer;