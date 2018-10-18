import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BuscaPage } from '../busca/busca';
import { ClientesPage } from '../clientes/clientes';
import { ProdutosPage } from '../produtos/produtos';
import { MenuPage } from '../menu/menu';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = BuscaPage;
    tab3Root = ClientesPage;
    tab4Root = ProdutosPage;
    tab5Root = MenuPage;

    constructor() {


    }
}
