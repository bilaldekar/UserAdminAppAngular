import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { MenuItem } from 'primeng/components/common/menuitem';


@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  pageTitle = 'User Management';
  componentActive = true;

  items: MenuItem[];


  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/welcome'] 
      },
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [
          { label: 'User list', icon: 'pi pi-fw pi-list', routerLink: ['/users'] },
          { label: 'Roles list', icon: 'pi pi-fw pi-briefcase' },
          { label: 'Operations list', icon: 'pi pi-fw pi-briefcase', routerLink: ['/operations'] }
        ]
      },
      {
        label: 'SQL Query',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Set parameters',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/sqlserver-query']
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog'
      },
      { separator: true },
      {
        label: 'Quit', icon: 'pi pi-fw pi-times'
      }
    ];
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
