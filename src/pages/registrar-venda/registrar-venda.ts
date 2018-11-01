import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController, Searchbar } from 'ionic-angular';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { text } from '@angular/core/src/render3/instructions';

@Component({
    selector: 'page-registrar-venda',
    templateUrl: 'registrar-venda.html',
})
export class RegistrarVendaPage {

    cliente: any;
    produtos: any = [];
    pagamentos: any = [];
    observacoes: any = [];

    total: any = 0;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
    }

    adicionarItem = () => {
        this.actionSheetCtrl.create({
            title: 'Adicionar a venda',
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: 'Cliente',
                    icon: 'person',
                    handler: () => {
                        this.selecionaCliente();
                    }
                },
                {
                    text: 'Produto',
                    icon: 'basket',
                    handler: () => {
                        this.selecionaProduto('add');
                    }
                },
                {
                    text: 'Pagamento',
                    icon: 'cash',
                    handler: () => {
                        if (this.produtos.length > 0) {
                            this.selecionaPagamento('add');
                        } else {
                            this.alertCtrl.create({
                                title: 'Erro',
                                message: 'Registre um produto primeiro!',
                                buttons: [
                                    {
                                        text: 'Ok'
                                    }
                                ]
                            }).present();
                        }

                    }
                },
                {
                    text: 'Observação',
                    icon: 'text'
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        }).present();
    }


    // Produto
    menuProduto = (index) => {
        let produto = this.produtos[index];
        this.actionSheetCtrl.create({
            title: 'Menu do produto',
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: 'Alterar quantidade',
                    handler: () => {
                        this.alterarQuantidade(produto);
                    }
                },
                {
                    text: 'Alterar produto',
                    handler: () => {
                        this.selecionaProduto('update', index);
                    }
                },
                {
                    text: 'Remover produto',
                    role: 'destructive',
                    handler: () => {
                        this.removeProduto(index);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        }).present();
    }

    alterarQuantidade = async (produto) => {
        let quantidade = await this.alertValor('Bolsa Stylus', 'Quantidade:', 'quantidade', 'tel');
        produto.quantity = quantidade;
        this.calcularValor();
    }

    selecionaProduto = (event, index?) => {
        let produto = this.modalCtrl.create(PesquisaPage, {
            title: 'Produtos',
            data: [
                {
                    id: 1,
                    name: 'Bolsa',
                    quantity: 1,
                    price: 0
                },
                {
                    id: 2,
                    name: 'Oculos',
                    quantity: 1,
                    price: 0
                },
                {
                    id: 3,
                    name: 'Relógio',
                    quantity: 1,
                    price: 0
                },
            ],
            seachbar: true
        });

        produto.onDidDismiss(async data => {

            if (data) {
                let produto = data;

                if (event == 'add') {
                    let preco = await this.alertValor(produto.name, 'Valor: ', 'valor', 'tel');
                    produto.price = preco;
                    this.produtos.push(produto);
                } else if (event == 'update') {
                    let preco = await this.alertValor(produto.name, 'Valor: ', 'valor', 'tel');
                    produto.price = preco;
                    this.produtos[index] = produto;
                }

                this.calcularValor();
            }

        });

        produto.present();
    }

    removeProduto = (index) => {
        this.produtos.splice(index, 1);
        this.pagamentos = [];
        this.calcularValor();
    }

    // Cliente

    selecionaCliente = () => {
        this.actionSheetCtrl.create({
            title: 'Seleciona uma opção',
            buttons: [
                {
                    text: 'Novo',
                    handler: () => {

                    }
                },
                {
                    text: 'Existente',
                    handler: () => {
                        let cliente = this.modalCtrl.create(PesquisaPage, {
                            title: 'Clientes',
                            data: [
                                {
                                    id: 1,
                                    name: 'Ana Paula',
                                }
                            ],
                            Searchbar: true,

                        });

                        cliente.onDidDismiss(async data => {
                            if (data) {
                                this.cliente = data;
                            }
                        });

                        cliente.present();
                    }
                }
            ]
        }).present();
    }

    menuCliente = () => {
        let cliente = this.cliente;
        this.actionSheetCtrl.create({
            title: 'Menu do cliente',
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: 'Alterar cliente',
                    handler: () => {
                        this.selecionaCliente();
                    }
                },
                {
                    text: 'Remover cliente',
                    role: 'destructive',
                    handler: () => {
                        this.removeCliente(cliente);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        }).present();
    }

    removeCliente = (cliente) => {
        this.cliente = undefined;
    }

    // Pagamento
    selecionaPagamento = (event, index?) => {
        let pagamento = this.modalCtrl.create(PesquisaPage, {
            title: 'Pagamento',
            data: [
                {
                    id: 1,
                    name: 'Dinheiro',
                },
                {
                    id: 2,
                    name: 'Crédito',
                },
                {
                    id: 3,
                    name: 'Fiado',
                },
            ],
            seachbar: true
        });

        pagamento.onDidDismiss(async data => {

            if (data) {
                let pagamento = data;

                if (event == 'add') {
                    let valor = await this.alertValor(pagamento.name, 'Valor: ', 'valor', 'tel');
                    pagamento.value = valor;
                    this.pagamentos.push(pagamento);
                } else if (event == 'update') {
                    let valor = await this.alertValor(pagamento.name, 'Valor: ', 'valor', 'tel');
                    pagamento.value = valor;
                    this.pagamentos[index] = pagamento;
                }

                this.calcularValor();
            }

        });

        pagamento.present();
    }

    menuPagamento = (index) => {
        let pagamento = this.pagamentos[index];
        this.actionSheetCtrl.create({
            title: 'Menu de pagamento',
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: 'Alterar método',
                    handler: () => {
                        this.selecionaPagamento('update', index);
                    }
                },
                {
                    text: 'Remover pagamento',
                    role: 'destructive',
                    handler: () => {
                        this.removePagamento(index);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        }).present();
    }

    removePagamento = (index) => {
        this.pagamentos.splice(index, 1);
        this.calcularValor();
    }

    // Helpers

    calcularValor = () => {
        this.total = 0;
        this.produtos.forEach(produto => {
            this.total += (produto.price * produto.quantity);
        });

        this.pagamentos.forEach(pagamento => {
            this.total -= pagamento.value;
        });
    }

    alertValor = (titulo, message, inputName, inputType) => {
        return new Promise((resolve, reject) => {
            this.alertCtrl.create({
                title: titulo,
                subTitle: message,
                inputs: [
                    {
                        name: inputName,
                        type: inputType,
                        label: inputName,
                        min: 1
                    }
                ],
                buttons: [
                    {
                        text: 'Cancelar',
                        handler: data => {
                            resolve(false);
                        }
                    },
                    {
                        text: 'Salvar',
                        handler: data => {
                            resolve(data[inputName]);
                        }
                    }
                ]
            }).present();
        });

    }
}
