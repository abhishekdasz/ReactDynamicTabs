import React, { useState, useEffect } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import Editor from "@monaco-editor/react";

const TabsWithCloseButtons = (props) => {
  const mode = document.querySelector("body").getAttribute('data-theme');
  const [activeKey, setActiveKey] = useState("tab-1");
  const [tabs, setTabs] = useState([
    { id: "tab-1", title: "Code Editor", content: "Content of Tab 1" },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const handleCloseTab = (tabId) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    if (activeKey === tabId && updatedTabs.length > 0) {
      setActiveKey(updatedTabs[0].id);
    }
  };

  const handleAddTab = () => {
    const newId = `tab-${tabs.length + 1}`;
    const newTab = {
      id: newId,
      title: `Tab ${tabs.length + 1}`,
      content: `This is content of ${newId}`,
    };
    setTabs([...tabs, newTab]);
    setActiveKey(newId);
  };

  return (
    <div className='tabdivs'>
      <div className="d-flex align-items-center mb-2">
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          className="flex-grow-1"
        >
          {tabs.map((tab) => (
            <Tab
              eventKey={tab.id}
              title={
                <div className="d-flex align-items-center tab-title">
                  {tab.title}
                  <Button
                    variant="link"
                    className="ml-2 p-0"
                    style={{ color: "black", textDecoration: "none", marginLeft: '5px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseTab(tab.id);
                    }}
                  >
                    ×
                  </Button>
                </div>
              }
              key={tab.id}
            >
              <div style={{ height: '78vh', padding: "15px" }}>
                <Editor
                  className="EditorContainer"
                  defaultLanguage={props.language || "javascript"}
                  theme={mode === 'dark' ? "vs-dark" : "light"}
                  value={props.regMsg}
                  onChange={(value) => props.setRegMsg(value)}
                  options={{
                    wordWrap: "on",
                    lineNumbers: "on",
                    scrollbar: { vertical: "visible" }
                  }}
                />
              </div>
            </Tab>
          ))}
        </Tabs>

        {/* "+" Button beside tabs */}
        <div
          onClick={handleAddTab}
          style={{
            cursor: 'pointer',
            padding: '6px 12px',
            border: '1px solid #dee2e6',
            borderRadius: '0.375rem',
            marginLeft: '8px',
            fontSize: '1.2rem',
            userSelect: 'none',
            background: '#fff',
          }}
        >
          ＋
        </div>
      </div>
    </div>
  );
};

export default TabsWithCloseButtons;
