import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  AsyncStorage,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

import PostCard from '../components/PostCard';

class ApiScreen extends Component {
  state = {
    title: '',
    list: [],
  };

  componentDidMount() {
    this.getPostList();
  }

  getPostList = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?userId=1',
    );
    const json = await response.json();
    return this.setState({list: json});
  };

  addPost = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        body: '',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const res = await response.json();
    if (res) {
      alert('berhasil ditambah post baru : ' + res.title);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?userId=1',
      );
      const json = await response.json();
      return this.setState({list: json});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.list}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return <PostCard title={item.title} />;
          }}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            style={{flex: 1, padding: 10, fontSize: 16}}
            onChangeText={title => this.setState({title})}
            value={this.state.title}
          />
          <TouchableOpacity style={styles.button} onPress={this.addPost}>
            <Icons name="plus" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  textInputContainer: {
    height: 60,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1f7898',
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: '#1f7898',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ApiScreen;
