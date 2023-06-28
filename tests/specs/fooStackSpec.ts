import type { NavigationSpecification } from '../../src/types';

const spec: NavigationSpecification = {
  type: 'stack',
  screens: {
    FooScreen: {
      name: 'foo',
      analytics: 'FOO',
      type: 'stack',
      parameterListType: 'FooStackParamList',
      screens: {
        FooFoo: {
          name: 'FooFoo',
        },
        FooBaz: {
          name: 'FooBaz',
          analytics: 'FOO_BAZ',
          parameterType: 'FooBazParams',
          extends: 'SameSourceImportA',
          parameters: [
            { name: 'duplicateImport', type: 'DuplicateImport?' },
            { name: 'optionalBool', type: 'boolean?' },
            { name: 'optionalString', type: 'string?' },
          ],
          imports: [
            { name: 'SameSourceImportA', source: 'same-source-import' },
            { name: 'DuplicateImport', source: 'duplicate-import' },
          ],
        },
        FooBar: {
          name: 'FooBar',
        },
      },
    },
    BarScreen: {
      name: 'bar',
      parameterListType: 'BarStackParamList',
      screens: {
        BarFooStack: {
          type: 'stack',
          screens: {
            BarFooFoo: {
              name: 'BarFooFoo',
            },
            BarFooBar: {
              name: 'BarFooBar',
              analytics: false,
              parameterType: 'BarFooBarParams',
              extends: 'SameSourceImportB',
              screens: {
                BarFooBarFoo: {
                  name: 'BarFooBarFoo',
                },
                BarFooBarBar: {
                  name: 'BarFooBarBar',
                },
              },
              imports: [{ name: 'SameSourceImportB', source: 'same-source-import' }],
            },
            BarFooBaz: {
              name: 'BarFooBaz',
            },
            BarFooQuxStack: {
              type: 'stack',
              screens: {
                BarFooQuxFoo: {
                  name: 'BarFooQuxFoo',
                },
                BarFooQuxBar: {
                  name: 'BarFooQuxBar',
                },
              },
            },
            BarFooFredStack: {
              screens: {
                BarFooFredFoo: {
                  name: 'BarFooFredFoo',
                },
                BarFooFredBar: {
                  name: 'BarFooFredBar',
                },
                BarFooFredBaz: {
                  name: 'BarFooFredBaz',
                },
              },
              parameterType: 'BarFooFredParams',
              parameters: [{ name: 'duplicateImport', type: 'DuplicateImport' }],
              imports: [{ name: 'DuplicateImport', source: 'duplicate-import' }],
            },
          },
        },
        BarBar: {
          type: 'stack',
          screens: {
            BarBarFoo: {
              name: 'BarBarFoo',
            },
          },
        },
        BarBaz: {
          name: 'barBaz',
          parameterType: 'BarBazParams',
          extends: 'SameSourceImportC',
          screens: {
            BarBazFoo: {
              name: 'BarBazFoo',
            },
            BarBazBar: {
              name: 'BarBazBar',
            },
            BarBazBaz: {
              analytics: 'BAR_BAZ_BAZ',
              name: 'BarBazBaz',
            },
            BarBazQux: {
              name: 'BarBazQux',
              analytics: false,
            },
          },
          imports: [{ name: 'SameSourceImportC', source: 'same-source-import' }],
        },
        BarQux: {
          name: 'BarQux',
        },
        BarFred: {
          name: 'BarFred',
        },
      },
      imports: [{ name: 'CommaImport1, CommaImport2', source: 'comma-import' }],
    },
  },
};

export default spec;
