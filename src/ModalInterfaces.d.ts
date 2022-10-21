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

  export interface TabModalPropsInterface extends ModalPropsInterface {
    steps?: TabInterface[]
    tabIndex?: number
  }

  export interface PromptModalPropsInterface extends ModalPropsInterface {
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

  export interface ModalPropsInterface {
    status?: boolean
    buttonLabel?: string
    onClose?: () => void
    children?: React.PropsWithChildren<any>[] | React.PropsWithChildren<any>
    header?: PrimeReact.DialogTemplateType
    footer?: PrimeReact.DialogTemplateType
    buttonConfigs?: ButtonConfigsInterface
  }

  export interface TabModalWrapPropsInterface {
    tabList: TabInterface[]
    tabPanels: JSX.Element[]
    children?: React.FC
  }

  export const ModalBase: React.ComponentType<ModalPropsInterface>
  export const Modal: React.ComponentType<ModalPropsInterface>
  export const TabModal: React.ComponentType<TabModalPropsInterface>
  export const PromptModal: React.ComponentType<PromptModalPropsInterface>

  export const ButtonTemplate: React.ComponentType<ButtonPropsInterface>
  export const ActionButton: React.ComponentType<ButtonPropsInterface>
}
