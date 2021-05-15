import axios from 'axios';
export default class EditorService {
    constructor(){
        this.saveDataAPI = 'http://localhost:8080/save';
        this.getDataAPI = 'http://localhost:8080/getById/';
    }
    saveData(payload) {
        return new Promise((resolve, reject) => {
            axios.post(this.saveDataAPI,payload).then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log('In Function saveEditorData, Error: '+error);
                reject();
            });
        });
    }
    getData(id){
        return new Promise((resolve, reject) => {
            axios.get(this.getDataAPI+id).then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log('In Function saveEditorData, Error: '+error);
                reject();
            });
        });
    }
}