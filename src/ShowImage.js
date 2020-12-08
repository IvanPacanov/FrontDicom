import React, {Component} from "react";

var xhr;
class ShowImage extends Component{
    constructor(props){
        super(props);
        this.Image ={
            ImageByte: []
        }
        
        this.state ={series: []};
        this.requestForImage = this.requestForImage.bind(this);
        this.createSeries = this.createSeries.bind(this);
        this.processRequest = this.processRequest.bind(this);
    }

    requestForImage(text){
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

    
        this.LoginModel.nameFolder = text.nameFolder;
        this.LoginModel.Id = text.textName;
        xhr.send(JSON.stringify({"ID":this.LoginModel.ID}));
        xhr.addEventListener("readystatechange", this.processRequest, false); 
        
    }   

    processRequest(){
        if(xhr.readyState === 4 && xhr.status ===200){
          //var response = JSON.parse(xhr.responseText);
            if(xhr.responseText !== 'null' || xhr.responseText !== "")
            {
                var arr_from_json = JSON.parse(xhr.responseText);
                var itemArray = this.state.series;
                arr_from_json.forEach(val => {
                    itemArray.unshift({
                        text: val.Id,
                        nameFolder: val.NameFolder,
                        key: Date.now()
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
return <li key={item.key} onClick={this.requestForImage}>{item.text}</li>
}

    render(){
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createSeries);
        return (
            <div className="theSeries">
                {listItems}
            </div>
            
        )
    }
}
export default ShowImage;