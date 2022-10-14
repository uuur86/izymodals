import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TabList, Tab, TabPanel, Tabs } from 'react-tabs';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _excluded = ["status", "children", "footer", "tabIndex"];
function ModalBase(_ref) {
  var _ref$status = _ref.status,
    status = _ref$status === void 0 ? false : _ref$status,
    _ref$header = _ref.header,
    header = _ref$header === void 0 ? false : _ref$header,
    _ref$footer = _ref.footer,
    footer = _ref$footer === void 0 ? false : _ref$footer,
    children = _ref.children;
  var _useState = useState(status),
    modalStatus = _useState[0],
    setModalStatus = _useState[1];
  var modalHeader = header || React.createElement("div", null);
  var modalFooter = footer || React.createElement("div", null);
  useEffect(function () {
    setModalStatus(status);
  }, [status]);
  return React.createElement(Dialog, {
    visible: modalStatus,
    onHide: function onHide() {
      return setModalStatus(false);
    },
    header: modalHeader,
    footer: modalFooter
  }, children);
}
function PromptModal(_ref2) {
  var _ref2$status = _ref2.status,
    status = _ref2$status === void 0 ? false : _ref2$status,
    promptConfig = _ref2.promptConfig,
    children = _ref2.children;
  var _promptConfig = _extends({}, promptConfig),
    labelYes = _promptConfig.labelYes,
    labelNo = _promptConfig.labelNo,
    _promptConfig$onYes = _promptConfig.onYes,
    onYes = _promptConfig$onYes === void 0 ? function () {} : _promptConfig$onYes,
    _promptConfig$onNo = _promptConfig.onNo,
    onNo = _promptConfig$onNo === void 0 ? function () {} : _promptConfig$onNo,
    _promptConfig$onCance = _promptConfig.onCancel,
    onCancel = _promptConfig$onCance === void 0 ? function () {} : _promptConfig$onCance;
  var onClickAction = function onClickAction(answer) {
    if (answer === 'yes') {
      onYes();
    } else if (answer === 'no') {
      onNo();
    } else {
      onCancel();
    }
    status = false;
  };
  var PromptButton = function PromptButton(props) {
    return React.createElement(Button, Object.assign({}, props));
  };
  var analizPromt = React.createElement("div", {
    className: 'flex justify-content-end'
  }, React.createElement(PromptButton, {
    className: 'bg-pink-100 text-pink-700',
    label: labelNo,
    onClick: function onClick() {
      return onClickAction('no');
    }
  }), React.createElement(PromptButton, {
    className: 'bg-green-100 text-green-700',
    label: labelYes,
    onClick: function onClick() {
      return onClickAction('yes');
    }
  }));
  return React.createElement(ModalBase, {
    status: status,
    footer: analizPromt
  }, children);
}
function TabModalWrapper(_ref3) {
  var _ref3$steps = _ref3.steps,
    steps = _ref3$steps === void 0 ? [] : _ref3$steps,
    children = _ref3.children;
  var tabList = React.createElement(TabList, null, steps.map(function (step, index) {
    var fieldDisabled = !!step.disabled;
    return React.createElement(Tab, {
      key: index,
      disabled: fieldDisabled,
      style: fieldDisabled ? {
        cursor: 'not-allowed',
        opacity: 0.5
      } : {}
    }, step.label);
  }));
  var tabPanels = steps.map(function (step, index) {
    return React.createElement(TabPanel, {
      key: index,
      style: {
        width: '100%'
      }
    }, step.content(step.params || null));
  });
  return children({
    tabList: tabList,
    tabPanels: tabPanels,
    stepData: steps
  });
}
function TabModal(_ref4) {
  var _ref4$status = _ref4.status,
    status = _ref4$status === void 0 ? false : _ref4$status,
    children = _ref4.children,
    footer = _ref4.footer,
    _ref4$tabIndex = _ref4.tabIndex,
    tabIndexDefault = _ref4$tabIndex === void 0 ? 0 : _ref4$tabIndex,
    props = _objectWithoutPropertiesLoose(_ref4, _excluded);
  var _useState2 = useState(tabIndexDefault),
    tabIndex = _useState2[0],
    setTabIndex = _useState2[1];
  return React.createElement(ModalBase, {
    status: status,
    footer: footer
  }, React.createElement(TabModalWrapper, Object.assign({}, props), function (_ref5) {
    var tabList = _ref5.tabList,
      tabPanels = _ref5.tabPanels;
    return React.createElement("div", null, React.createElement("div", {
      className: 'mt-5 flex'
    }, React.createElement(Tabs, {
      selectedIndex: tabIndex,
      onSelect: function onSelect(index) {
        return setTabIndex(index);
      }
    }, children({
      tabList: tabList,
      tabPanels: tabPanels
    }))), footer);
  }));
}
var index = {
  ModalBase: ModalBase,
  PromptModal: PromptModal,
  TabModalWrapper: TabModalWrapper,
  TabModal: TabModal
};

export default index;
export { ModalBase, PromptModal, TabModal, TabModalWrapper };
//# sourceMappingURL=index.modern.js.map
