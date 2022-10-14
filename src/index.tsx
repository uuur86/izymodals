/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button, ButtonProps } from 'primereact/button'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { ModalPropsInterface, PropmtOptionsInterface, YesNo } from 'izymodals'

/**
 * Modals
 */
export function ModalBase({
  status = false,
  header = false,
  footer = false,
  children
}: ModalPropsInterface) {
  const [modalStatus, setModalStatus] = useState(status)
  const modalHeader = header || <div />
  const modalFooter = footer || <div />

  useEffect(() => {
    setModalStatus(status)
  }, [status])

  return (
    <Dialog
      visible={modalStatus}
      onHide={() => setModalStatus(false)}
      //  style={{ width: '100vw' }}
      header={modalHeader}
      footer={modalFooter}
    >
      {children}
    </Dialog>
  )
}

export function PromptModal({
  status = false,
  promptConfig,
  children
}: ModalPropsInterface) {
  const {
    labelYes,
    labelNo,
    onYes = () => {},
    onNo = () => {},
    onCancel = () => {}
  }: PropmtOptionsInterface = { ...promptConfig }

  const onClickAction = (answer: YesNo) => {
    if (answer === 'yes') {
      onYes()
    } else if (answer === 'no') {
      onNo()
    } else {
      onCancel()
    }
    status = false
  }

  const PromptButton: any = (props: ButtonProps) => {
    return <Button {...props} />
  }

  const analizPromt = (
    <div className='flex justify-content-end'>
      <PromptButton
        className='bg-pink-100 text-pink-700'
        label={labelNo}
        onClick={() => onClickAction('no')}
      />
      <PromptButton
        className='bg-green-100 text-green-700'
        label={labelYes}
        onClick={() => onClickAction('yes')}
      />
    </div>
  )

  return (
    <ModalBase status={status} footer={analizPromt}>
      {children}
    </ModalBase>
  )
}

export function TabModalWrapper({
  steps = [],
  children
}: ModalPropsInterface): any {
  const tabList = (
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
  )

  const tabPanels = steps.map((step: any, index: number) => (
    <TabPanel key={index} style={{ width: '100%' }}>
      {step.content(step.params || null)}
    </TabPanel>
  ))

  return children({ tabList, tabPanels, stepData: steps })
}

export function TabModal({
  status = false,
  children,
  footer,
  tabIndex: tabIndexDefault = 0,
  ...props
}: any): any {
  const [tabIndex, setTabIndex] = useState(tabIndexDefault)

  return (
    <ModalBase status={status} footer={footer}>
      <TabModalWrapper {...props}>
        {({ tabList, tabPanels }: any) => {
          return (
            <div>
              <div className='mt-5 flex'>
                <Tabs
                  selectedIndex={tabIndex}
                  onSelect={(index: any) => setTabIndex(index)}
                >
                  {children({ tabList, tabPanels })}
                </Tabs>
              </div>
              {footer}
            </div>
          )
        }}
      </TabModalWrapper>
    </ModalBase>
  )
}

export default { ModalBase, PromptModal, TabModalWrapper, TabModal }
