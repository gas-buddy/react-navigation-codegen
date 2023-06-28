import type { NavigationSpecification } from '../../src/types';

const spec: NavigationSpecification = {
  type: 'stack',
  screens: {
    Welcome: {
      name: 'welcome',
      analytics: 'WELCOME',
      type: 'stack',
      parameterListType: 'WelcomeStackParamList',
      screens: {
        Introduction: {
          name: 'Introduction',
        },
        Login: {
          name: 'Login',
          analytics: 'LOGIN',
          parameterType: 'LoginParams',
          extends: 'AuthenticationFlow',
          parameters: [
            { name: 'duplicateImport', type: 'DuplicateImport?' },
            { name: 'optionalBoolean', type: 'boolean?' },
            { name: 'optionalString', type: 'string?' },
          ],
          imports: [
            { name: 'AuthenticationFlow', source: 'same-source-import' },
            { name: 'DuplicateImport', source: 'duplicate-import' },
          ],
        },
        Signup: {
          name: 'Signup',
        },
      },
    },
    MainApp: {
      name: 'mainApp',
      parameterListType: 'MainAppStackParamList',
      screens: {
        HomeStack: {
          type: 'stack',
          screens: {
            Home: {
              name: 'Home',
            },
            Profile: {
              name: 'Profile',
              analytics: false,
              parameterType: 'ProfileParams',
              extends: 'UserProfileFlow',
              screens: {
                ProfileDetail: {
                  name: 'ProfileDetail',
                },
                ProfileSetting: {
                  name: 'ProfileSetting',
                },
              },
              imports: [{ name: 'UserProfileFlow', source: 'same-source-import' }],
            },
            Notification: {
              name: 'Notification',
            },
            SettingsStack: {
              type: 'stack',
              screens: {
                GeneralSettings: {
                  name: 'GeneralSettings',
                },
                AccountSettings: {
                  name: 'AccountSettings',
                },
              },
            },
            HelpStack: {
              screens: {
                HelpHome: {
                  name: 'HelpHome',
                },
                FAQ: {
                  name: 'FAQ',
                },
                Contact: {
                  name: 'Contact',
                },
              },
              parameterType: 'HelpParams',
              parameters: [{ name: 'duplicateImport', type: 'DuplicateImport' }],
              imports: [{ name: 'DuplicateImport', source: 'duplicate-import' }],
            },
          },
        },
        Explore: {
          type: 'stack',
          screens: {
            Discover: {
              name: 'Discover',
            },
          },
        },
        Shopping: {
          name: 'Shopping',
          parameterType: 'ShoppingParams',
          extends: 'ShoppingFlow',
          screens: {
            ShopHome: {
              name: 'ShopHome',
            },
            Cart: {
              name: 'Cart',
            },
            Checkout: {
              name: 'Checkout',
            },
            OrderConfirmation: {
              name: 'OrderConfirmation',
              analytics: 'ORDER_CONFIRMATION',
            },
          },
          imports: [{ name: 'ShoppingFlow', source: 'same-source-import' }],
        },
        Social: {
          name: 'Social',
        },
        Messages: {
          name: 'Messages',
          analytics: false,
        },
      },
      imports: [{ name: 'CommonImport1, CommonImport2', source: 'common-import' }],
    },
  },
};

export default spec;
