/// <reference types="react" />
import { ModalPropsInterface, PromptModalPropsInterface, TabModalPropsInterface } from 'izymodals';
import 'react-tabs/style/react-tabs.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';
import 'primereact/resources/primereact.min.css';
/**
 * Modals
 */
export declare function ModalBase({ buttonLabel, buttonConfigs, status, header, footer, onClose, children, ...props }: ModalPropsInterface): JSX.Element;
export declare function Modal({ children, ...props }: ModalPropsInterface): JSX.Element;
export declare function ActionButton({ ...props }: {
    [x: string]: any;
}): JSX.Element;
export declare function PromptModal({ buttonLabel, labelYes, labelNo, onYes, onNo, children }: PromptModalPropsInterface): JSX.Element;
export declare function TabModalWrapper(props: TabModalPropsInterface): any;
export declare function TabModal({ status, footer, children, ...props }: TabModalPropsInterface): JSX.Element;
declare const _default: {
    Modal: typeof Modal;
    ModalBase: typeof ModalBase;
    TabModal: typeof TabModal;
    PromptModal: typeof PromptModal;
    ActionButton: typeof ActionButton;
};
export default _default;
