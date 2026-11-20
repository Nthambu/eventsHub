import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
})
export class PrivacyPolicy {
  readonly year = new Date().getFullYear();

  constructor(public router: Router, private readonly seo: SeoService) {
    this.seo.update({
      title: 'Terms & Conditions and Privacy Policy',
      description: 'Read the Madfuns terms of service and privacy policy. Governed by Kenyan law. Your data is protected under the Kenya Data Protection Act 2019.',
      url: 'https://madfuns.com/privacy-policy',
    });
  }

  goBackToEvents(): void {
    this.router.navigate(['/']);
  }
}
