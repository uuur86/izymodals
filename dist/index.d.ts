/// <reference types="react" />
import { ModalPropsInterface } from 'izymodals';
/**
 * Modals
 */
export declare function ModalBase({ status, header, footer, children }: ModalPropsInterface): JSX.Element;
export declare function PromptModal({ status, promptConfig, children }: ModalPropsInterface): JSX.Element;
export declare function TabModalWrapper({ steps, children }: ModalPropsInterface): any;
export declare function TabModal({ status, children, footer, tabIndex: tabIndexDefault, ...props }: any): any;
declare const _default: {
    ModalBase: typeof ModalBase;
    PromptModal: typeof PromptModal;
    TabModalWrapper: typeof TabModalWrapper;
    TabModal: typeof TabModal;
};
export default _default;
