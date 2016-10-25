import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Congressista} from "../model/congressista";


@Injectable()
export class CongressistaService {
    public todos_congressistas:Observable<Congressista[]>;
    maior_presenca:number;
    maior_comissao:number;
    maior_proposicao:number;

    constructor(private http: Http) {
        this.todos_congressistas = this.http.get("/assets/dados/saida.json").map(resp => resp.json());
        this.todos_congressistas.subscribe(congresistas =>{
            this.maior_comissao = Math.max(... congresistas.map(c => c.comissoes_stats['Titular'] || 0));

            this.maior_presenca = Math.max(... congresistas.map(c => c.presencas_stats['Presença']));
            this.maior_proposicao = Math.max(... congresistas.map(c => {
                let total = 0;
                for (var sigla in c.proposicoes_stats){
                    total += c.proposicoes_stats[sigla];
                }
                return total ;
            }));

        })

    }

    by_parlamenta_id(parlaentarId){
        return this.todos_congressistas.flatMap(_=>_).filter(p => p.idParlamentar == parlaentarId).first()
    }

}
