import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BuscaPage } from '../pages/busca/busca';
import { ClientesPage } from '../pages/clientes/clientes';
import { ProdutosPage } from '../pages/produtos/produtos';
import { MenuPage } from '../pages/menu/menu';
import { RegistrarVendaPage } from '../pages/registrar-venda/registrar-venda';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
import { CadastroClientePage } from '../pages/cadastro-cliente/cadastro-cliente';
import { CadastroProdutoPage } from '../pages/cadastro-produto/cadastro-produto';
import { CadastroPagamentoPage } from '../pages/cadastro-pagamento/cadastro-pagamento';
import { CadastroObservacaoPage } from '../pages/cadastro-observacao/cadastro-observacao';


registerLocaleData(localePtBr);

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
        PesquisaPage,
        CadastroClientePage,
        CadastroProdutoPage,
        CadastroPagamentoPage,
        CadastroObservacaoPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            scrollAssist: false,
            platforms: {
                ios: {
                    backButtonText: 'Voltar'
                }
            }
        }),
        BrMaskerModule
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
        PesquisaPage,
        CadastroClientePage,
        CadastroProdutoPage,
        CadastroPagamentoPage,
        CadastroObservacaoPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        StorageProvider
    ]
})
export class AppModule { }
