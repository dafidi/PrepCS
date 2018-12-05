import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { ProblemsService } from './problems.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['../prepcs.css']
})
export class ProblemsComponent implements OnInit {

  listOfProblems: any[];
  /**
   * This is how we know whether or not the user is logged in.
   * @private
   */
  user: any;
  constructor(private authService: AuthService,
    private router: Router,
    private problemsService: ProblemsService) { }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if(user) {
        this.getListOfProblems();
      } else {
        this.router.navigate(["login"]);
      }
    });
  }

  /**
   * @param problem
   */
  onSelectProblem = (problem: any) => {
    this.router.navigate(["problem-detail/" + problem.id])
  }

  /**
   * 
   */
  getListOfProblems = () => {

    this.listOfProblems = this.problemsService.getProblems();
  }

}
