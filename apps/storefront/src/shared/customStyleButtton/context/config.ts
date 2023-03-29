import {
  Dispatch,
  ReactNode,
} from 'react'

type BtnKeys = 'masqueradeButton' | 'addQuoteBtn' | 'floatingAction' | 'addToAllQuoteBtn' | 'shoppingListBtn'

interface BtnStyle {
  color: string,
  buttonText: string,
  location: string,
  customCss: string,
  horizontalPadding: string,
  verticalPadding: string,
  classSelector: string,
  locationSelector: string,
}

export interface CustomStyleButtonState extends Record<BtnKeys, Partial<BtnStyle>>{
  globalColor: string,
  golbalBackgroundColor: string,
}

export const initState = {
  globalColor: '#3385D6',
  golbalBackgroundColor: '#FEF9F5',
  masqueradeButton: {
    color: '#ED6C03',
    buttonText: '',
    location: '',
    customCss: '',
    horizontalPadding: '',
    verticalPadding: '',
  },
  addQuoteBtn: {
    color: '#444444',
    buttonText: '',
    customCss: '',
    classSelector: '',
    locationSelector: '',
  },
  floatingAction: {
    color: '#ed6c02',
    buttonText: '',
    location: '',
    customCss: '',
    horizontalPadding: '',
    verticalPadding: '',
  },
  addToAllQuoteBtn: {
    color: '#444444',
    buttonText: '',
    customCss: '',
    classSelector: '',
    locationSelector: '',
  },
  shoppingListBtn: {
    color: '#444444',
    buttonText: '',
    customCss: '',
    classSelector: '',
    locationSelector: '',
  },
}

export interface CustomStyleButtonAction {
  type: string,
  payload: Partial<CustomStyleButtonState>
}

export type DispatchProps = Dispatch<Partial<CustomStyleButtonAction>>
export interface CustomStyleButtonContext {
  state: CustomStyleButtonState,
  dispatch: DispatchProps,
}

export interface CustomStyleButtonProviderProps {
  children: ReactNode
}