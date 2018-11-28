import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemsService } from '../problems.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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
  constructor(private activatedRoute: ActivatedRoute,
    private problemsService: ProblemsService,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.id = this.activatedRoute.snapshot.params['id'];
      // this.getProblem(); we'll avoid during presentation.
    } else {
      this.router.navigate(["login"]);
      console.log("not logged in");
    }
  }

  /**
   * @param id
   */
  getProblem = () => {
    this.problem = this.problemsService.getProblem(this.id);
    this.problemUrl = this.problem.url;
    this.problemUrlSanitized = this.domSanitizer
      .bypassSecurityTrustResourceUrl(this.problemUrl);

    console.log("problem summary: ", this.problem.summary);
  }

}
