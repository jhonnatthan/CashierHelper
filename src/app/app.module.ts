import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BuscaPage } from '../pages/busca/busca';
import { ClientesPage } from '../pages/clientes/clientes';
import { ProdutosPage } from '../pages/produtos/produtos';
import { MenuPage } from '../pages/menu/menu';
import { StorageProvider } from '../providers/storage/storage';
import { RegistrarVendaPage } from '../pages/registrar-venda/registrar-venda';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        BuscaPage,
        ClientesPage,
        ProdutosPage,
        MenuPage,
        RegistrarVendaPage,
        PesquisaPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        BuscaPage,
        ClientesPage,
        ProdutosPage,
        MenuPage,
        RegistrarVendaPage,
        PesquisaPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        StorageProvider
    ]
})
export class AppModule { }
