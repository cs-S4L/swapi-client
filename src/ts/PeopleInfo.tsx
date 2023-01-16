import React from "react";
import { Swapi } from "./Swapi";
const axios = require('axios').default;

interface IPeopleInfoProps {
    id: number;
};
  
interface IPeopleInfoState {
    resp?: {
        name?: string,
        height?: number,
        mass?: number,
        hair_color?: string,
        skin_color?: string,
        eye_color?: string
    }
};

export class PeopleInfo extends React.Component<IPeopleInfoProps, IPeopleInfoState> {

    constructor(props) {
        super(props);
        this.state = {
            resp : {}
        }
    }

    componentDidMount() {
        Swapi.getPeopleById(this.props.id).then((response) => {
            console.log('response', response.data);
            this.setState({resp : response.data});
        });
    }

    render() {
        return (
            <div>
                <p>
                    Name: { this.state?.resp?.name }
                </p>
                <p>
                    Height: { this.state?.resp?.height }
                </p>
                <p>
                    Mass: { this.state?.resp?.mass }
                </p>
                <p>
                    Hair Color: { this.state?.resp?.hair_color }
                </p>
                <p>
                    Skin Color: { this.state?.resp?.skin_color }
                </p>
                <p>
                    Eye Color: { this.state?.resp?.eye_color }
                </p>
            </div>
        );
    }
}