import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

@Component({
    selector: 'page-registrar-venda',
    templateUrl: 'registrar-venda.html',
})
export class RegistrarVendaPage {

    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegistrarVendaPage');
    }

    adicionarItem() {
        this.actionSheetCtrl.create({
            title: 'Adicionar item',
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: 'Produto',
                    icon: 'basket'
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

}
