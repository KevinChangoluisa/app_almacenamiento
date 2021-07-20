import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.page.html',
  styleUrls: ['./userinformation.page.scss'],
})
export class UserinformationPage implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  user: any;
  ngOnInit() {

    let userInformation: any = this.route.snapshot.paramMap.get('text');
    this.user = JSON.parse(userInformation)
    console.log(JSON.parse(userInformation))
  }

}
