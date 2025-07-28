import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { User } from '@core/base-models/user/User';

@Component({
    selector: 'mi-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() appearGreetings: boolean = true;
  user!: User;

  ngOnInit(): void {
    this.user = new User({
      Id: "56de-23oed-433lr-4rr556dmios3443",
      Name: 'Isaquias Sebastião Marques',
      Email: 'isaquias.marques@medesign-angola.com',
      Profile: 'assets/images/profile/avatar.png',
      Token: "dbshjbndilkfopkproiejr78y32oijeiwoj98h",
      IsFirstAcess: false,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
