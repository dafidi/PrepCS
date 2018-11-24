import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {
  listOfProblems = [
    {id: 0, summary: "FizzBuzz", url: "http://tpcg.io/HQO6D3"},
    {id: 1, summary: "Circular Linked List", url: "http://tpcg.io/HQO6D3"},
    {id: 2, summary: "Sum Two Numbers", url: "http://tpcg.io/HQO6D3"},
    {id: 3, summary: "Is A BST?", url: "http://tpcg.io/HQO6D3"},
    {id: 4, summary: "Travelling Salesman", url: "http://tpcg.io/HQO6D3"}
  ];
  constructor() { }

  /**
   * 
   */
  getProblems = () => {
    return this.listOfProblems;
  }

  /**
   * The eventual goal is to get this list (in some well-defined format) 
   * over HTTP.
   * @param id 
   */
  getProblem(id: number) {
    // IDs should be unique but filter returns a list so we need to index here.
    let problem = this.listOfProblems.filter(problem => problem.id == id)[0];
    return problem
  }
}
