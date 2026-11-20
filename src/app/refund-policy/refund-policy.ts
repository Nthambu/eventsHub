import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './refund-policy.html',
  styleUrl: './refund-policy.css',
})
export class RefundPolicy {
  readonly year = new Date().getFullYear();
    constructor(private readonly router:Router){}
  goBackToEvents(): void {
    this.router.navigate(['/']);
  }
}
