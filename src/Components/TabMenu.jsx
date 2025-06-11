import React from 'react';
import TabsWithCloseButtons from './TabsWithCloseButtons';

const TabMenu = (props) => {
  const handleCopyClick = (value) => {
    navigator.clipboard.writeText(value).catch(err => {
      console.error("An error occurred", err);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([props.regMsg], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = props.buttonLabel + "." + props.language;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id='right-pane' className='rightPanel'>
      <div style={{ borderRadius: '4px', minHeight: '75vh', display: 'flex', backgroundColor: "#F6F8FC", flexDirection: 'row-reverse' }}>
        <span style={{ position: 'absolute', display: 'flex', flexDirection: 'row', fontSize: '15px', gap: '12px', marginTop: '-4px', marginRight: '22px' }}>
          <span data-title='Copy'><img className='copyImg' onClick={() => handleCopyClick(props.regMsg)} alt="Copy" /></span>
          <span data-title='Download'><img className='downloadImg' onClick={handleDownload} alt="Download" /></span>
          <span data-title='Close'><img className='closeImg' onClick={() => props.setisImageClicked(!props.isImageClicked)} alt="Close" /></span>
        </span>

        <TabsWithCloseButtons
          language={props.language}
          regMsg={props.regMsg}
          setRegMsg={props.setRegMsg}
          editorType={props.editorType}
        />
      </div>
    </div>
  );
};

export default TabMenu;
