import { Component, ElementRef, ViewChild } from '@angular/core';
import { CharacterService } from './character.service';
import { Character } from './model/character/character';
import { ItemType } from './model/items/item';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',  
  providers: [
    WebSocketService,
    CharacterService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('activityLog') public ActivityLog!: ElementRef;
  @ViewChild('messageTextField') public MessageTextField!: ElementRef;
  @ViewChild('chatTextArea') public ChatTextArea!: ElementRef;
  
  SaveString!: string;
  IsBusy : boolean = false;
  GlobalInterval: any;
  CurrentOnlinePlayers : Character[] | undefined;
  ItemType = ItemType;

  constructor(public CharacterService: CharacterService, private WebSocketService: WebSocketService) {
  }

  public ngOnInit(): void {
    this.WebSocketService.socket.emit("userSubmittedPlayerName", this.CharacterService.Character);
  }

  public ngAfterViewInit() {   
    this.WebSocketService.socket.on('updateCharacterConnectionString', (socketId: any) => {
      this.CharacterService.Character.SocketId = socketId;
    });

    this.WebSocketService.socket.on('currentOnlineCharacters', (currentOnlinePlayers: any) => {
      this.CurrentOnlinePlayers = currentOnlinePlayers;
    });

    this.WebSocketService.socket.on('postChatMessage', (message: any) => {
      this.ChatTextArea.nativeElement.value = message + this.ChatTextArea.nativeElement.value;
    });
  }

  // public OnSectionClick(event: any) {
  //   console.log(event.target.nextSibling.style.display);
  //   if(event.target.nextSibling.style.display == "block")
  //   {
  //     event.target.nextSibling.style.display == "none";
  //   }
  //   else if(event.target.nextSibling.style.display == "none")
  //   {
  //     event.target.nextSibling.style.display = "block";
  //   }
  // }

  public onChatMessageEnter() {
    var chatMessage = new Date().toLocaleTimeString() + " " + this.CharacterService.Character.Name + " : " + this.MessageTextField.nativeElement.value + "\n";
    this.WebSocketService.socket.emit("chatMessage", chatMessage);
    this.MessageTextField.nativeElement.value = "";
  }

  public onNameEnter(playerName: string) {
    this.CharacterService.SetNewCharacter(playerName);
    this.WebSocketService.socket.emit("userSubmittedPlayerName", this.CharacterService.Character);
  }

  UpdateStorage() {
    this.SaveString = JSON.stringify(this.CharacterService.Character);
    localStorage.setItem('character', this.SaveString);
  }

  // GatherItem(item: Gatherable) {
  //   if(this.IsBusy)
  //   {
  //     this.IsBusy = false;
  //     if(this.GlobalInterval != undefined) {
  //       clearInterval(this.GlobalInterval);
  //       this.GlobalInterval = undefined;
  //     }
  //   }
  //   else {
  //     if(this.CharacterService.GatherHandler.HasRequiredTool(item.RequiredTool, this.CharacterService.Character.Inventory))
  //     {
  //       if(item.LevelRequirement <= this.CharacterService.Character.Level) {
  //         this.IsBusy = true;
  //         var gatherRate = this.CharacterService.GatherHandler.DetermineGatherRate(this.CharacterService.Character.Inventory, item);
  //         this.GlobalInterval = setInterval(() => {
  //           this.CharacterService.GatherHandler.GatherItems(item, this.CharacterService.Character, this.CharacterService.Character.Inventory);
  //           this.UpdateStorage();
  //         }, gatherRate)
  //       }
  //       else {
  //         this.ActivityLog.nativeElement.value = "You are not the required level to gather " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
  //       }
  //     }
  //     else {
  //       this.IsBusy = false;
  //       this.ActivityLog.nativeElement.value = "You do not possess the required tool to gather " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
  //     }

  //   }
  // }

  // CraftItem(item: Craftable) {
  //   if(this.IsBusy)
  //   {
  //     this.IsBusy = false;
  //     if(this.GlobalInterval != undefined) {
  //       clearInterval(this.GlobalInterval);
  //       this.GlobalInterval = undefined;
  //     }
  //   }
  //   else {
  //     if(this.CharacterService.CraftHandler.HasRequiredMaterials(this.CharacterService.Character.Inventory, item.Recipe))
  //     {
  //       if(item.LevelRequirement <= this.CharacterService.Character.Level) {
  //         this.IsBusy = true;
  //         this.GlobalInterval = setInterval(() => {
  //           this.CharacterService.CraftHandler.CraftItem(item, this.CharacterService.Character, this.CharacterService.Character.Inventory);
  //           this.UpdateStorage();
  //         }, item.CraftTime * 1000)
  //       }
  //       else {
  //         this.ActivityLog.nativeElement.value = "You are not the required level to craft " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
  //       }
  //     }
  //     else {
  //       this.IsBusy = false;
  //       this.ActivityLog.nativeElement.value = "You do not possess the required materials to craft " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
  //     }

  //   }
  // }

  // CancelAction() {
  //   clearInterval(this.GlobalInterval);
  //   this.GlobalInterval = undefined;
  // }
}