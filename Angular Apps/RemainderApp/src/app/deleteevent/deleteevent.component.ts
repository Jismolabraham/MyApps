import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-deleteevent',
  templateUrl: './deleteevent.component.html',
  styleUrls: ['./deleteevent.component.css']
})
export class DeleteeventComponent implements OnInit {
  @Input() item: string | undefined
  @Input() index: string | undefined
  @Input() index1: string | undefined
  @Input() date: string | undefined
  @Input() event: string | undefined
  @Output() onDelete = new EventEmitter
  @Output() onCancel = new EventEmitter
  @Output() onSave = new EventEmitter
  @Output() onCancelSave = new EventEmitter
  today: any
  user: any
  updatedate = ""
  updateevent = ""
  update = ""
  upevent = ""
  constructor(public ds: DataService) {
    this.today = new Date()
    this.user = localStorage.getItem("newUser")
    // console.log(this.array);

  }

  ngOnInit(): void {
  }
  delete() {
    // this.onDelete.emit(this.item)
    this.onDelete.emit(this.index)
    alert("deleting...")
  }
  cancel() {
    this.onCancel.emit()
    alert("cancelling..")
  }
  save() {


    // alert(i)
    1
    if (this.updatedate != "" && this.updateevent!="") {
      this.ds.saveoneevent(this.index1, this.updatedate, this.updateevent)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            window.location.reload()
          }
        },
          (result: any) => {
            alert(result.error.message)
          })

    }

    if (this.updatedate == "" && this.updateevent=="") {
      this.ds.saveoneevent(this.index1, this.date, this.event)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            window.location.reload()
          }
        },
          (result: any) => {
            alert(result.error.message)
          })

    }

    

    // this.onSave.emit({index1:this.index1,date1:this.updatedate,event1:this.updateevent})
    // alert(this.updateevent)

    alert("saving...")
  }
  cancelupdate() {
    this.onCancelSave.emit()
    alert("cancelling..")
  }
}
