import {Component, OnInit} from '@angular/core';
import {TransactionsPageService} from './transactionsPage.service';
import {ActivatedRoute, Params} from '@angular/router';
import { Globals } from '../globals';

import 'rxjs/add/operator/switchMap';

@Component({
  selector   : 'exploder-transactions',
  templateUrl: 'transactionsPage.component.html'
})
export class TransactionsPageComponent implements OnInit {

  transaction: any;
  confirmations: any;
  currentLocation: string;

  constructor(private transactionsPageService: TransactionsPageService,
              private route: ActivatedRoute, public globals: Globals) {
  }

  ngOnInit() {
    this.currentLocation = window.location.href;
    this.route.params
      .switchMap((params: Params) => this.transactionsPageService.getTransaction('' + params['txid']))
      .subscribe(resp => {
        this.transaction = resp;

        this.transactionsPageService.getBlockConfirmations(this.transaction.blockhash)
          .subscribe(resp => {
            this.confirmations = resp.confirmations;
          });

      });
  }
}
