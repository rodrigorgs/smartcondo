import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessKeysService } from './access-keys.service';
import { CondoService } from '../condo.service';

@Component({
  selector: 'app-access-keys',
  templateUrl: './access-keys.component.html',
})
export class AccessKeysComponent implements OnInit {
  condo: any = {};
  condoSlug = '';
  accessKeys: any[] = [];
  newKey: any = { description: '', validFrom: '', validTo: '' };

  constructor(
    private route: ActivatedRoute,
    private accessKeysService: AccessKeysService,
    private condoService: CondoService
  ) {}

  ngOnInit() {
    this.condoSlug = this.route.snapshot.paramMap.get('condoSlug') || '';
    this.loadAccessKeys();
    if (this.condoSlug) {
      this.condoService.getCondoBySlug(this.condoSlug).subscribe((condo: any) => {
        this.condo = condo;
      });
    }
  }

  loadAccessKeys() {
    this.accessKeysService.getAccessKeys(this.condoSlug).subscribe(keys => {
      this.accessKeys = keys;
    });
  }

  createAccessKey() {
    if (!this.newKey.validFrom) {
      this.newKey.validFrom = null;
    }
    if (!this.newKey.validTo) {
      this.newKey.validTo = null;
    }
    this.accessKeysService.createAccessKey(this.condoSlug, this.newKey).subscribe(() => {
      this.newKey = { description: '', validFrom: '', validTo: '' };
      this.loadAccessKeys();
    });
  }

  deleteAccessKey(key: string) {
    this.accessKeysService.deleteAccessKey(this.condoSlug, key).subscribe(() => {
      this.loadAccessKeys();
    });
  }

  confirmDeleteKey(keyString: string) {
    if (confirm('Tem certeza de que deseja remover esta chave de acesso?')) {
      this.deleteAccessKey(keyString);
    }
  }
}
