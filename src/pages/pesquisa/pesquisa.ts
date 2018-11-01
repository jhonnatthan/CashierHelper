import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';
import { ToggleGesture } from 'ionic-angular/umd/components/toggle/toggle-gesture';

@Component({
    selector: 'page-pesquisa',
    templateUrl: 'pesquisa.html',
})
export class PesquisaPage {
    private title: any = null;

    private data: any = null;
    private filteredData: any = null;
    private repeater: any = null;

    private _term: any = "";

    private searchbar: boolean = false;
    private searchbarTerm: any = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private viewCtrl: ViewController) {

        this.title = this.navParams.get('title');

        this.searchbar = this.navParams.get('searchbar');
        this.searchbarTerm = (this.navParams.get('searchbarterm')) ? this.navParams.get('searchbarterm') : 'name';

        this._term = (this.navParams.get('selected')) ? this.navParams.get('selected') : null;

        let temporaryData = this.navParams.get('data');
        this.repeater = this.navParams.get('repeater');

        this.data = (this.repeater) ? temporaryData[this.repeater] : temporaryData;
        this.filteredData = this.data;
    }

    ionViewDidLoad() {
        this.filtrar();
    }

    returnItem(_item) {
        this.viewCtrl.dismiss(_item);
    }

    filtrar() {
        if (this._term && this._term != "") {
            let term = this._term;

            this.filteredData = this.data.filter((item) => {
                return item[this.searchbarTerm].toLowerCase().indexOf(term.toLowerCase()) > -1;
            });
        }

    }

}
