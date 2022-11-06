react-navigation-codegen
========================

![Node CI](https://github.com/gas-buddy/react-navigation-codegen/workflows/Node%20CI/badge.svg)

A simple code generator to turn somewhat abstract specifications into TypeScript code with information about your full navigation stack in a React Navigation based app. This avoids lots of magic strings in your code, gives you a sense of the actual navigation structure, and avoids repeating yourself in code as much as usual.

Input can be YAML, JS, JSON, or Typescript. Consider a typical navigation setup:

```
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

<RootStack.Navigator initialRouteName="Home">
  <RootStack.Screen name="Home" component={Home} />
  <RootStack.Screen
    name="Profile"
    component={Profile}
    initialParams={{ userId: user.id }}
  />
  <RootStack.Screen name="Feed" component={Feed} />
</RootStack.Navigator>
```

With this module, you would specify as follows:

```
export default {
  screens: {
    Root: {
      parameterListType: 'RootStackParamList',
      screens: {
        Home: {},
        Profile: {
          parameterType: '{ userId: string }',
        },
        Feed: {
          parameterType: '{ sort: 'latest' | 'top' } | undefined',
        }
      }
    }
  }
}
```

And now your code becomes:

```
const RootStack = createStackNavigator<RootStackParamList>();

<RootStack.Navigator initialRouteName="Home">
  <RootStack.Screen name={Nav.Root.Home} component={Home} />
  <RootStack.Screen
    name={Nav.Root.Profile}
    component={Profile}
    initialParams={{ userId: user.id }}
  />
  <RootStack.Screen name={Nav.Root.Feed} component={Feed} />
</RootStack.Navigator>
```

Perhaps not a massive improvement in the simple example, but as you scale, it gets harder to manage all the types, related types and constants for every navigator, AND you lose a notion of the structure of the navigation tree.