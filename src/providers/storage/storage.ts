import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageProvider {

    constructor(private storage: NativeStorage) { }

    async getItem(name) {
        return await this.storage.getItem(name) || false;
    }

    async setItem(name, data) {
        return await this.storage.setItem(name, data) || false;
    }

    async removeItem(name) {
        return await this.storage.remove(name) || false;
    }

}
