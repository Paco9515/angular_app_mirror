import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class ConceptoService {

url: String;

    constructor(
        private http: HttpClient,
    private constants: ConstantsService
    ) {
        this.url = this.constants.url;
    }

    getConceptos(){
        return this.http.get(`${this.url}/get_conceptos`);
    }
    
}