import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone';

export default class CallListForm extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            listName: "",
            listDescription: "",
            data: []
        });

        this.handleChange = this.handleChange.bind(this);
        this.addList = this.addList.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    onDrop(acceptedFiles, rejectedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
            reader.onload = (e) => {
			// Parse data
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			// Get first worksheet 
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			// Convert array of arrays
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            // Set state
            let a = this.state.data.slice();
            a = data;
            this.setState({data: a});
		};
		if(rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        });
    }

    addList(event){
        Meteor.apply('parseExcelData', [this.state.data, this.state.listName, this.state.listDescription]);
        this.refs.listName.value = "";
        this.refs.listDescription.value = "";
        this.setState({
            listName: "",
            listDescription: "",
            data: []
        })
        event.preventDefault();
    }
    
    render(){
        return(
            <form>
                <div>
                    <div>
                        <label>Call list name:</label></div>
                    <div>
                        <input type="text" 
                            name="listName" 
                            ref="listName" 
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Description:</label>
                    </div>
                    <div>
                        <textarea className="desc" 
                            name="listDescription" 
                            ref="listDescription"
                            onChange={this.handleChange}/>
                    </div>
                    <div className="dropzone">
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            <p>Drag and drop a file here, or click to select file to upload.</p>
                        </Dropzone>
                    </div>
                    <button onClick={this.addList}>Add List</button>
                </div>
            </form>
        );
    }
}