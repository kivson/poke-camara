import {Component, OnInit, Input} from "@angular/core";
import {CongressistaService} from "../services/congressista.service";
import {Congressista} from "../model/congressista";
import {Observable} from "rxjs";

@Component({
    selector: 'app-carta',
    templateUrl: './carta.component.html',
    styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

    @Input() parlamentarId;

    congressista: Observable<Congressista>;
    presencas: Observable<number>;
    comissoes: Observable<number>;
    proposicoes: Observable<number>;

    constructor(public congressistaService: CongressistaService) {
    }

    ngOnInit() {
        this.congressista = this.congressistaService.by_parlamenta_id(this.parlamentarId);
        this.presencas = this.congressista.map(c => Math.floor(c.presencas_stats['Presença'] / this.congressistaService.maior_presenca * 1000));
        this.comissoes = this.congressista.map(c => Math.floor(c.comissoes_stats['Titular'] / this.congressistaService.maior_comissao * 1000));
        this.proposicoes = this.congressista.map(c => {
            let total = 0;
            for (var sigla in c.proposicoes_stats){
                total += c.proposicoes_stats[sigla];
            }
            return Math.floor(total / this.congressistaService.maior_proposicao * 1000);
        })
    }

}
