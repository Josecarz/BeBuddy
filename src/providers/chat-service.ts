import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Tour} from "../models/models";

@Injectable()
export class ChatService {


  constructor(private db: AngularFireDatabase) {

  }

  public startChat(userId: string, buddyId: string){
    console.log("start");
    return new Promise((resolve, reject) => {
      this.db.list(`/users/${userId}/chats/`).push({}).then(success => {
        this.db.object(`/users/${userId}/chats/${success.key}`).set({
          id: buddyId,
          idChat: success.key,
        }).then(snapshot => {
          this.createChat(userId, buddyId, success.key);
          console.log("create");
        }).then(() => resolve())
          .catch(err => reject(err.code));
      });
    });
  }

  private createChat(userId: string, buddyId: string, id){
    this.db.object(`/users/${buddyId}/chats/${id}`).set({
      id: userId,
    });
    this.db.object(`/chats/${id}`).set({
      idChat: id,
    });
  }


  public getChats(userId: string):  Observable <any>{
    return this.db.list(`/users/${userId}/chats`)
      .valueChanges()
  }


  public sendMessage(chatId: string, data, userId: string){
    let dateNow = Date.now();
    this.db.list(`/chats/${chatId}/messages`).push({
      message: data,
      who: userId,
      date: dateNow,
    })
  }
  // public sendMessage(userId: string, buddyId: string, message: string){
  //   this.db.object(`/chats/${userId}${buddyId}`).set({
  //     who: userId,
  //     message: message,
  //     date:  Date.now(),
  //   });
  // }

  public getMessages(chatId: string):  Observable <any>{
    return this.db.list(`/chats/${chatId}/messages`).valueChanges();
  }

}
