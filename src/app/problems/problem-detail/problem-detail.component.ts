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

  submit_code = () => {
    const url = "https://9ypm29b2j3.execute-api.us-east-1.amazonaws.com/prod/submit-code";
    // this.http.post(url, {
    //   "Content-Type": "application/json",
    //   "x-api-key":"WpLUPfRasd5PiLMAoXRhV4qigW08I1pl3wnHGNuq",
    //   "X-Amz-Date": "20190225T180426Z"
    // }).subscribe((res) => { "lala"+console.log(res)});

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.onerror = (err) => {
      console.log("ERR:"+err);
    }
   
    xhr.onload = (res) => {
      console.log("LOAD:"+res);
      console.log(xhr.response);
    }

    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("X-Api-Key", "WpLUPfRasd5PiLMAoXRhV4qigW08I1pl3wnHGNuq");
    xhr.setRequestHeader("X-Amz-Date", "20190225T180426Z");
    xhr.setRequestHeader("Authorization", "20190225T180426Z");
    xhr.setRequestHeader("X-Amz-Security-Token", "20190225T180426Z");

    const code = { "code": "print('Hello world.')"}
    xhr.send(JSON.stringify(code));
  }

}
