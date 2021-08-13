import React, { Component } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './search';
import Login from './login';

class Main extends Component {

  constructor(){
    super();
    this.stack = createNativeStackNavigator();
  }

  render(){
    return (
      <NavigationContainer>
        <this.stack.Navigator initialRouteName="search">

          {/* <this.stack.Screen
            name="search"
            component={Search}
            options={{
              headerTitle: props => <Text {...props}>Glow</Text>,
              headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Login"
                />
              ),
            }}
          /> */}

          <this.stack.Screen
            name="search"
            component={Search}
            options={({ navigation, route }) => ({
              headerTitle: props => <Text {...props}>Glow</Text>,
            })}
          />

          <this.stack.Screen 
            name="login"
            component={Login}
            options={{
              title: "Login",
            }}
          />

        </this.stack.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({
  main: {
    flex:1,
    flexDirection: 'column',
  },
  content: {
    flex: 11,
  },
  headerButton: {
    color: 'black'
  },
});

export default Main;