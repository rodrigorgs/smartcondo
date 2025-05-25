import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CondoService } from '../condo.service';

@Component({
  selector: 'app-condo-users',
  templateUrl: './condo-users.component.html',
})
export class CondoUsersComponent implements OnInit {
  condo: any = {};
  condoSlug = '';
  condoToUsers: any[] = [];
  newUserEmail: string = '';
  addUserError: string = '';
  newUserIsManager: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private condoService: CondoService
  ) {}

  ngOnInit() {
    this.condoSlug = this.route.snapshot.paramMap.get('condoSlug') || '';
    this.loadUsers();
    if (this.condoSlug) {
      this.condoService.getCondoBySlug(this.condoSlug).subscribe((condo: any) => {
        this.condo = condo;
      });
    }
  }

  loadUsers() {
    this.condoService.getCondoUsers(this.condoSlug).subscribe(condoToUsers => {
      this.condoToUsers = condoToUsers;
    });
  }

  removeUser(info: any) {
    if (!confirm('Tem certeza que deseja remover este usuário do condomínio?')) return;
    this.condoService.removeCondoUser(this.condoSlug, info.user?.id).subscribe(() => {
      this.loadUsers();
    });
  }

  addUser() {
    this.addUserError = '';
    if (!this.newUserEmail) return;
    this.condoService.addUserToCondo(this.condoSlug, this.newUserEmail, this.newUserIsManager).subscribe({
      next: () => {
        this.newUserEmail = '';
        this.loadUsers();
      },
      error: (err) => {
        this.addUserError = err?.error?.message || 'Erro ao adicionar usuário.';
      }
    });
  }
}
