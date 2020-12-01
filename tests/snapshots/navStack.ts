import { LoginContentVariant, FlexiblePresentationFlow } from './existingCode';

export interface NavType {
  FirstTimeUserExperience: {
    $name: 'ftux';
    Country: 'ftux.Country';
    Welcome: 'ftux.Welcome';
    Login: 'ftux.Login';
    Intro: 'ftux.Intro';
    Location: 'ftux.Location';
  };
  App: {
    $name: 'app';
    Main: {
      $name: 'app.Main';
      Home: 'app.Main.Home';
      FindGas: {
        $name: 'app.Main.FindGas';
        StationList: 'app.Main.FindGas.StationList';
        StationDetail: 'app.Main.FindGas.StationDetail';
      };
      Challenges: 'app.Main.Challenges';
      Savings: {
        $name: 'app.Main.Savings';
        Start: 'app.Main.Savings.Start';
        Enroll: 'app.Main.Savings.Enroll';
      };
      Car: {
        $name: 'app.Main.Car';
        Drives: 'app.Main.Car.Drives';
        Parking: 'app.Main.Car.Parking';
        Vehicles: 'app.Main.Car.Vehicles';
      };
    };
    Debug: {
      $name: 'app.Debug';
      Main: 'app.Debug.Main';
    };
    LoginAndRegistration: {
      $name: 'app.login';
      Start: 'app.login.Start';
      Register: 'app.login.Register';
      Login: 'app.login.Login';
      Auth: 'app.login.Auth';
    };
    ModalWebView: 'app.ModalWebView';
    EditProfile: 'app.EditProfile';
  };
}

export const Nav: NavType = {
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
};

export const Analytics = {
  [Nav.FirstTimeUserExperience.$name]: 'FIRST_TIME_UX',
  [Nav.FirstTimeUserExperience.Login]: 'Login_Start',
};

export interface LoginRegisterParams extends FlexiblePresentationFlow {
  contentVariant?: LoginContentVariant;
  startOnLogin?: boolean;
  allowSkip?: boolean;
}

export type FtUxStackParamList = {
  [Nav.FirstTimeUserExperience.Country]: undefined;
  [Nav.FirstTimeUserExperience.Welcome]: undefined;
  [Nav.FirstTimeUserExperience.Login]: LoginRegisterParams;
  [Nav.FirstTimeUserExperience.Intro]: undefined;
  [Nav.FirstTimeUserExperience.Location]: undefined;
};

export type AppParamList = {
  [Nav.App.Main.$name]: undefined;
  [Nav.App.Debug.$name]: undefined;
  [Nav.App.LoginAndRegistration.$name]: LoginRegisterParams;
  [Nav.App.ModalWebView]: undefined;
  [Nav.App.EditProfile]: undefined;
};
