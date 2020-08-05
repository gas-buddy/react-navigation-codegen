import { NavigationSpecification } from '../../src/types';

const spec: NavigationSpecification = {
  import: [{ name: 'LoginContentVariant, FlexiblePresentationFlow', source: './existingCode' }],
  screens: {
    FirstTimeUserExperience: {
      name: 'ftux',
      type: 'stack',
      parameterListType: 'FtUxStackParamList',
      screens: [
        'Country',
        'Welcome',
        {
          id: 'Login',
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
          screens: [
            'Home',
            {
              id: 'FindGas',
              screens: ['StationList', 'StationDetail'],
            },
            'Challenges',
            {
              id: 'Savings',
              screens: ['Start', 'Enroll'],
            },
            {
              id: 'Car',
              screens: ['Drives', 'Parking', 'Vehicles'],
            },
          ],
        },
        Debug: {
          screens: ['Main'],
        },
        LoginAndRegistration: {
          name: 'login',
          parameterType: 'LoginRegisterParams',
          screens: ['Start', 'Register', 'Login', 'Auth'],
        },
        ModalWebView: {},
        EditProfile: {},
      },
    },
  },
};

export default spec;
