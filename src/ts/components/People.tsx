import React from 'react';
import { PeopleInfo } from './PeopleInfo';
import { Swapi } from '../class/Swapi';

interface IPeopleProps {};
  
interface IPeopleState {
    suggestions?: Array<Object>,
    peopleInfo?: number
};

export class People extends React.Component<IPeopleProps, IPeopleState> {

    private inputTimeout;

    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            peopleInfo: undefined
        }
    }

    onChangeInput = (e) =>  {
        if (this.inputTimeout) clearTimeout(this.inputTimeout);
        this.inputTimeout = setTimeout(() => {
            if (!e.target.value) return;
            Swapi.searchPeople(e.target.value).then((response) => {
                if (!response.data) return;
                const names = response.data.results.map((arr) => {
                    const id = arr.url.split('/').at(-2);
                    return { name: arr.name, id: id };
                });
                this.setState({ suggestions: names });
            });
        }, 500);
    }

    clickSuggestion = (e) => {
        this.setState({ peopleInfo: e.target.id});
    }

    render() {
        const suggestionList = this.state.suggestions?.map((item, test) =>
            <li key={item.id.toString()} id={item.id} onClick={this.clickSuggestion}>
                { item.name }
            </li>
        );
        return (
            <div>
                <label for="search">Search our Star Wars People Database</label>
                <input id="search" type="search" name="search" onChange={this.onChangeInput}/>
                <ul>
                    { suggestionList }
                </ul>
                <PeopleInfo id={ this.state.peopleInfo }/>
            </div>
        )
    }
}