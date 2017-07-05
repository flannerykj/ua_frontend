import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

import T from 'tcomb-form-native'; 


function getPerformances() { // doesn't work when Class function. Why?
  return fetch('http://localhost:8000/users/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export default class frontend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: {
        username: '',
        email: '',
        password: ''
      },
      newPost: {
        title: 'k'
      },
    }
    this.postPerformance = this.postPerformance.bind(this);
  }
  componentWillMount() {
    console.log('d');
    var results = getPerformances();
    this.setState({
      posts: results
    })
    console.log(this.state.posts); //  why is this happening only on first user action?
  }
  postPerformance() {
    return fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        //'Authorization': 'Basic '+btoa('flannj:cheesecake'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'username',
      })
    })
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleOnChange = (text) => {
    this.setState({'newPost': {'title': text}});
    //AsyncStorage.setItem('title', text);

  }

  addPost = () => {
    this.postPerformance();
  }
  _userSignup() {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        this._onValueChange(STORAGE_KEY, responseData.id_token),
        AlertIOS.alert(
          "Signup Success!",
          "Click the button to get a Chuck Norris quote!"
        )
      })
      .done();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TextInput
	        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
	        onChangeText={this.handleOnChange}
            value={this.state.newPost.title}
	      />
        <TouchableHighlight onPress={this.postPerformance}>
          <Text>Post </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('frontend', () => frontend);
