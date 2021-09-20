import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerUserData = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password : new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  get f() { return this.registerUserData.controls; }

  registerUser() {
    this._auth.registerUser(this.registerUserData.value).subscribe(
      res => {console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/special'])
      },
      err => console.log(err)
    )
  }

}
