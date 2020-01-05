import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TodoScreen from './app/screens/TodoScreen';
import ApiScreen from './app/screens/ApiScreen';
import MapScreen from './app/screens/MapScreen';

const TabScreen = createMaterialTopTabNavigator(
  {
    Todo: {screen: TodoScreen},
    Post: {screen: ApiScreen},
    Location: {screen: MapScreen},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#1f7898',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
);

const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1f7898',
      },
      headerTintColor: '#FFFFFF',
      title: 'DOOGETHER TEST',
    },
  },
});
export default createAppContainer(App);
