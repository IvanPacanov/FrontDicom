import React, {Component} from "react";

var xhr;
class ListOfSeries extends Component{
    constructor(props){
        super(props);
        this.Image ={
            Id: "",
            NameFolder: "",
            LoginModel: ""
                }
        
        this.state ={Images: []};
        this.requestForImage = this.requestForImage.bind(this);
        this.createItems = this.createItems.bind(this);
        this.processRequest = this.processRequest.bind(this);
    }

    requestForImage(text){
        xhr = new XMLHttpRequest();
        xhr.open("POST", "https://192.168.1.100:5000/api/PACS/Image");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            console.log('test');
            if (xhr.readyState === 4 && xhr.status === 'success') {
                console.log('test');
                alert(xhr.responseText);
            }
        };

    
        const words = text.currentTarget.innerText.split('\\');
        this.Image.NameFolder = words[0];
        this.Image.Id = words[2];
        this.Image.LoginModel = this.props.loginModel;
        xhr.send(JSON.stringify({"Id":this.Image.Id, 
        "NameFolder":this.Image.NameFolder,
        "LoginModel":{
            "Ip_address": this.Image.LoginModel.ip_address.value, 
            "Port_server": this.Image.LoginModel.port_server.value, 
            "Aet_server": this.Image.LoginModel.aet_server.value, 
            "Port_client": this.Image.LoginModel.port_client.value, 
            "Aet_client": this.Image.LoginModel.aet_client.value
        }}));
        xhr.addEventListener("readystatechange", this.processRequest, false); 
        
    }   

    processRequest(){
        if(xhr.readyState === 4 && xhr.status ===200){
          //var response = JSON.parse(xhr.responseText);
            if(xhr.responseText !== 'null' || xhr.responseText !== "")
            {
                var arr_from_json = JSON.parse(xhr.responseText);
                var itemArray = this.state.Images;
                itemArray = arr_from_json;           
            }
            console.log(itemArray);
            this.setState({
                Images: itemArray
            });
        }
    }




    createItems(item)
{
return <li key={item.key} onClick={this.requestForImage}>{item.nameFolder}\\{item.text}</li>
}

    render(){
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createItems);
        return (
            <div className="theSeries">
                {listItems}
                <h1>Zjęcie</h1>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <img src={`data:image/jpeg;base64,${this.state.Images}`} alt="Zdjęcie" style={{width: 800, height: 800}}></img>
            </div>
            </div>
            
        )
    }
}
export default ListOfSeries;