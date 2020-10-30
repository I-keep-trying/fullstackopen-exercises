import React from 'react';

interface HeaderProps {
    courseName: string;
}

const Header: React.FC<HeaderProps> = (props) => {

    return (
        <div className="App">
            <header className="App-header">
            <h1>{props.courseName} </h1>
            </header>
        </div>
    )
}

export default Header