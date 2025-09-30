import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/base-models/user/User';
import { ProfileFacade } from '@store/facades/profile.facade';

@Component({
  selector: 'mi-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private profileFacade = inject(ProfileFacade);
  user: User | null = null;
  isLoading = signal<boolean>(false);

  profileFormGroup: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.getProfile();

    this.profileFormGroup = new FormGroup({
      'shop_name': new FormControl("", [ Validators.required, Validators.minLength(30) ]),
      'phone': new FormControl("", [ Validators.required, Validators.minLength(9) ]),
      'nif': new FormControl("", [ Validators.required, Validators.minLength(9) ]),
      'email': new FormControl("", [ Validators.required, Validators.email ]),
      // 'categories': new FormControl("", [ ]),
      // 'locations': new FormControl("", [ ]),
      // 'password': new FormControl("", []),
      // 'new_password': new FormControl("", []),
      // 'confirm_password': new FormControl("", []),
      'description': new FormControl("", [ ])
    })
  }

  getProfile(): void{
    this.profileFacade.profile.subscribe({
      next: profile => {
        // console.log(profile)
        this.user = profile;

        if(!this.user) return;
        this.fullfillForm(this.user);
      },
      error: error => {}
    })
  }

  private fullfillForm(user: User): void{
    this.profileFormGroup.setValue({
      'shop_name': user.ShopMeta.Shop,
      'phone': user.ShopMeta.Phone,
      'nif': user.ShopMeta.Nif,
      'email': user.Email,
      'description': user.ShopMeta.Description
    })
  }

  submit(): void{
    if(this.profileFormGroup.invalid) return;
    this.profileFacade.update(this.profileFormGroup.value).subscribe({
      next: response => console.log,
      error: error => console.error
    });
  }
}