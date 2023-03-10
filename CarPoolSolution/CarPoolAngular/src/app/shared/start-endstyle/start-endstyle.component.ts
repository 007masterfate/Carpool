import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-endstyle',
  templateUrl: './start-endstyle.component.html',
  styleUrls: ['./start-endstyle.component.css'],
})
export class StartEndstyleComponent implements OnInit {
  @Input()
  public data!: number;
  @Input() public flag!: boolean;
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  constructor() {}

  ngOnInit(): void {}
}
