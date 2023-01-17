const axios = require('axios').default;

class SwapiClass {
    baseUrl: string;

    constructor() {
        this.baseUrl = "https://swapi.dev/api/";
    }

    //TODO Replace String with Type Endpoint here
    getEndpointUrl(endpoint: string) {
        switch(endpoint) { 
            case 'people':{
                return `${this.baseUrl}people`;
            }
        }
    }

    async getPeopleById(id : number) {
        return axios.get(`${this.getEndpointUrl('people')}/${id}`);
    }

    async searchPeople(searchString: string) {
        return axios.get(`${this.getEndpointUrl('people')}/?search=${searchString}`);
    }
}

export const Swapi = new SwapiClass();