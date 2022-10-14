// <Reference path="ModalInterfaces.d.ts" />
declare module 'react-tabs'

declare module 'izymodals' {
  export type YesNo = 'yes' | 'no'
  export interface FooterButtonInterface {
    onClick: (e: any) => void
    label: string
    hide: boolean
    disabled?: boolean
  }
  export interface SaveFooterPropsInterface {
    save: FooterButtonInterface
    prev: FooterButtonInterface
    next: FooterButtonInterface
  }
  export interface TabInterface {
    content: JSX.Element
    disabled: boolean
    label: string
  }
  export interface PropmtOptionsInterface {
    labelYes?: string
    labelNo?: string
    onYes?: () => void
    onNo?: () => void
    onCancel?: () => void
  }
  export interface StepModalPropsInterface {
    steps?: TabInterface[]
  }
  export interface PromptModalPropsInterface {
    promptConfig?: PropmtOptionsInterface
  }

  export interface ModalPropsInterface
    extends StepModalPropsInterface,
      PromptModalPropsInterface {
    status?: boolean
    header?: string | boolean
    footer?: JSX.Element | boolean
    children: any
  }

  export const Modal: React.FC<ModalPropsInterface>
  export const TabModal: React.FC<ModalPropsInterface>
  export const PromptModal: React.FC<ModalPropsInterface>
  export const SaveFooter: React.FC<SaveFooterPropsInterface>
  export const FooterButton: React.FC<FooterButtonInterface>
}
