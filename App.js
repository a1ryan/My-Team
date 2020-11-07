import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAME7dQH7pVuzHPNyEpwztRcYtV4LMRqTY",
  authDomain: "my-team-1e4fb.firebaseapp.com",
  databaseURL: "https://my-team-1e4fb.firebaseio.com",
  projectId: "my-team-1e4fb",
  storageBucket: "my-team-1e4fb.appspot.com",
  messagingSenderId: "152379605606",
  appId: "1:152379605606:web:013857319bd08e4a7ae3a7"
};
// Initialize Firebase
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

var listData = []

class App extends Component {

 
  constructor(props){
    super(props);

    this.state = {
      ListViewData: listData,
      newContact: ""
    }
  }

  renderItem({item}) {
   return (
      <ListItem>
        <Text>{item}</Text>
      </ListItem>
   )
  }

  componentDidMount(){
    var that = this

    firebase.database().ref('/contacts').on('child_added', function(data){

      var newData = [...that.state.ListViewData]
      newData.push(data)
      that.setState({ListViewData: newData})

    })
  }

  addRow(listData){
    var key = firebase.database().ref('/contacts').push().key
    firebase.database().ref('/contacts').child(key).set({name : listData})
  }

  deleteRow(){

  }

  render() {
    return (
      <Container style = {styles.Container}  >
        <Header style = {styles.header} >
          <Content>
            <Item>
              <Input
                onChangeText = {(newContact) => this.setState({newContact})}
                placeholder = 'Add member'
              />
              <Button onPress={() => this.addRow(this.state.newContact)} >
                <Icon name = "add" />
              </Button>
            </Item>
          </Content>
        </Header>

          <FlatList
            data= {listData}
            renderItem={this.renderItem}
          />

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor: '#fff'
  },
  header:{
    backgroundColor: '#98AFC7'
  },
  btn:{
    position: 'absolute',
    bottom:10,
    // top:10,
    right:10,
    height:30
  }
})

export default App;

