import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";
import {Congressista} from "../model/congressista";
import {environment} from "../../environments/environment"

@Injectable()
export class CongressistaService {
    todos_congressistas:Observable<Congressista[]>;
    mapa_proposicoes;
    maior_presenca:number;
    maior_comissao:number;
    maior_proposicao:number;

    constructor(private http: Http) {
        this.http.get(environment.baseUrl+"/assets/dados/mapa.json")
            .map(resp => resp.json())
            .subscribe(resp => this.mapa_proposicoes =resp);

        this.todos_congressistas = this.http.get(environment.baseUrl+"/assets/dados/saida.json")
            .map(resp => resp.json())
            .map(congresistas => congresistas.filter(c=> c.condicao == "Titular"))
            .map(congresistas => congresistas.map(c => {
                c.nomeParlamentar = c.nomeParlamentar.toLowerCase();
                return c;
            }))
            .map(congresistas => {
            this.maior_comissao = Math.max(... congresistas.map(c => c.comissoes_stats['Titular'] || 0));

            this.maior_presenca = Math.max(... congresistas.map(c => c.presencas_stats['Presença']));
            this.maior_proposicao = Math.max(... congresistas.map(c => {
                let total = 0;
                for (var sigla in c.proposicoes_stats){
                    total += c.proposicoes_stats[sigla];
                }
                return total;
            }));
            return congresistas.map(congresista => {
                congresista['score'] = {};
                congresista['score']['presenca'] = Math.floor(congresista.presencas_stats['Presença'] / this.maior_presenca * 100);
                congresista['score']['influencia'] = Math.floor(congresista.comissoes_stats['Titular'] / this.maior_comissao * 100);
                let total = 0;
                for (var sigla in congresista.proposicoes_stats){
                    total += congresista.proposicoes_stats[sigla];
                }
                congresista['score']['atividade'] = Math.floor(total / this.maior_proposicao * 100);
                return congresista;
            });
            })
            .cache()

    }
    nome_completo_proposicao(sigla){
        return this.mapa_proposicoes[sigla] || sigla
    }
    by_parlamenta_id(parlaentarId){
        return this.todos_congressistas.flatMap(_=>_).filter(p => p.idParlamentar == parlaentarId).first()
    }

}
