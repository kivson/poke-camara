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

    proposicao_tooltip: Observable<string>;

    congressista: Observable<Congressista>;

    constructor(public congressistaService: CongressistaService) {
    }

    ngOnInit() {
        this.congressista = this.congressistaService.by_parlamenta_id(this.parlamentarId);


        this.proposicao_tooltip = this.congressista.map(cong=> {
            let lista = [];
            for (var sigla in cong.proposicoes_stats){
                lista.push(this.congressistaService.nome_completo_proposicao(sigla)+ ' - ' + cong.proposicoes_stats[sigla]) ;
            }
            return '<b>Proposições:</b><br>' + lista.join(';<br>')
            }
        )
    }

}
