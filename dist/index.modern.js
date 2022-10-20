import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { TabList, Tab, TabPanel, Tabs } from 'react-tabs';
import { Button } from 'primereact/button';
import { UniqueComponentId } from 'primereact/utils';

function ModalBase({
  buttonLabel = 'Open Modal',
  buttonConfigs = {},
  status = false,
  header = false,
  footer = false,
  onClose = () => {},
  children,
  ...props
}) {
  const id = UniqueComponentId();
  const [visible, setVisible] = useState(false);
  const triggerButton = status => {
    return React.createElement(ActionButton, {
      onClick: () => !status && setVisible(true),
      disabled: status,
      label: buttonLabel
    });
  };
  const onHide = () => {
    onClose();
    setVisible(false);
  };
  useEffect(() => {
    console.log('status', status);
    setVisible(status);
  }, [status]);
  const dialog = visible => {
    const footerProps = (buttonConfigs === null || buttonConfigs === void 0 ? void 0 : buttonConfigs.footer) && ButtonsTemplate(buttonConfigs.footer) || footer;
    const HeaderProps = (buttonConfigs === null || buttonConfigs === void 0 ? void 0 : buttonConfigs.header) && ButtonsTemplate(buttonConfigs.header) || header;
    return React.createElement(Dialog, Object.assign({
      contentStyle: {
        width: 'auto'
      },
      visible: visible,
      closable: true,
      id: id,
      onHide: onHide,
      footer: footerProps,
      header: HeaderProps,
      closeOnEscape: true
    }, props), children);
  };
  function ButtonsTemplate(configs) {
    if (!Array.isArray(configs) || configs.length < 1) {
      return null;
    }
    const buttons = configs.map((button, index) => {
      button = Object.fromEntries(Object.entries(button).filter(([key, value]) => key && value));
      return React.createElement(ActionButton, Object.assign({}, button, {
        onClick: () => {
          setVisible(false);
          button.onClick();
        },
        hide: button.hide,
        key: index
      }));
    });
    return React.createElement("div", {
      className: 'p-dialog'
    }, buttons);
  }
  return React.createElement("div", null, triggerButton(visible), dialog(visible));
}
function Modal({
  children,
  ...props
}) {
  return React.createElement("div", null, React.createElement(ModalBase, Object.assign({}, props), children));
}
function ActionButton({
  ...props
}) {
  const promptId = UniqueComponentId(`propmt-button-${(props === null || props === void 0 ? void 0 : props.name) || ''}`);
  return React.createElement(Button, Object.assign({}, props, {
    id: promptId,
    name: props === null || props === void 0 ? void 0 : props.name
  }));
}
function PromptModal({
  buttonLabel = 'Open',
  labelYes = 'Yes',
  labelNo = 'No',
  onYes,
  onNo,
  children
}) {
  const handler = answer => answer === 'yes' ? onYes && onYes() : onNo && onNo();
  const modalBase = React.createElement(ModalBase, {
    status: false,
    buttonLabel: buttonLabel,
    buttonConfigs: {
      footer: [{
        label: labelYes,
        className: 'bg-green-100 text-green-700 align-right',
        onClick: () => handler('yes'),
        hide: false
      }, {
        label: labelNo,
        className: 'bg-pink-100 text-pink-700 align-left',
        onClick: () => handler('no'),
        hide: false
      }]
    }
  }, children);
  return React.createElement("div", null, modalBase);
}
function TabModalWrapper({
  steps = [],
  children
}) {
  const tabList = React.createElement("div", null, React.createElement(TabList, null, steps.map((step, index) => {
    const fieldDisabled = !!step.disabled;
    return React.createElement(Tab, {
      key: index,
      disabled: fieldDisabled,
      style: fieldDisabled ? {
        cursor: 'not-allowed',
        opacity: 0.5
      } : {}
    }, step.label);
  })));
  const tabPanels = steps.map((step, index) => React.createElement(TabPanel, {
    key: index
  }, step.content(step.params || null)));
  return children({
    tabList,
    tabPanels,
    stepData: steps
  });
}
function TabModal({
  status = false,
  tabIndex: tabInd = 0,
  footer,
  children,
  ...props
}) {
  const [tabIndex, setTabIndex] = useState(tabInd);
  return React.createElement("div", null, React.createElement(ModalBase, {
    status: status
  }, React.createElement(TabModalWrapper, Object.assign({}, props), ({
    tabList,
    tabPanels
  }) => {
    return React.createElement("div", {
      className: 'mt-5 flex'
    }, React.createElement(Tabs, {
      selectedIndex: tabIndex,
      onSelect: index => setTabIndex(index)
    }, children({
      tabList,
      tabPanels
    })));
  })));
}
var index = {
  Modal,
  TabModal,
  PromptModal,
  ActionButton
};

export default index;
export { ActionButton, Modal, ModalBase, PromptModal, TabModal, TabModalWrapper };
//# sourceMappingURL=index.modern.js.map
