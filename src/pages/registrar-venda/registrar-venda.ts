import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { PesquisaPage } from '../pesquisa/pesquisa';

@Component({
    selector: 'page-registrar-venda',
    templateUrl: 'registrar-venda.html',
})
export class RegistrarVendaPage {

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
                    text: 'Produto',
                    icon: 'basket',
                    handler: () => {
                        this.selecionaProduto('add');
                    }
                },
                {
                    text: 'Pagamento',
                    icon: 'cash'
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
                    text: 'Remover',
                    role: 'destructive',
                    handler: () => {
                        this.removeProduto(produto);
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
        });

        produto.present();
    }
    
    removeProduto = (_produto) => {
        this.produtos = this.produtos.filter(produto => produto.id != _produto.id);
        this.calcularValor();
    }

    calcularValor = () => {
        this.total = 0;
        this.produtos.forEach(produto => {
            this.total += (produto.price * produto.quantity);
        });
    }

    alertValor = (titulo, message, inputName, inputType) => {
        return new Promise((resolve, reject) => {
            this.alertCtrl.create({
                title: titulo,
                message: message,
                inputs: [
                    {
                        name: inputName,
                        type: inputType,
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
