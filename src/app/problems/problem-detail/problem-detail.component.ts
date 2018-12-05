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
  /**
   * This is how we know whether or not theuser is logged in.
   * @private
   */
  user: any;
  constructor(private activatedRoute: ActivatedRoute,
    private problemsService: ProblemsService,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router) {
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

}
