import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { ProblemsService } from './problems.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  listOfProblems: any[];

  constructor(private authService: AuthService,
    private router: Router,
    private problemsService: ProblemsService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.getListOfProblems();
    } else {
      this.router.navigate(["login"]);
      console.log("not logged in");
    }
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
