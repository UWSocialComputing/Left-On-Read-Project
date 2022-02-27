import React from 'react';

function Banner() {
    return (
        <div style={styles.main}>
            <h1>BANNER THING HERE</h1>
        </div>
    )
}

const styles = {
    main: {
        position: 'fixed',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'red',
        zIndex: '1000',
        fontSize: '80px',
        pointerEvents: 'none'
    }
}

export default Banner;