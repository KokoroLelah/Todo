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

import ToDoCard from '../components/TodoCard';

class TodoScreen extends Component {
  state = {
    title: '',
    todos: [],
  };

  componentDidMount() {
    this.loadTodos();
  }

  saveTodos = newToDos => {
    const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos));
  };

  loadTodos = async () => {
    try {
      const getTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(getTodos);
      this.setState({todos: parsedTodos || []});
    } catch (err) {
      console.log(err);
    }
  };

  addToDos = () => {
    if (this.state.title.trim()) {
      const todos = [
        ...this.state.todos,
        {
          id:
            'xx' +
            Math.random()
              .toString(36)
              .substr(2, 5),
          title: this.state.title,
          completed: false,
        },
      ];

      this.setState({todos, title: ''});
      this.saveTodos(todos);
    }
  };

  checkHandler = id => {
    const todos = [...this.state.todos];
    for (let item of todos) {
      if (item.id === id) {
        item.completed = !item.completed;
        break;
      }
    }

    this.setState({todos});
    this.saveTodos(todos);
  };

  removeItem = id => {
    const todos = [...this.state.todos].filter(item => item.id !== id);

    this.setState({todos});
    this.saveTodos(todos);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.todos}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <ToDoCard
                title={item.title}
                completed={item.completed}
                check={() => this.checkHandler(item.id)}
                remove={() => this.removeItem(item.id)}
              />
            );
          }}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            style={{flex: 1, padding: 10, fontSize: 16}}
            onChangeText={title => this.setState({title})}
            value={this.state.title}
          />
          <TouchableOpacity style={styles.button} onPress={this.addToDos}>
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

export default TodoScreen;
