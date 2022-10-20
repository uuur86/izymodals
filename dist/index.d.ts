/// <reference types="react" />
import { ModalPropsInterface } from 'izymodals';
/**
 * Modals
 */
export declare function ModalBase({ buttonLabel, buttonConfigs, status, header, footer, onClose, children, ...props }: ModalPropsInterface): JSX.Element;
export declare function Modal({ children, ...props }: ModalPropsInterface): JSX.Element;
export declare function ActionButton({ ...props }: {
    [x: string]: any;
}): JSX.Element;
export declare function PromptModal({ buttonLabel, labelYes, labelNo, onYes, onNo, children }: ModalPropsInterface): JSX.Element;
export declare function TabModalWrapper({ steps, children }: ModalPropsInterface): any;
export declare function TabModal({ status, tabIndex: tabInd, footer, children, ...props }: ModalPropsInterface): JSX.Element;
declare const _default: {
    Modal: typeof Modal;
    TabModal: typeof TabModal;
    PromptModal: typeof PromptModal;
    ActionButton: typeof ActionButton;
};
export default _default;
