/* eslint-disable no-unused-vars */
import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Button } from 'primereact/button'
import { UniqueComponentId } from 'primereact/utils'
import {
  ButtonPropsInterface,
  ModalPropsInterface,
  PromptModalPropsInterface,
  TabModalPropsInterface,
  TabModalWrapPropsInterface
} from 'izymodals'
import PrimeReact from 'primereact'
import 'react-tabs/style/react-tabs.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import 'primereact/resources/primereact.min.css'
/**
 * Modals
 */
export function ModalBase({
  buttonLabel = 'Open Modal',
  buttonConfigs = {},
  status = false,
  header = false,
  footer = false,
  onClose = () => {},
  children,
  ...props
}: ModalPropsInterface) {
  const id = UniqueComponentId()
  const [visible, setVisible] = React.useState(false)

  const triggerButton = (status: boolean) => {
    return (
      <ActionButton
        onClick={() => !status && setVisible(true)}
        disabled={status}
        label={buttonLabel}
      />
    )
  }

  const onHide = () => {
    onClose()
    setVisible(false)
  }

  const dialog = (visible: boolean) => {
    const footerProps =
      (buttonConfigs?.footer && ButtonsTemplate(buttonConfigs.footer)) || footer
    const HeaderProps =
      (buttonConfigs?.header && ButtonsTemplate(buttonConfigs.header)) || header
    return (
      <Dialog
        contentStyle={{ width: 'auto' }}
        visible={visible}
        closable
        id={id}
        onHide={onHide}
        footer={footerProps}
        header={HeaderProps}
        closeOnEscape
        {...props}
      >
        {children}
      </Dialog>
    )
  }

  function ButtonsTemplate(
    configs: ButtonPropsInterface[]
  ): PrimeReact.DialogTemplateType {
    if (!Array.isArray(configs) || configs.length < 1) {
      return null
    }
    const buttons = configs.map((button: any, index: number) => {
      button = Object.fromEntries(
        Object.entries(button).filter(([key, value]) => key && value)
      )

      return (
        <ActionButton
          {...button}
          onClick={() => {
            setVisible(false)

            button.onClick()
          }}
          hide={button.hide}
          key={index}
        />
      )
    })

    return <div className='p-dialog'>{buttons}</div>
  }

  return (
    <div>
      {triggerButton(visible)}
      {dialog(visible)}
    </div>
  )
}

export function Modal({ children, ...props }: ModalPropsInterface) {
  return (
    <div>
      <ModalBase {...props}>{children}</ModalBase>
    </div>
  )
}

export function ActionButton({ ...props }) {
  const promptId = UniqueComponentId(`propmt-button-${props?.name || ''}`)
  return <Button {...props} id={promptId} name={props?.name} />
}

export function PromptModal({
  buttonLabel = 'Open',
  labelYes = 'Yes',
  labelNo = 'No',
  onYes,
  onNo,
  children
}: PromptModalPropsInterface) {
  const handler = (answer: 'yes' | 'no') =>
    answer === 'yes' ? onYes && onYes() : onNo && onNo()

  const modalBase = (
    <ModalBase
      status={false}
      buttonLabel={buttonLabel}
      buttonConfigs={{
        footer: [
          {
            label: labelYes,
            className: 'bg-green-100 text-green-700 align-right',
            onClick: () => handler('yes'),
            hide: false
          },
          {
            label: labelNo,
            className: 'bg-pink-100 text-pink-700 align-left',
            onClick: () => handler('no'),
            hide: false
          }
        ]
      }}
    >
      {children}
    </ModalBase>
  )

  return <div>{modalBase}</div>
}

export function TabModalWrapper(props: TabModalPropsInterface) {
  const { steps = [], children } = props
  const tabList = (
    <div>
      <TabList>
        {steps.map((step: any, index: number) => {
          const fieldDisabled = !!step.disabled
          return (
            <Tab
              key={index}
              disabled={fieldDisabled}
              style={
                fieldDisabled
                  ? {
                      cursor: 'not-allowed',
                      opacity: 0.5
                    }
                  : {}
              }
            >
              {step.label}
            </Tab>
          )
        })}
      </TabList>
    </div>
  )

  const tabPanels = steps.map((step: any, index: number) => (
    <TabPanel key={index}>{step.content(step.params || null)}</TabPanel>
  ))

  return children({ tabList, tabPanels, stepData: steps })
}

export function TabModal({
  status = false,
  footer,
  children,
  ...props
}: TabModalPropsInterface) {
  const defaultIndex = props?.tabIndex || 0
  const [tabIndex, setTabIndex] = React.useState(defaultIndex)

  return (
    <div>
      <ModalBase status={status}>
        <TabModalWrapper {...props}>
          {({ tabList, tabPanels }: TabModalWrapPropsInterface) => {
            return (
              <div className='mt-5'>
                <Tabs
                  selectedIndex={tabIndex}
                  onSelect={(index: number) => setTabIndex(index)}
                >
                  {children({ tabList, tabPanels })}
                </Tabs>
              </div>
            )
          }}
        </TabModalWrapper>
      </ModalBase>
    </div>
  )
}

export default {
  Modal,
  ModalBase,
  TabModal,
  PromptModal,

  ActionButton
}
