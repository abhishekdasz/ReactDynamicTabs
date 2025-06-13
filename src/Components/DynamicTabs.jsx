import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DynamicTabs = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Tab 1', content: 'This is Tab 1 content' },
  ]);
  const [key, setKey] = useState('tab-1');

  const addTab = () => {
    const newId = tabs.length + 1;
    const newKey = `tab-${newId}`;
    const newTab = {
      id: newId,
      key: newKey,
      title: `Tab ${newId}`,
      content: `This is Tab ${newId} content`,
    };
    setTabs([...tabs, newTab]);
    setKey(newTab.key);
  };

  return (
    <div className="container mt-4">
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs">
          {tabs.map((tab) => (
            <Nav.Item key={tab.id}>
              <Nav.Link eventKey={`tab-${tab.id}`}>{tab.title}</Nav.Link>
            </Nav.Item>
          ))}
          {/* "+" Tab Item */}
          <Nav.Item>
            <Nav.Link
              onClick={addTab}
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                paddingTop: '6px',
              }}
              eventKey="add-tab"
            >
              ＋
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          {tabs.map((tab) => (
            <Tab.Pane eventKey={`tab-${tab.id}`} key={tab.id}>
              <div className="p-3 border rounded bg-light">
                {tab.content}
              </div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default DynamicTabs;
