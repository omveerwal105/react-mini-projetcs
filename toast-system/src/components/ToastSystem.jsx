import React, { useEffect, useState } from 'react'

const ToastSystem = () => {
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    const handleToast = (type) => {
        let msg = '';
        if (type === 'success') msg = '✅ Message sent successfully!';
        else if (type === 'error') msg = '❌ Something went wrong!';
        else if (type === 'warning') msg = '⚠️ Be careful!';

        setToast({ visible: true, message: msg, type });

        setTimeout(() => {
            setToast({ visible: false, message: '', type: '' });
        }, 3000);

    }

    return (
        <div>
            <h1>Toast Message</h1>
            {toast.visible && (
                <div className={`toast ${toast.type}`}>
                  {toast.message}
                </div>
            )}

            <button onClick={() => handleToast('success')}>Success Toast</button>
            <button onClick={() => handleToast('error')}>Error Toast</button>
            <button onClick={() => handleToast('warning')}>Warning Toast</button>


        </div>
    )
}

export default ToastSystem