import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemsService } from '../problems.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['../../prepcs.css']
})
export class ProblemDetailComponent implements OnInit {

  id: number;
  problem: any;
  problemUrl: string;
  problemUrlSanitized: SafeUrl;
  /**
   * This is how we know whether or not theuser is logged in.
   * @private
   */
  user: any;
  constructor(private activatedRoute: ActivatedRoute,
    private problemsService: ProblemsService,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if(user) {
        this.id = this.activatedRoute.snapshot.params['id'];
      } else {
        this.router.navigate(["login"]);
      }
    });
  }

  /**
   * @param id
   */
  getProblem = () => {
    this.problem = this.problemsService.getProblem(this.id);
    this.problemUrl = this.problem.url;
    this.problemUrlSanitized = this.domSanitizer
      .bypassSecurityTrustResourceUrl(this.problemUrl);
  }

  submit_code = (code_str: string) => {
    const url = "https://9ypm29b2j3.execute-api.us-east-1.amazonaws.com/prod/submit-code";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.onerror = (err) => {
      console.log("ERR:"+err);
    }
   
    xhr.onload = (res) => {
      console.log("LOAD:"+res);
      res = JSON.parse(xhr.response);
      console.log(JSON.parse(res["body"]));
    }

    //const code = { "code": "for i in range(5):\n\tprint('Hello Shrijanand.')\n"}
    const code = { "code": code_str };
    xhr.send(JSON.stringify(code));
  }

}
