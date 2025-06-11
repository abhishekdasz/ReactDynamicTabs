import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
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
    setKey(newKey);
  };

  return (
    <div className="container mt-4">
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <div className="d-flex align-items-center mb-3">
          <Nav variant="tabs" className="flex-grow-1">
            {tabs.map((tab) => (
              <Nav.Item key={tab.id}>
                <Nav.Link eventKey={`tab-${tab.id}`}>{tab.title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <div
            onClick={addTab}
            style={{
              cursor: 'pointer',
              padding: '6px 12px',
              border: '1px solid #dee2e6',
              borderRadius: '0.375rem',
              marginLeft: '8px',
              fontSize: '1.2rem',
              userSelect: 'none',
            }}
          >
            ＋
          </div>
        </div>

        <Tab.Content>
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
