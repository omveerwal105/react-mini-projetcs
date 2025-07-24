import React, { useEffect, useState } from 'react'

const TabsSwitch = () => {
    const [activeTabs, setActiveTabs] = useState('Home');

    const tabs = ['Home', 'Profile', 'Settings'];

    const renderContent = () => {
        switch (activeTabs) {
            case 'Home':
                return <p>Welcome to home tab</p>;
            case 'Profile':
                return <p>Welcome to profile tab</p>;
            case 'Settings':
                return <p>Welocme to the setting tab</p>;
            default:
                return null;
        }
    }

    useEffect(()=>{
        console.log(`Active Tab change to : ${activeTabs}`);
    },[activeTabs]);
    return (
        <div>
        <div style={{ display: 'grid', gap: '10px' }}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTabs(tab)}
                    style={{
                        padding: '10px',
                        fontWeight: activeTabs === tab ? 'bold' : 'normal',
                        backgroundColor: activeTabs === tab ? '#333' : '#eee',
                        color: activeTabs === tab ? 'white' : 'black',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    >{tab}</button>
        ))}

        </div>
        <div style={{marginTop : '20px'}}>{renderContent()}</div>
        </div>
        
    )
}

export default TabsSwitch