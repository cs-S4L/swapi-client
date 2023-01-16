const axios = require('axios').default;

class SwapiClass {
    baseUrl: string;

    constructor() {
        this.baseUrl = "https://swapi.dev/api/";
    }

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
}

export const Swapi = new SwapiClass();