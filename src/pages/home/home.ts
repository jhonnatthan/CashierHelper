import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { RegistrarVendaPage } from '../registrar-venda/registrar-venda';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    vendas: any = [];

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController) {

    }

    ionViewDidLoad() {
        console.log('component init');
    }

}
