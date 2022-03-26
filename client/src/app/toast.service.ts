import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public Message: string;
  constructor() { 
    this.Message = "";
  }

  UpdateToast(message: string) {
    this.Message = message + "\n" + this.Message;
  }
}