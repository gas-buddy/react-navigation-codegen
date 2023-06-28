import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { SameSourceImportA, SameSourceImportB, SameSourceImportC } from 'same-source-import';
import { DuplicateImport } from 'duplicate-import';
import { CommaImport1, CommaImport2 } from 'comma-import';

// Screen names and structure
export const Nav = {
  FooScreen: {
    $name: 'foo',
    FooFoo: 'foo.FooFoo',
    FooBaz: 'foo.FooBaz',
    FooBar: 'foo.FooBar',
  },
  BarScreen: {
    $name: 'bar',
    BarFooStack: {
      $name: 'bar.BarFooStack',
      BarFooFoo: 'bar.BarFooStack.BarFooFoo',
      BarFooBar: {
        $name: 'bar.BarFooStack.BarFooBar',
        BarFooBarFoo: 'bar.BarFooStack.BarFooBar.BarFooBarFoo',
        BarFooBarBar: 'bar.BarFooStack.BarFooBar.BarFooBarBar',
      },
      BarFooBaz: 'bar.BarFooStack.BarFooBaz',
      BarFooQuxStack: {
        $name: 'bar.BarFooStack.BarFooQuxStack',
        BarFooQuxFoo: 'bar.BarFooStack.BarFooQuxStack.BarFooQuxFoo',
        BarFooQuxBar: 'bar.BarFooStack.BarFooQuxStack.BarFooQuxBar',
      },
      BarFooFredStack: {
        $name: 'bar.BarFooStack.BarFooFredStack',
        BarFooFredFoo: 'bar.BarFooStack.BarFooFredStack.BarFooFredFoo',
        BarFooFredBar: 'bar.BarFooStack.BarFooFredStack.BarFooFredBar',
        BarFooFredBaz: 'bar.BarFooStack.BarFooFredStack.BarFooFredBaz',
      },
    },
    BarBar: {
      $name: 'bar.BarBar',
      BarBarFoo: 'bar.BarBar.BarBarFoo',
    },
    BarBaz: {
      $name: 'bar.barBaz',
      BarBazFoo: 'bar.barBaz.BarBazFoo',
      BarBazBar: 'bar.barBaz.BarBazBar',
      BarBazBaz: 'bar.barBaz.BarBazBaz',
      BarBazQux: 'bar.barBaz.BarBazQux',
    },
    BarQux: 'bar.BarQux',
    BarFred: 'bar.BarFred',
  },
} as const;

// Analytics event names
export const Analytics = {
  [Nav.FooScreen.$name]: 'FOO',
  [Nav.FooScreen.FooBaz]: 'FOO_BAZ',
  [Nav.BarScreen.BarFooStack.BarFooBar.$name]: false,
  [Nav.BarScreen.BarBaz.BarBazBaz]: 'BAR_BAZ_BAZ',
  [Nav.BarScreen.BarBaz.BarBazQux]: false,
} as const;

// Screen parameter types
export interface FooBazParams extends SameSourceImportA {
  duplicateImport?: DuplicateImport;
  optionalBool?: boolean;
  optionalString?: string;
}
export interface BarFooBarParams extends SameSourceImportB {}
export interface BarFooFredParams {
  duplicateImport: DuplicateImport;
}
export interface BarBazParams extends SameSourceImportC {}

// Navigator parameter types
export type FooStackParamList = {
  [Nav.FooScreen.FooFoo]: undefined;
  [Nav.FooScreen.FooBaz]: FooBazParams;
  [Nav.FooScreen.FooBar]: undefined;
};

export type BarStackParamList = {
  [Nav.BarScreen.BarFooStack.$name]: undefined | $Nested['bar.BarFooStack'];
  [Nav.BarScreen.BarBar.$name]: undefined | $Nested['bar.BarBar'];
  [Nav.BarScreen.BarBaz.$name]: BarBazParams & $Nested['bar.barBaz'];
  [Nav.BarScreen.BarQux]: undefined;
  [Nav.BarScreen.BarFred]: undefined;
};

interface $Nested {
  foo:
    | {}
    | { screen: 'foo.FooFoo' }
    | { screen: 'foo.FooBaz'; params: FooBazParams }
    | { screen: 'foo.FooBar' };
  'bar.BarFooStack.BarFooBar':
    | {}
    | { screen: 'bar.BarFooStack.BarFooBar.BarFooBarFoo' }
    | { screen: 'bar.BarFooStack.BarFooBar.BarFooBarBar' };
  'bar.BarFooStack.BarFooQuxStack':
    | {}
    | { screen: 'bar.BarFooStack.BarFooQuxStack.BarFooQuxFoo' }
    | { screen: 'bar.BarFooStack.BarFooQuxStack.BarFooQuxBar' };
  'bar.BarFooStack.BarFooFredStack':
    | {}
    | { screen: 'bar.BarFooStack.BarFooFredStack.BarFooFredFoo' }
    | { screen: 'bar.BarFooStack.BarFooFredStack.BarFooFredBar' }
    | { screen: 'bar.BarFooStack.BarFooFredStack.BarFooFredBaz' };
  'bar.BarFooStack':
    | {}
    | { screen: 'bar.BarFooStack.BarFooFoo' }
    | { screen: 'bar.BarFooStack.BarFooBar'; params: $Nested['bar.BarFooStack.BarFooBar'] }
    | { screen: 'bar.BarFooStack.BarFooBaz' }
    | {
        screen: 'bar.BarFooStack.BarFooQuxStack';
        params?: $Nested['bar.BarFooStack.BarFooQuxStack'];
      }
    | {
        screen: 'bar.BarFooStack.BarFooFredStack';
        params: $Nested['bar.BarFooStack.BarFooFredStack'];
      };
  'bar.BarBar': {} | { screen: 'bar.BarBar.BarBarFoo' };
  'bar.barBaz':
    | {}
    | { screen: 'bar.barBaz.BarBazFoo' }
    | { screen: 'bar.barBaz.BarBazBar' }
    | { screen: 'bar.barBaz.BarBazBaz' }
    | { screen: 'bar.barBaz.BarBazQux' };
  bar:
    | {}
    | { screen: 'bar.BarFooStack'; params?: $Nested['bar.BarFooStack'] }
    | { screen: 'bar.BarBar'; params?: $Nested['bar.BarBar'] }
    | { screen: 'bar.barBaz'; params: $Nested['bar.barBaz'] }
    | { screen: 'bar.BarQux' }
    | { screen: 'bar.BarFred' };
}

export interface ScreenProps {
  'foo.FooFoo': StackScreenProps<FooStackParamList, typeof Nav.FooScreen.FooFoo>;
  'foo.FooBaz': StackScreenProps<FooStackParamList, typeof Nav.FooScreen.FooBaz>;
  'foo.FooBar': StackScreenProps<FooStackParamList, typeof Nav.FooScreen.FooBar>;

  'bar.BarFooStack': StackScreenProps<BarStackParamList, typeof Nav.BarScreen.BarFooStack.$name>;
  'bar.BarBar': StackScreenProps<BarStackParamList, typeof Nav.BarScreen.BarBar.$name>;
  'bar.barBaz': StackScreenProps<BarStackParamList, typeof Nav.BarScreen.BarBaz.$name>;
  'bar.BarQux': StackScreenProps<BarStackParamList, typeof Nav.BarScreen.BarQux>;
  'bar.BarFred': StackScreenProps<BarStackParamList, typeof Nav.BarScreen.BarFred>;
}
