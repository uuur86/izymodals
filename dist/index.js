function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var dialog = require('primereact/dialog');
var reactTabs = require('react-tabs');
var button = require('primereact/button');
var utils = require('primereact/utils');
require('react-tabs/style/react-tabs.css');
require('primeicons/primeicons.css');
require('primeflex/primeflex.min.css');
require('primereact/resources/primereact.min.css');

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
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
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

var _excluded = ["buttonLabel", "buttonConfigs", "status", "header", "footer", "onClose", "children"],
  _excluded2 = ["children"],
  _excluded3 = ["status", "footer", "children"];
function ModalBase(_ref) {
  var _ref$buttonLabel = _ref.buttonLabel,
    buttonLabel = _ref$buttonLabel === void 0 ? 'Open Modal' : _ref$buttonLabel,
    _ref$buttonConfigs = _ref.buttonConfigs,
    buttonConfigs = _ref$buttonConfigs === void 0 ? {} : _ref$buttonConfigs,
    _ref$header = _ref.header,
    header = _ref$header === void 0 ? false : _ref$header,
    _ref$footer = _ref.footer,
    footer = _ref$footer === void 0 ? false : _ref$footer,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
    children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var id = utils.UniqueComponentId();
  var _React$useState = React.useState(false),
    visible = _React$useState[0],
    setVisible = _React$useState[1];
  var triggerButton = function triggerButton(status) {
    return React.createElement(ActionButton, {
      onClick: function onClick() {
        return !status && setVisible(true);
      },
      disabled: status,
      label: buttonLabel
    });
  };
  var onHide = function onHide() {
    onClose();
    setVisible(false);
  };
  var dialog$1 = function dialog$1(visible) {
    var footerProps = (buttonConfigs === null || buttonConfigs === void 0 ? void 0 : buttonConfigs.footer) && ButtonsTemplate(buttonConfigs.footer) || footer;
    var HeaderProps = (buttonConfigs === null || buttonConfigs === void 0 ? void 0 : buttonConfigs.header) && ButtonsTemplate(buttonConfigs.header) || header;
    return React.createElement(dialog.Dialog, Object.assign({
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
    var buttons = configs.map(function (button, index) {
      button = Object.fromEntries(Object.entries(button).filter(function (_ref2) {
        var key = _ref2[0],
          value = _ref2[1];
        return key && value;
      }));
      return React.createElement(ActionButton, Object.assign({}, button, {
        onClick: function onClick() {
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
  return React.createElement("div", null, triggerButton(visible), dialog$1(visible));
}
function Modal(_ref3) {
  var children = _ref3.children,
    props = _objectWithoutPropertiesLoose(_ref3, _excluded2);
  return React.createElement("div", null, React.createElement(ModalBase, Object.assign({}, props), children));
}
function ActionButton(_ref4) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref4), _ref4));
  var promptId = utils.UniqueComponentId("propmt-button-" + ((props === null || props === void 0 ? void 0 : props.name) || ''));
  return React.createElement(button.Button, Object.assign({}, props, {
    id: promptId,
    name: props === null || props === void 0 ? void 0 : props.name
  }));
}
function PromptModal(_ref5) {
  var _ref5$buttonLabel = _ref5.buttonLabel,
    buttonLabel = _ref5$buttonLabel === void 0 ? 'Open' : _ref5$buttonLabel,
    _ref5$labelYes = _ref5.labelYes,
    labelYes = _ref5$labelYes === void 0 ? 'Yes' : _ref5$labelYes,
    _ref5$labelNo = _ref5.labelNo,
    labelNo = _ref5$labelNo === void 0 ? 'No' : _ref5$labelNo,
    onYes = _ref5.onYes,
    onNo = _ref5.onNo,
    children = _ref5.children;
  var handler = function handler(answer) {
    return answer === 'yes' ? onYes && onYes() : onNo && onNo();
  };
  var modalBase = React.createElement(ModalBase, {
    status: false,
    buttonLabel: buttonLabel,
    buttonConfigs: {
      footer: [{
        label: labelYes,
        className: 'bg-green-100 text-green-700 align-right',
        onClick: function onClick() {
          return handler('yes');
        },
        hide: false
      }, {
        label: labelNo,
        className: 'bg-pink-100 text-pink-700 align-left',
        onClick: function onClick() {
          return handler('no');
        },
        hide: false
      }]
    }
  }, children);
  return React.createElement("div", null, modalBase);
}
function TabModalWrapper(props) {
  var _props$steps = props.steps,
    steps = _props$steps === void 0 ? [] : _props$steps,
    children = props.children;
  var tabList = React.createElement("div", null, React.createElement(reactTabs.TabList, null, steps.map(function (step, index) {
    var fieldDisabled = !!step.disabled;
    return React.createElement(reactTabs.Tab, {
      key: index,
      disabled: fieldDisabled,
      style: fieldDisabled ? {
        cursor: 'not-allowed',
        opacity: 0.5
      } : {}
    }, step.label);
  })));
  var tabPanels = steps.map(function (step, index) {
    return React.createElement(reactTabs.TabPanel, {
      key: index
    }, step.content(step.params || null));
  });
  return children({
    tabList: tabList,
    tabPanels: tabPanels,
    stepData: steps
  });
}
function TabModal(_ref6) {
  var _ref6$status = _ref6.status,
    status = _ref6$status === void 0 ? false : _ref6$status,
    children = _ref6.children,
    props = _objectWithoutPropertiesLoose(_ref6, _excluded3);
  var defaultIndex = (props === null || props === void 0 ? void 0 : props.tabIndex) || 0;
  var _React$useState2 = React.useState(defaultIndex),
    tabIndex = _React$useState2[0],
    setTabIndex = _React$useState2[1];
  return React.createElement("div", null, React.createElement(ModalBase, {
    status: status
  }, React.createElement(TabModalWrapper, Object.assign({}, props), function (_ref7) {
    var tabList = _ref7.tabList,
      tabPanels = _ref7.tabPanels;
    return React.createElement("div", {
      className: 'mt-5 flex'
    }, React.createElement(reactTabs.Tabs, {
      selectedIndex: tabIndex,
      onSelect: function onSelect(index) {
        return setTabIndex(index);
      }
    }, children({
      tabList: tabList,
      tabPanels: tabPanels
    })));
  })));
}
var index = {
  Modal: Modal,
  ModalBase: ModalBase,
  TabModal: TabModal,
  PromptModal: PromptModal,
  ActionButton: ActionButton
};

exports.ActionButton = ActionButton;
exports.Modal = Modal;
exports.ModalBase = ModalBase;
exports.PromptModal = PromptModal;
exports.TabModal = TabModal;
exports.TabModalWrapper = TabModalWrapper;
exports.default = index;
//# sourceMappingURL=index.js.map
