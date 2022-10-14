# izymodals

> A Wizard library that creats React Modals

[![NPM](https://img.shields.io/npm/v/izymodals.svg)](https://www.npmjs.com/package/izymodals) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save izymodals
```

## Usage

```tsx
import React, { Component } from 'react'

import PropmtModal from 'izymodals'

class ExamplePropmtModal extends Component {
  render() {
    <div>
      <PromptModal status promptConfig={{ labelYes: 'Yes', labelNo: 'No' }}>
        AA
      </PromptModal>
    </div>
  }
}

class ExampleTabModal extends Component {
  render() {
    <div>
        <TabModal steps={steps} tabIndex={activeIndex} footer={footerButtons}>
        {({ tabList, tabPanels }: any) => {
            return (
                <div className="col-12 flex">
                    <div className="col-2">
                        <div className="card">
                            <div className="flex align-items-center flex-column ">
                                {tabList}
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="flex flex-column">{tabPanels}</div>
                    </div>
                </div>
            );
        }}
        </TabModal>
    </div>
  }
}
```

## License

MIT © [uuur86](https://github.com/uuur86)
