import { Injectable } from '@angular/core';

let green = "#4aa48a";
let pink =  "#ff9999";
@Injectable({
  providedIn: 'root'
})
export class ProblemsService {
  
  listOfProblems = [
    {id: 0, shortName: "FizzBuzz", summary: "FizzBuzz", url: "http://tpcg.io/9x27A8", category: "Miscellaneous", color: pink},
    {id: 1, shortName: "Circular Linked List", summary: "Detect a loop in a Linked List", url: "http://tpcg.io/9x27A8", category: "Data Structures", color: green},
    {id: 2, shortName: "Sum Two Numbers", summary: "Given two numbers, return their sum", url: "http://tpcg.io/9x27A8", category: "Mathematics", color: green},
    {id: 3, shortName: "Validate BST", summary: "Determine whether a provided tree is a binary search tree or not", url: "http://tpcg.io/9x27A8", category:"Data Structures", color: pink},
    {id: 4, shortName: "Travelling Salesman", summary: "Find the shortesst path that connects every node in a given graph without visiting a node more than once", url: "http://tpcg.io/9x27A8", category: "Algorithms", color: pink}
  ];
  constructor() { }

  /**
   * The eventual goal is to get this list (in some well-defined format) 
   * over HTTP.
   */
  getProblems = () => {
    return this.listOfProblems;
  }

  /**
   * @param id 
   */
  getProblem(id: number) {
    // IDs should be unique but filter returns a list so we need to index here.
    let problem = this.listOfProblems.filter(problem => problem.id == id)[0];
    return problem
  }
}
