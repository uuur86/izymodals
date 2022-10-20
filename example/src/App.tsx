import React from 'react'
import { TabModal, PromptModal } from 'izymodals'

const App = () => {
  const modalsVisible = {
    prompt1: false,
    prompt2: false,
    tab1: false
  }
  const Container = ({ question, yes, no, children }: any) => {
    return (
      <div style={{ width: '100%' }}>
        {children}
        <PromptModal
          yes={yes}
          no={no}
          onYes={() => {
            console.log('Yes')
          }}
          onNo={() => {
            console.log('No')
          }}
        >
          {question}
        </PromptModal>
      </div>
    )
  }

  const steps = [
    {
      label: 'Step 1',
      content: Container,
      params: {
        status: modalsVisible.prompt1,
        question: 'Do you like this modal?',
        yes: 'yes',
        no: 'nope',
        children: 'Step 1 Qestion'
      }
    },
    {
      label: 'Step 2',
      content: Container,
      params: {
        status: modalsVisible.prompt2,
        question: 'Do you recommend it to your friend?',
        yes: 'sure',
        no: 'no, I do not!',
        children: 'Step 2 Question'
      }
    }
  ]

  return (
    <div className='flex justify-content-between my-2 flex-wrap'>
      <PromptModal
        onYes={() => {
          console.log('Modal opened')
        }}
        onNo={() => {
          console.log('Canceled')
        }}
      >
        Do you want to open TabModal?
      </PromptModal>
      <div>
        <div className='flex gap-1 flex-wrap'>
          <TabModal status={modalsVisible.tab1} steps={steps}>
            {({ tabList, tabPanels }: any) => (
              <div className='col-12 flex'>
                <div className='col-2'>
                  <div className='card'>
                    <div className='flex align-items-center flex-column '>
                      {tabList}
                    </div>
                  </div>
                </div>
                <div className='col-10'>
                  <div className='flex flex-column'>{tabPanels}</div>
                </div>
              </div>
            )}
          </TabModal>
        </div>
      </div>
    </div>
  )
}

export default App
