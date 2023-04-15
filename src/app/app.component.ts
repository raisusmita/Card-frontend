import { Component, OnInit } from '@angular/core';
import { CardsService } from './service/cards.service';
import { Card } from './models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];

  card: Card = {
    id: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''

  }

  //inject service inside component
  constructor(private cardsService: CardsService) {

  }
  ngOnInit(): void {
    this.getAllCards();
  }


  getAllCards() {
    //subscribe make sure the observable is called
    this.cardsService.getAllCards().subscribe(
      response => {
        this.cards = response;
      }
    );
  }


  onSubmit() {

    if(this.card.id === ''){
      this.cardsService.addCard(this.card).subscribe(
        response => {
          this.getAllCards();
          
        }
      )
    }else{
      this.updateCard(this.card);
    }
 
    this.card = {
      id: '',
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: ''

    }

  }

  updateCard(card:Card){
    this.cardsService.updateCard(card).subscribe(response=>{
      this.getAllCards();
    });
  }

  deleteCard(id: string) {
    this.cardsService.deleteCard(id).subscribe(
      response => {
        this.getAllCards();
      }
    );
  }

  populateForm(card:Card){
    this.card = card;
  }

}
