import React,{Component} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Card, CardBody, Badge,Button,ButtonGroup,Input} from 'reactstrap';
import './Authentication.css';

firebase.initializeApp({
    apiKey: "AIzaSyBKJPFvUpTYg2ocIb7srmf79PykvJncPtg",
    authDomain: "thedata-2df06.firebaseapp.com",
  }); 

  

class Start extends Component{
    state={
      toker:null,
      userStatus:null
    }
  
    uiConfig = {
          signInFlow: 'redirect',
          signInOptions: [
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          callbacks: {
            signInSuccess: () => false
          }
        };
    
    userStatusChangeHandler = () => {
  
    }
  
    componentDidMount = () =>{
      firebase.auth().onAuthStateChanged(user => {
        this.props.signInHandler(!!user);
        if(user){
          user.getIdTokenResult().then(idTokenResult => {
            window.token = idTokenResult.token;
            this.setState({token:idTokenResult});
          });
        }
        else{ 
          window.token = null;
        }
      });
    }
  
    render(){
      return(
      <div className="startpage">
          <Card style={{color:'black',width:'600px'}}>
            <CardBody>
  
            {this.props.isSignedIn ? 
                <div>
                  <h1><Badge color="success" >Signed In</Badge></h1>
                  <h3>Welcome {window.nameOfEmp = firebase.auth().currentUser.displayName}</h3>
                  {/* <h6>Signed In for one hour only...</h6> */}
                  <Button color="secondary" onClick={()=>firebase.auth().signOut()}  block>Sign Out!</Button>
                  <hr></hr>    
                  {/* {this.state.token?<AdminConsole userStatusHandler={this.props.userStatusHandler} token={this.state.token} email={firebase.auth().currentUser.email}/>:null} */}
                  
                </div>
  
              : 
                <div>
                      <h1><Badge color="info" >Sign In or Sign Up</Badge></h1>
                      <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
              }
            </CardBody>
          </Card>
      </div>);
    }
  }
  
  export default Start;
  
  