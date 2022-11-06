import type { NavigationSpecification } from '../../src/types';

const spec: NavigationSpecification = {
  import: [{ name: 'LoginContentVariant, FlexiblePresentationFlow', source: './existingCode' }],
  type: 'stack',
  screens: {
    FirstTimeUserExperience: {
      name: 'ftux',
      analytics: 'FIRST_TIME_UX',
      type: 'stack',
      parameterListType: 'FtUxStackParamList',
      screens: [
        'Country',
        'Welcome',
        {
          id: 'Login',
          analytics: 'Login_Start',
          parameterType: 'LoginRegisterParams',
          extends: 'FlexiblePresentationFlow',
          parameters: [
            { name: 'contentVariant', type: 'LoginContentVariant?' },
            { name: 'startOnLogin', type: 'boolean?' },
            { name: 'allowSkip', type: 'boolean?' },
          ],
        },
        'Intro',
        'Location',
      ],
    },
    App: {
      name: 'app',
      parameterListType: 'AppParamList',
      screens: {
        Main: {
          type: 'stack',
          screens: [
            'Home',
            {
              id: 'FindGas',
              analytics: false,
              type: 'stack',
              screens: ['StationList', 'StationDetail'],
            },
            'Challenges',
            {
              id: 'Savings',
              type: 'stack',
              screens: ['Start', 'Enroll'],
            },
            {
              id: 'Car',
              type: 'stack',
              screens: ['Drives', 'Parking', 'Vehicles'],
            },
          ],
        },
        Debug: {
          type: 'stack',
          screens: ['Main'],
        },
        LoginAndRegistration: {
          name: 'login',
          parameterType: 'LoginRegisterParams',
          type: 'stack',
          screens: ['Start', 'Register', 'Login', 'Auth'],
        },
        ModalWebView: {},
        EditProfile: {},
      },
    },
  },
};

export default spec;
