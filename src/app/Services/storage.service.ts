import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageRef: Storage) {}

  async initializeStorage(): Promise<void> {
    const storage = await this.storageRef.create();
    this.storage = storage;
  }

  set(key: string, value: string): Promise<void> {
    return this.storage?.set(key, value);
  }

  get(key: string): Promise<any> {
    return this.storage?.get(key);
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }

  removeItem(key: string): Promise<any> {
    return this.storage.remove(key);
  }
}
