import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() pageSize: number;
  @Input() totalCount: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {
    this.pageSize = 0;
    this.totalCount = 0;
   }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onPagerChanged(event: any){
    this.pageChanged.emit(event); // .page);
  }

}
