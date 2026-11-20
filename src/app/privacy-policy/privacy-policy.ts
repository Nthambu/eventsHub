import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
})
export class PrivacyPolicy {
  readonly year = new Date().getFullYear();
  constructor(public router:Router){}
   goBackToEvents(): void {
    this.router.navigate(['/']);
  }
}
