import React,{Component} from 'react';
import './Layout.css';
import Navigation from './Components/Navigation/Navigation';
import Start from './Components/Authentication/Authentication';
class Layout extends Component{
    state={
        currentComp:'Start',
        isSignedIn:null,
        userStatus:'Unregistered',
        editingRegion:false,
    }

    userStatusHandler = (val) =>{
        this.setState({userStatus:val});
    }
    
    signInHandler = (val) =>{
        this.setState({isSignedIn:val});
    }
    render(){
        let renderingElement = null;
        switch(this.state.currentComp){
            case 'Start': renderingElement= <Start userStatusHandler={this.userStatusHandler} signInHandler={this.signInHandler} isSignedIn={this.state.isSignedIn} />
                break;
            
        }
        const allowAccess = this.state.isSignedIn;
        return (
            <div>
                <div className="background">
                </div>
                {allowAccess?<Navigation/>:null}
                
                <div className="container mainarea">
                </div>
                {renderingElement}
         
            </div>
        );
    }
}

export default Layout;