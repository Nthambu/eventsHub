import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './refund-policy.html',
  styleUrl: './refund-policy.css',
})
export class RefundPolicy {
  readonly year = new Date().getFullYear();

  constructor(private readonly router: Router, private readonly seo: SeoService) {
    this.seo.update({
      title: 'Refund Policy',
      description: 'Understand the Madfuns refund policy for event tickets purchased in Kenya. Learn when refunds apply and how to request one.',
      url: 'https://madfuns.com/refund-policy',
    });
  }

  goBackToEvents(): void {
    this.router.navigate(['/']);
  }
}
