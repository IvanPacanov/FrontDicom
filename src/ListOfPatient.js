import React, {Component} from "react";
import ListOfSeries from "./ListOfSeries";

var xhr;
class ListOfPatient extends Component{
    constructor(props){
        super(props);
        this.Patient ={
            ID: "",
            LoginModel:this.props.loginModel
        }
        this.state ={series: []};
        this.requestForSeries = this.requestForSeries.bind(this);
        this.createSeries = this.createSeries.bind(this);
        this.processRequest = this.processRequest.bind(this);
    }
    selectedItem(text){
        this.state.series.filter(function(item){
            return (item.text === text);
        });

    }
    requestForSeries(text){
        xhr = new XMLHttpRequest();
        xhr.open("POST", "https://192.168.1.100:5000/api/PACS/Series");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            console.log('test');
            if (xhr.readyState === 4 && xhr.status === 'success') {
                console.log('test');
                alert(xhr.responseText);
            }
        };

    
        this.Patient.ID = text.currentTarget.innerText;
        xhr.send(JSON.stringify({"ID":this.Patient.ID, "LoginModel":{
            "Ip_address": this.Patient.LoginModel.ip_address.value, 
            "Port_server": this.Patient.LoginModel.port_server.value, 
            "Aet_server": this.Patient.LoginModel.aet_server.value, 
            "Port_client": this.Patient.LoginModel.port_client.value, 
            "Aet_client": this.Patient.LoginModel.aet_client.value
        }}));
        xhr.addEventListener("readystatechange", this.processRequest, false); 
        
    }   

    processRequest(){
        if(xhr.readyState === 4 && xhr.status ===200){
          //var response = JSON.parse(xhr.responseText);
            if(xhr.responseText !== 'null' || xhr.responseText !== "")
            {
                var arr_from_json = JSON.parse(xhr.responseText);
                var itemArray = [];
                arr_from_json.forEach(val => {
                    itemArray.unshift({
                        text: val.Id,
                        nameFolder: val.NameFolder
                    });
                })               
            }
            console.log(itemArray);
            this.setState({
                series: itemArray
            });
        }
    }




createSeries(item)
{
    return <li key={item.key} onClick={this.requestForSeries} nameFolder={item.nameFolder} textName={item.text}>{item.text}</li>
}

    render(){
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createSeries);
        return (
            <div className="theList">
                {listItems}
                <h1>Seria badań</h1>  
                <ListOfSeries entries={this.state.series}
                            requestForImage={this.selectedItem} 
                            loginModel = {this.Patient.LoginModel}/>
            </div>
            
        )
    }
}
export default ListOfPatient;