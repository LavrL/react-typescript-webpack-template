import * as React from 'react';
import './Home.css';

interface HomeProps {
    name: string;
    age: number;
}

export class Home extends React.Component<HomeProps, {}> {
    render() {
        return (
            <div className="abc">
                Hello, there {this.props.name},
                you are {this.props.age}, right?
            </div>
        )
    }
}