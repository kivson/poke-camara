import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, AfterViewChecked} from "@angular/core";
import {Observable} from "rxjs";
import {Congressista} from "../model/congressista";
import {CongressistaService} from "../services/congressista.service";

declare var $;

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit{

    congresistas:Observable<Congressista[]>;


    constructor(public congressistaService: CongressistaService) {
    }

    ngOnInit() {
        this.congresistas = this.congressistaService.todos_congressistas;

    }

    filtrar(nome:string){
        this.congresistas = this.congressistaService.todos_congressistas.map(
            congresistas => congresistas.filter(
                congresista => congresista.nomeParlamentar.toLowerCase().indexOf(nome.toLowerCase()) != -1
            )
        )
    }

}
