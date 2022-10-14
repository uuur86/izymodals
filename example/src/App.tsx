import React from 'react'
import { TabModal, PromptModal } from 'izymodals'

const App = () => {
  const [status, setStatus] = React.useState(false)
  const Prompt = ({ yes, no, children }: any) => (
    <PromptModal status={status} promptConfig={{ labelYes: yes, labelNo: no }}>
      Click me {children}
    </PromptModal>
  )

  const Container = (
    { yes, no, status, children }: any = { status: false }
  ) => {
    return (
      <div style={{ width: '100%' }}>
        <Prompt yes={yes} no={no} status={status}>
          {children}
        </Prompt>
      </div>
    )
  }

  const steps = [
    {
      label: 'Step 1',
      content: Container,
      params: { yes: 'yes', no: 'nope', children: 'Do you like this modal?' }
    },
    {
      label: 'Step 2',
      content: Container,
      params: {
        yes: 'sure',
        no: 'no, I do not!',
        children: 'Do you recommend it to your friend?'
      }
    }
  ]

  return (
    <div className='flex justify-content-between my-2 flex-wrap'>
      <div>
        <div className='flex gap-1 flex-wrap'>
          <TabModal status steps={steps}>
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
                  <div className='flex flex-column'>
                    <button onClick={() => setStatus(true)}>Open</button>
                    {tabPanels}
                  </div>
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
