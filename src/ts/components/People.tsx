import React from 'react';
import { PeopleInfo } from './PeopleInfo';
import { Swapi } from '../class/Swapi';

type SuggestionListType = {
    name: string,
    id: number
};

interface IPeopleProps {};
  
interface IPeopleState {
    suggestions?: Array<SuggestionListType>,
    peopleInfo?: number
};

export class People extends React.Component<IPeopleProps, IPeopleState> {

    private inputTimeout;

    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            peopleInfo: undefined
        };
    }

    onChangeInput = (e) =>  {
        //wait if User is still typing, clear previous timeout if needed
        if (this.inputTimeout) clearTimeout(this.inputTimeout);
        this.inputTimeout = setTimeout(() => {
            //clear suggestions if input is empty
            if (!e.target.value) {
                this.setState({ suggestions: [] });
                return;
            }
            //Update Suggestions with current input value
            Swapi.searchPeople(e.target.value).then((response) => {
                if (!response.data) return;
                const names = response.data.results.map((arr) => {
                    const id = arr.url.split('/').at(-2);
                    return { name: arr.name, id: id } as SuggestionListType;
                });
                this.setState({ suggestions: names });
            });
        }, 500);
    }

    //Update PeopleInfo component when user clicks new Suggestion
    clickSuggestion = (e) => {
        this.setState({ peopleInfo: e.target.id});
    }

    render() {
        const suggestionList = this.state.suggestions?.map((item, test) =>
            <li key={item.id.toString()} id={ String(item.id) } onClick={this.clickSuggestion}>
                { item.name }
            </li>
        );
        return (
            <div>
                <label htmlFor="search">Search our Star Wars People Database</label>
                <input id="search" type="search" name="search" onChange={this.onChangeInput}/>
                
                { this.state.suggestions &&
                    <ul>
                        { suggestionList }
                    </ul>
                }
                <PeopleInfo id={ this.state.peopleInfo } />
            </div>
        );
    }
}