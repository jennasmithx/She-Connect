import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mentor.html',
  styleUrls: ['./mentor.css']
})
export class MentorComponent {
  activeChat: string | null = null;
  chatMessage: string = '';

  messages: any = {
    "John Doe": "Hey… I've been feeling anxious and could really use someone to talk to.",
    "Sarah Jade": "Hey, I’m struggling mentally and just need someone to listen.",
    "Emma Watson": "Trying to build better habits but its so hard. I need support."
  };

  openChat(name: string) {
    this.activeChat = name;
    this.chatMessage = this.messages[name] || "Hey there 👋 How can I support you?";
  }

  sendMessage(input: HTMLInputElement) {
  const message = input.value.trim();

  if (!message) {
    alert("Type a message first 😊");
    return;
  }

  alert("✅ Message sent!");

  input.value = ""; // clear box
}
}
