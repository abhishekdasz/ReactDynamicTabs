import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import TextRenderer from "../util/TextRenderer";
import FormWidgets from "../FormWidgets/FormWidgets";
import TreeComponent from '../util/TreeComponent';
import Editor from "@monaco-editor/react";
import { useTranslation } from 'react-i18next';

const TabsWithCloseButtons = (props) => {
  const { t } = useTranslation();
  const mode = document.querySelector("body").getAttribute('data-theme');
  const [activeKey, setActiveKey] = useState("tab-1");
  const [tabs, setTabs] = useState([
    { id: "tab-1", title: "Code Editor", value: props.regMsg || '' },
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
    const newIdNum = tabs.length + 1;
    const newTab = {
      id: `tab-${newIdNum}`,
      title: `New Tab ${newIdNum}`,
      value: ''
    };
    setTabs([...tabs, newTab]);
    setActiveKey(newTab.id);
  };

  const handleEditorChange = (value, tabId) => {
    const updatedTabs = tabs.map(tab =>
      tab.id === tabId ? { ...tab, value } : tab
    );
    setTabs(updatedTabs);
    if (tabId === 'tab-1') {
      props.setRegMsg(value);
    }
  };

  return (
    <div className='tabdivs'>
      <Tabs
        activeKey={activeKey}
        onSelect={(k) => {
          if (k === "add-tab") {
            handleAddTab();
          } else {
            setActiveKey(k);
          }
        }}
        className="mb-0"
      >
        {tabs.map((tab) => (
          <Tab
            eventKey={tab.id}
            title={
              <div className="d-flex align-items-center tab-title">
                {tab.title}
                {tab.id !== "tab-1" && (
                  <Button
                    variant="link"
                    className="ml-2 p-0"
                    style={{ color: "black", textDecoration: "none", marginLeft: '5px' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent tab switching on close
                      handleCloseTab(tab.id);
                    }}
                  >
                    &times;
                  </Button>
                )}
              </div>
            }
            key={tab.id}
          >
            <div style={{ height: '78vh' }}>
              <Editor
                className="EditorContainer"
                defaultLanguage="java"
                theme={mode === 'dark' ? "vs-dark" : ""}
                value={tab.value}
                onChange={(value) => handleEditorChange(value, tab.id)}
                options={{
                  wordWrap: "on",
                  lineNumbers: "on",
                  scrollbar: { vertical: "visible" }
                }}
              />
            </div>
          </Tab>
        ))}

        {/* ➕ Add New Tab */}
        <Tab
          eventKey="add-tab"
          title={
            <div className="d-flex align-items-center tab-title text-primary">
              ＋
            </div>
          }
          disabled
        />
      </Tabs>
    </div>
  );
};

export default TabsWithCloseButtons;qa