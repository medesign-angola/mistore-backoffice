import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private logs: Log[] = [];
  logsSignal: WritableSignal<Log[]> = signal([]);
  private removeTimeOut: any;

  constructor() { }

  add(message: string, status: LogStatus = LogStatus.DEFAULT, timetoutInSeconds?: number): void{
      let randomId;
      do {
          randomId = this.randomize(1, 100);
      } while (this.existentId(randomId));
      let theLog = { message: message, status: status, identifier: randomId };
      this.logs.push( theLog );
      this.refreshLogs$();
      this.removeMessageAfterTimeInSeconds(theLog, timetoutInSeconds);
  }

  private refreshLogs$(){
      this.logsSignal.update(logs => logs = this.logs);
  }

  private removeMessageAfterTimeInSeconds(log: Log, timer: number = 5){
      this.removeTimeOut = setTimeout(() => {
          let logIndex = this.logs.findIndex(item => item.identifier === log.identifier);
          if(logIndex === -1) return;
          this.logs.splice(logIndex, 1);
          this.refreshLogs$();
      }, timer * 1000)
  }

  private randomize(min: number, max: number): number{
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private existentId(id: number): boolean{
    return (this.logs.filter(item => item.identifier === id).length > 0) ? true : false;
  }

}

interface Log{
  message: string,
  status: LogStatus,
  identifier: number
}

export enum LogStatus{
  SUCCESS,
  ERROR,
  WARNING,
  DEFAULT,
  INFO
}
