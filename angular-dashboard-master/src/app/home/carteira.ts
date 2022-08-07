export class Carteira{
    id: number
    valor: number
    caixa: string
    descricao: string
    data_valor: string
    Quantidade: number
    Nome: string
    Contato: number
    total: number
    
    constructor(id?: number, valor?: number, caixa?:string, descricao?: string, data_valor?: string, Quantidade?: number, Nome?: string, Contato?: number, total?: number){
        this.id = id
        this.valor = valor
        this.caixa = caixa
        this.descricao = descricao
        this.data_valor = data_valor
        this.Quantidade = Quantidade
        this.Nome = Nome
        this.Contato = Contato
        this.total = total
    }
}