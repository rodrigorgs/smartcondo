import { Component } from '@angular/core';
import { CondoService } from '../condo.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-condo-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './condo-detail.component.html',
  styleUrl: './condo-detail.component.scss'
})
export class CondoDetailComponent {
  condo: any = {};
  key: string | null = null;
  canManage: boolean = false;
  user: any = null;

  constructor(private condoService: CondoService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.loadCondo();
    this.key = this.route.snapshot.queryParamMap.get('key');
  }

  ngOnInit() {
    this.loadCondo();
    this.userService.getCurrentUser().then(user => {
      this.user = user;
      if (user?.isAdmin) {
        this.canManage = true;
        return;
      }

      this.userService.getCondoToUser(this.route.snapshot.paramMap.get('condoSlug') || '', user?.id).subscribe((condoToUser: any) => {
        console.log('Condo for user:', condoToUser);
        if (condoToUser.isManager) {
          this.canManage = true;
        }
      });
    });
  }

  loadCondo() {
    console.log('Loading condo');
    const slug = this.route.snapshot.paramMap.get('condoSlug');
    if (!slug) {
      this.condo = { name: 'Not found' }
    } else {
      this.condoService.getCondoBySlug(slug).subscribe((condo: any) => {
        console.log('Condo loaded', condo);
        this.condo = condo;
      });
    }
  }
}
