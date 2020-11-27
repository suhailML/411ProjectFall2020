import React from 'react';

class App2 extends React.Component {

    render() {
        //inline styles can dynamically change styles
        const date = new Date (2020, 12, 3, 12)
        const hour = date.getHours();
        const style = {
            color: 'blue',
            backgroundColor: 'yellow',
            //num value is default px, any other unit is a string
            //psuedo-selectors 
            width: 240
        }
        if (hour <= 2) {
            style.color = 'brown'
        }
        return (
            <div className="sidebar">
                {/*style prop takes an object for inline styles in JSX*/}
                <h1 style={{color: 'yellow', backgroundColor: 'blue'}}> hello worlds</h1>
                <h2 style={style}> bye worlds</h2>
            </div>
        )
    }
}

export default App2