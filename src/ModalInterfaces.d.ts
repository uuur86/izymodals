// <Reference path="ModalInterfaces.d.ts" />
declare module 'react-tabs'
declare module 'primereact/api'

declare module 'izymodals' {
  export namespace PrimeReact {
    type DialogTemplateType = import('primereact').DialogTemplateType
  }
  export interface TabInterface {
    content: JSX.Element
    disabled?: boolean
    label?: string
    title?: string
    tabIndex?: number
  }

  export interface TabModalPropsInterface {
    steps?: TabInterface[]
  }

  export interface PropmtOptionsInterface {
    labelYes?: string
    labelNo?: string
    onYes?: () => void
    onNo?: () => void
    onCancel?: () => void
  }

  export interface PromptModalPropsInterface {
    labelYes?: string
    labelNo?: string
    onYes?: () => void
    onNo?: () => void
  }

  export interface ButtonPropsInterface
    extends React.HTMLProps<HTMLButtonElement> {
    className?: string
    position?: string
    onClick?: (e: any) => any
    label?: string
    hide?: boolean
  }

  export interface ButtonConfigsInterface {
    footer?: ButtonPropsInterface[]
    header?: ButtonPropsInterface[]
  }

  export interface ModalPropsInterface
    extends TabModalPropsInterface,
      PromptModalPropsInterface {
    status?: boolean
    buttonLabel?: string
    onClose?: () => void
    tabIndex?: number
    children?: React.PropsWithChildren<any>[] | React.PropsWithChildren<any>
    header?: PrimeReact.DialogTemplateType
    footer?: PrimeReact.DialogTemplateType
    buttonConfigs?: ButtonConfigsInterface
  }

  export interface TabModalWrapPropsInterface {
    tabList: TabInterface[]
    tabPanels: JSX.Element[]
    children: any
  }

  export const Modal: React.FC<ModalPropsInterface>
  export const TabModal: React.FC<ModalPropsInterface>
  export const PromptModal: React.FC<ModalPropsInterface>

  export const ButtonTemplate: React.FC<ButtonPropsInterface>
  export const ActionButton: React.FC<ButtonPropsInterface>
}
