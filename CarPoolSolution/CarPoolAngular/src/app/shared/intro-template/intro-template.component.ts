import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-template',
  templateUrl: './intro-template.component.html',
  styleUrls: ['./intro-template.component.css'],
})
export class IntroTemplateComponent implements OnInit {
  x !:string;
  constructor() {}

  ngOnInit(): void {}
}
