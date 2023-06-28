import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AuthenticationFlow, UserProfileFlow, ShoppingFlow } from 'same-source-import';
import { DuplicateImport } from 'duplicate-import';
import { CommonImport1, CommonImport2 } from 'common-import';

// Screen names and structure
export const Nav = {
  Welcome: {
    $name: 'welcome',
    Introduction: 'welcome.Introduction',
    Login: 'welcome.Login',
    Signup: 'welcome.Signup',
  },
  MainApp: {
    $name: 'mainApp',
    HomeStack: {
      $name: 'mainApp.HomeStack',
      Home: 'mainApp.HomeStack.Home',
      Profile: {
        $name: 'mainApp.HomeStack.Profile',
        ProfileDetail: 'mainApp.HomeStack.Profile.ProfileDetail',
        ProfileSetting: 'mainApp.HomeStack.Profile.ProfileSetting',
      },
      Notification: 'mainApp.HomeStack.Notification',
      SettingsStack: {
        $name: 'mainApp.HomeStack.SettingsStack',
        GeneralSettings: 'mainApp.HomeStack.SettingsStack.GeneralSettings',
        AccountSettings: 'mainApp.HomeStack.SettingsStack.AccountSettings',
      },
      HelpStack: {
        $name: 'mainApp.HomeStack.HelpStack',
        HelpHome: 'mainApp.HomeStack.HelpStack.HelpHome',
        FAQ: 'mainApp.HomeStack.HelpStack.FAQ',
        Contact: 'mainApp.HomeStack.HelpStack.Contact',
      },
    },
    Explore: {
      $name: 'mainApp.Explore',
      Discover: 'mainApp.Explore.Discover',
    },
    Shopping: {
      $name: 'mainApp.Shopping',
      ShopHome: 'mainApp.Shopping.ShopHome',
      Cart: 'mainApp.Shopping.Cart',
      Checkout: 'mainApp.Shopping.Checkout',
      OrderConfirmation: 'mainApp.Shopping.OrderConfirmation',
    },
    Social: 'mainApp.Social',
    Messages: 'mainApp.Messages',
  },
} as const;

// Analytics event names
export const Analytics = {
  [Nav.Welcome.$name]: 'WELCOME',
  [Nav.Welcome.Login]: 'LOGIN',
  [Nav.MainApp.HomeStack.Profile.$name]: false,
  [Nav.MainApp.Shopping.OrderConfirmation]: 'ORDER_CONFIRMATION',
  [Nav.MainApp.Messages]: false,
} as const;

// Screen parameter types
export interface LoginParams extends AuthenticationFlow {
  duplicateImport?: DuplicateImport;
  optionalBoolean?: boolean;
  optionalString?: string;
}
export interface ProfileParams extends UserProfileFlow {}
export interface HelpParams {
  duplicateImport: DuplicateImport;
}
export interface ShoppingParams extends ShoppingFlow {}

// Navigator parameter types
export type WelcomeStackParamList = {
  [Nav.Welcome.Introduction]: undefined;
  [Nav.Welcome.Login]: LoginParams;
  [Nav.Welcome.Signup]: undefined;
};

export type MainAppStackParamList = {
  [Nav.MainApp.HomeStack.$name]: undefined | $Nested['mainApp.HomeStack'];
  [Nav.MainApp.Explore.$name]: undefined | $Nested['mainApp.Explore'];
  [Nav.MainApp.Shopping.$name]: ShoppingParams & $Nested['mainApp.Shopping'];
  [Nav.MainApp.Social]: undefined;
  [Nav.MainApp.Messages]: undefined;
};

interface $Nested {
  welcome:
    | {}
    | { screen: 'welcome.Introduction' }
    | { screen: 'welcome.Login'; params: LoginParams }
    | { screen: 'welcome.Signup' };
  'mainApp.HomeStack.Profile':
    | {}
    | { screen: 'mainApp.HomeStack.Profile.ProfileDetail' }
    | { screen: 'mainApp.HomeStack.Profile.ProfileSetting' };
  'mainApp.HomeStack.SettingsStack':
    | {}
    | { screen: 'mainApp.HomeStack.SettingsStack.GeneralSettings' }
    | { screen: 'mainApp.HomeStack.SettingsStack.AccountSettings' };
  'mainApp.HomeStack.HelpStack':
    | {}
    | { screen: 'mainApp.HomeStack.HelpStack.HelpHome' }
    | { screen: 'mainApp.HomeStack.HelpStack.FAQ' }
    | { screen: 'mainApp.HomeStack.HelpStack.Contact' };
  'mainApp.HomeStack':
    | {}
    | { screen: 'mainApp.HomeStack.Home' }
    | { screen: 'mainApp.HomeStack.Profile'; params: $Nested['mainApp.HomeStack.Profile'] }
    | { screen: 'mainApp.HomeStack.Notification' }
    | {
        screen: 'mainApp.HomeStack.SettingsStack';
        params?: $Nested['mainApp.HomeStack.SettingsStack'];
      }
    | { screen: 'mainApp.HomeStack.HelpStack'; params: $Nested['mainApp.HomeStack.HelpStack'] };
  'mainApp.Explore': {} | { screen: 'mainApp.Explore.Discover' };
  'mainApp.Shopping':
    | {}
    | { screen: 'mainApp.Shopping.ShopHome' }
    | { screen: 'mainApp.Shopping.Cart' }
    | { screen: 'mainApp.Shopping.Checkout' }
    | { screen: 'mainApp.Shopping.OrderConfirmation' };
  mainApp:
    | {}
    | { screen: 'mainApp.HomeStack'; params?: $Nested['mainApp.HomeStack'] }
    | { screen: 'mainApp.Explore'; params?: $Nested['mainApp.Explore'] }
    | { screen: 'mainApp.Shopping'; params: $Nested['mainApp.Shopping'] }
    | { screen: 'mainApp.Social' }
    | { screen: 'mainApp.Messages' };
}

export interface ScreenProps {
  'welcome.Introduction': StackScreenProps<WelcomeStackParamList, typeof Nav.Welcome.Introduction>;
  'welcome.Login': StackScreenProps<WelcomeStackParamList, typeof Nav.Welcome.Login>;
  'welcome.Signup': StackScreenProps<WelcomeStackParamList, typeof Nav.Welcome.Signup>;

  'mainApp.HomeStack': StackScreenProps<MainAppStackParamList, typeof Nav.MainApp.HomeStack.$name>;
  'mainApp.Explore': StackScreenProps<MainAppStackParamList, typeof Nav.MainApp.Explore.$name>;
  'mainApp.Shopping': StackScreenProps<MainAppStackParamList, typeof Nav.MainApp.Shopping.$name>;
  'mainApp.Social': StackScreenProps<MainAppStackParamList, typeof Nav.MainApp.Social>;
  'mainApp.Messages': StackScreenProps<MainAppStackParamList, typeof Nav.MainApp.Messages>;
}
