import React, {Component} from "react";
import "./index.css"
import "./PatientList.css";
import ListOfPatient from "./ListOfPatient";

var xhr;

class IPAddressContainer extends Component{
    constructor(props)
    {
        super(props);
        this.SendInfo = this.SendInfo.bind(this);
        this.state ={items: [],
            showResults: true};
        this.props.history.push("/");
        this.LoginModel ={
            ip_address: "",
            port_server:"",
            aet_server: "",
            port_client: "",
            aet_client: ""
            
        };
        //this.
        this.processRequest = this.processRequest.bind(this);
    }
    SendInfo(e){
        xhr = new XMLHttpRequest();
        xhr.open("POST", "https://192.168.1.100:5000/api/PACS/Login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            console.log('test');
            if (xhr.readyState === 4 && xhr.status === 'success') {
                console.log('test');
                alert(xhr.responseText);
            }
        };

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
        xhr.addEventListener("readystatechange", this.processRequest, false); 
        
    }   
    selectedItem(text){
        this.state.items.filter(function(item){
            return (item.text === text);
        });

    }
    processRequest(){
        if(xhr.readyState === 4 && xhr.status ===200){
          //var response = JSON.parse(xhr.responseText);
            if(xhr.responseText !== 'null' || xhr.responseText !== "")
            {
                var arr_from_json = JSON.parse(xhr.responseText);
                var itemArray = this.state.items;
                arr_from_json.forEach(val => {
                    itemArray.unshift({
                        text: val.ID,
                        key: Date.now()
                    });
                }) 
                this.setState({
                    showResults: false
                });              
            }
            console.log(itemArray);
            this.setState({
                items: itemArray
            });
        }
    }
    render(){
        return(
            <div className="todoListMain">
                <div className="header"
                style={{ display: this.state.showResults ? "block" : "none" }}>
                <h1>Parametry połączenia</h1>
                <ul>
                    <input placeholder="Podaj IP Servera" ref={(ip) => this.LoginModel.ip_address = ip} defaultValue="127.0.0.1"/>
                    <input placeholder="Podaj Port Servera" ref={(port) => this.LoginModel.port_server = port} defaultValue="10100"/>
                    <input placeholder="Podaj AET Servera" ref={(AET) => this.LoginModel.aet_server = AET} defaultValue="ARCHIWUM"/>
                    <input placeholder="Podaj Port Klienta" ref={(port) => this.LoginModel.port_client = port} defaultValue="10104"/>
                    <input placeholder="Podaj AET Klienta" ref={(AET) => this.LoginModel.aet_client = AET} defaultValue="KLIENTL"/>
                    
                <button type="button" onClick={this.SendInfo}>Połącz</button>  
                </ul> 
                </div>
                <div
                style={{ display: this.state.showResults ? "none" :"block" }}>
                    
                <h1>Lista Pacjentów</h1>  
                <ListOfPatient entries={this.state.items}
                            requestForSeries={this.selectedItem} 
                            loginModel ={this.LoginModel}/>
                </div>
                
            </div>       
        );
    }
}

export default IPAddressContainer;