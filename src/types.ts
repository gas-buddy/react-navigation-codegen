type ScreenOrNavigator = string | ScreenSpec | NavigatorSpec;

export interface NavigationParameterSpec {
  name: string;
  type: string;
}

export interface ScreenSpec {
  // Id is inferred when discovered in a keyed map, but needs to be explicit when in an array of screens
  id?: string;
  // Name will be id (or the discovered key) if not specified
  name?: string;
  parameterType?: string;
  // The base type of the parameter object
  extends?: string;
  parameters?: Array<NavigationParameterSpec>;
  // The name of the screen for analytics events (possibly will change to allow more settings)
  analytics?: string | false;
}

export interface NavigatorSpec extends ScreenSpec {
  type?: 'stack' | 'nativeStack' | 'drawer' | 'bottomTab' | 'materialBottomTab' | 'materialTopTab';
  // The type of the navigator screen list parameters
  parameterListType?: string;
  // If each screen should receive a certain parameter type, list it here
  defaultParameters?: string;
  // Do not prefix paths of this navigator
  noPrefix?: boolean;
  // The screens that are part of this navigator
  screens: { [key: string]: ScreenOrNavigator } | Array<ScreenOrNavigator>;
}

export interface ImportSpec {
  name: string;
  source: string;
}

export interface NavigationSpecification extends NavigatorSpec {
  import: Array<ImportSpec>;
  preamble?: string;
}
