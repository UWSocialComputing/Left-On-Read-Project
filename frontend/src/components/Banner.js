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
        bottom: '0',
        left: '0',
        right: '0',
        padding: '20px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'red',
        color: 'white'
    }
}

export default Banner;