import React from "react";
import { Swapi } from "../class/Swapi";

interface IPeopleInfoProps {
    id?: number;
};
  
interface IPeopleInfoState {
    data?: {
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
            data : {}
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.getData();
        }
    }

    getData() {
        if (!this.props.id) return;
        Swapi.getPeopleById(this.props.id).then((response) => {
            this.setState({ data : response.data });
        });
    }

    render() {
        return (
            <div className={ `peopleInfo ${(this.state?.data?.name) ? '': 'hide'}` }>
                <p>
                    Name: { this.state?.data?.name }
                </p>
                <p>
                    Height: { this.state?.data?.height }
                </p>
                <p>
                    Mass: { this.state?.data?.mass }
                </p>
                <p>
                    Hair Color: { this.state?.data?.hair_color }
                </p>
                <p>
                    Skin Color: { this.state?.data?.skin_color }
                </p>
                <p>
                    Eye Color: { this.state?.data?.eye_color }
                </p>
            </div>
        );
    }
}