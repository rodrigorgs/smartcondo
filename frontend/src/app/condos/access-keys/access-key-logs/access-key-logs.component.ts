import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccessKeysService } from '../access-keys.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-access-key-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './access-key-logs.component.html',
})
export class AccessKeyLogsComponent {
  keyString: string = '';
  entries: any[] = [];

  constructor(
    private readonly accessKeysService: AccessKeysService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.keyString = this.route.snapshot.paramMap.get('key') || '';
    this.accessKeysService.getAccessKeyLogs(this.keyString).subscribe({
      next: (logs) => {
        this.entries = logs.map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
      }
    });
  }
}
