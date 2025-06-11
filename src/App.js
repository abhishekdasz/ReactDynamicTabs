import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DynamicTabs from './Components/DynamicTabs';
import TabMenu from './Components/TabMenu';


const App = () => {
  return (
    <div>
      <h1> Dynamic Tabs </h1>
      <DynamicTabs/>

      <TabMenu/>
    </div>
  )
}

export default App