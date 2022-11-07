import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { LoginContentVariant, FlexiblePresentationFlow } from './existingCode';

// Screen names and structure
export const Nav = {
  FirstTimeUserExperience: {
    $name: 'ftux',
    Country: 'ftux.Country',
    Welcome: 'ftux.Welcome',
    Login: 'ftux.Login',
    Intro: 'ftux.Intro',
    Location: 'ftux.Location',
  },
  App: {
    $name: 'app',
    Main: {
      $name: 'app.Main',
      Home: 'app.Main.Home',
      FindGas: {
        $name: 'app.Main.FindGas',
        StationList: 'app.Main.FindGas.StationList',
        StationDetail: 'app.Main.FindGas.StationDetail',
      },
      Challenges: 'app.Main.Challenges',
      Savings: {
        $name: 'app.Main.Savings',
        Start: 'app.Main.Savings.Start',
        Enroll: 'app.Main.Savings.Enroll',
      },
      Car: {
        $name: 'app.Main.Car',
        Drives: 'app.Main.Car.Drives',
        Parking: 'app.Main.Car.Parking',
        Vehicles: 'app.Main.Car.Vehicles',
      },
    },
    Debug: {
      $name: 'app.Debug',
      Main: 'app.Debug.Main',
    },
    LoginAndRegistration: {
      $name: 'app.login',
      Start: 'app.login.Start',
      Register: 'app.login.Register',
      Login: 'app.login.Login',
      Auth: 'app.login.Auth',
    },
    ModalWebView: 'app.ModalWebView',
    EditProfile: 'app.EditProfile',
  },
} as const;

// Analytics event names
export const Analytics = {
  [Nav.FirstTimeUserExperience.$name]: 'FIRST_TIME_UX',
  [Nav.FirstTimeUserExperience.Login]: 'Login_Start',
  [Nav.App.Main.FindGas.$name]: false,
};

// Screen parameter types
export interface LoginRegisterParams extends FlexiblePresentationFlow {
  contentVariant?: LoginContentVariant;
  startOnLogin?: boolean;
  allowSkip?: boolean;
}

// Navigator parameter types
export type FtUxStackParamList = {
  [Nav.FirstTimeUserExperience.Country]: undefined;
  [Nav.FirstTimeUserExperience.Welcome]: undefined;
  [Nav.FirstTimeUserExperience.Login]: LoginRegisterParams;
  [Nav.FirstTimeUserExperience.Intro]: undefined;
  [Nav.FirstTimeUserExperience.Location]: undefined;
};

export type AppParamList = {
  [Nav.App.Main.$name]: $Nested['app.Main'];
  [Nav.App.Debug.$name]: $Nested['app.Debug'];
  [Nav.App.LoginAndRegistration.$name]: LoginRegisterParams & $Nested['app.login'];
  [Nav.App.ModalWebView]: undefined;
  [Nav.App.EditProfile]: undefined;
};

interface $Nested {
  ftux:
    | {}
    | { screen: 'ftux.Country' }
    | { screen: 'ftux.Welcome' }
    | { screen: 'ftux.Login'; params: LoginRegisterParams }
    | { screen: 'ftux.Intro' }
    | { screen: 'ftux.Location' };
  'app.Main.FindGas':
    | {}
    | { screen: 'app.Main.FindGas.StationList' }
    | { screen: 'app.Main.FindGas.StationDetail' };
  'app.Main.Savings':
    | {}
    | { screen: 'app.Main.Savings.Start' }
    | { screen: 'app.Main.Savings.Enroll' };
  'app.Main.Car':
    | {}
    | { screen: 'app.Main.Car.Drives' }
    | { screen: 'app.Main.Car.Parking' }
    | { screen: 'app.Main.Car.Vehicles' };
  'app.Main':
    | {}
    | { screen: 'app.Main.Home' }
    | { screen: 'app.Main.FindGas'; params?: $Nested['app.Main.FindGas'] }
    | { screen: 'app.Main.Challenges' }
    | { screen: 'app.Main.Savings'; params?: $Nested['app.Main.Savings'] }
    | { screen: 'app.Main.Car'; params?: $Nested['app.Main.Car'] };
  'app.Debug': {} | { screen: 'app.Debug.Main' };
  'app.login':
    | {}
    | { screen: 'app.login.Start' }
    | { screen: 'app.login.Register' }
    | { screen: 'app.login.Login' }
    | { screen: 'app.login.Auth' };
  app:
    | {}
    | { screen: 'app.Main'; params?: $Nested['app.Main'] }
    | { screen: 'app.Debug'; params?: $Nested['app.Debug'] }
    | { screen: 'app.login'; params: $Nested['app.login'] }
    | { screen: 'app.ModalWebView' }
    | { screen: 'app.EditProfile' };
}

export interface NavTypes {
  'ftux.Country': {
    ScreenProps: StackScreenProps<FtUxStackParamList, typeof Nav.FirstTimeUserExperience.Country>;
  };
  'ftux.Welcome': {
    ScreenProps: StackScreenProps<FtUxStackParamList, typeof Nav.FirstTimeUserExperience.Welcome>;
  };
  'ftux.Login': {
    ScreenProps: StackScreenProps<FtUxStackParamList, typeof Nav.FirstTimeUserExperience.Login>;
  };
  'ftux.Intro': {
    ScreenProps: StackScreenProps<FtUxStackParamList, typeof Nav.FirstTimeUserExperience.Intro>;
  };
  'ftux.Location': {
    ScreenProps: StackScreenProps<FtUxStackParamList, typeof Nav.FirstTimeUserExperience.Location>;
  };

  'app.Main': {
    ScreenProps: StackScreenProps<AppParamList, typeof Nav.App.Main.$name>;
  };
  'app.Debug': {
    ScreenProps: StackScreenProps<AppParamList, typeof Nav.App.Debug.$name>;
  };
  'app.login': {
    ScreenProps: StackScreenProps<AppParamList, typeof Nav.App.LoginAndRegistration.$name>;
  };
  'app.ModalWebView': {
    ScreenProps: StackScreenProps<AppParamList, typeof Nav.App.ModalWebView>;
  };
  'app.EditProfile': {
    ScreenProps: StackScreenProps<AppParamList, typeof Nav.App.EditProfile>;
  };
}
