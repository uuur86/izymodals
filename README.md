# izymodals

> A Wizard library that creats React Modals

[![NPM](https://img.shields.io/npm/v/izymodals.svg)](https://www.npmjs.com/package/izymodals) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save izymodals
```

## Usage

### TabModal Hook Example
```tsx
import { TabModal } from "izymodals";
import { useState } from "react";

const TabExample = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const footerButtons = () => (
    <button onClick={() => setActiveIndex(activeIndex + 1)}>
      Footer {activeIndex}
    </button>
  );

  const Container = ({ children }) => {
    return <div style={{ width: "100%" }}>{children}</div>;
  };

  const steps = [
    {
      label: "Step 1",
      content: Container,
      params: { children: "Do you like this modal?" }
    },
    {
      label: "Step 2",
      content: Container,
      params: {
        children: "Do you recommend it to your friend?"
      }
    }
  ];

  return (
    <TabModal
      status
      steps={steps}
      tabIndex={activeIndex}
      footer={footerButtons}
    >
      {({ tabList, tabPanels }) => {
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
  );
};

export default TabExample;
```

### PromptModal Hook Example
```tsx
import { useState } from "react";
import { PromptModal } from "izymodals";

const PropmtExample = (props) => {
  const [status, setStatus] = useState(false);

  return (
    <div>
      <PromptModal
        status
        promptConfig={{
          labelYes: "yes",
          labelNo: "no",
          onYes: () => setStatus("yes"),
          onNo: () => setStatus("no")
        }}
      >
        Test {status}
      </PromptModal>
    </div>
  );
};

export default PropmtExample;

```

## License

MIT © [uuur86](https://github.com/uuur86)
