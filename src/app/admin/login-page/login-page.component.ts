import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/Services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  massage: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) =>{
      if (params['authFailed']) {
        this.massage = 'Сессия истекла. Введите логин и пароль еще раз'
      } else if (params['loginAgain']) {
        this.massage = 'Введите логин и пароль'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7)
      ])
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
