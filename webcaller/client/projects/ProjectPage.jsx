import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectPage extends React.Component {

    render(){
        return(
            <form>
                <label>Project name:</label>
                <input type="text" name="projectName" onChange={console.log("hi")}/>
                <label>Description:</label>
                <input type="text" name="projectDescription" onChange={console.log("hi")}/>
            </form>

        );
    }


}