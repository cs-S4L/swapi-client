const axios = require('axios').default;

type EndpointType = 'people';

class SwapiClass {
    baseUrl: string;
    readonly PeopleEndpoint = 'people';

    constructor() {
        this.baseUrl = "https://swapi.dev/api/";
    }

    getEndpointUrl(endpoint: EndpointType, searchString?: string) {
        switch(endpoint) { 
            case this.PeopleEndpoint:{
                return `${this.baseUrl}${this.PeopleEndpoint}${(searchString) ? '/?search='+searchString : ''}`;
            }
        };
    }

    async getPeopleById(id : number) {
        return axios.get(`${this.getEndpointUrl(this.PeopleEndpoint)}/${id}`);
    }

    async searchPeople(searchString: string) {
        return axios.get(`${this.getEndpointUrl(this.PeopleEndpoint, searchString)}`);
    }
}

export const Swapi = new SwapiClass();