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
}
