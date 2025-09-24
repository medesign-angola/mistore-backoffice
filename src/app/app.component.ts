import { Component, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  isOnAuthenticationPage = signal(true);

  ngOnInit(): void {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      if(event.url.includes("/auth/")){
        this.isOnAuthenticationPage.set(true)
        
      } else {
        this.isOnAuthenticationPage.set(false);
      }
    })
  }
}
