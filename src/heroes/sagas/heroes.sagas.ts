import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DropAncientItemCommand } from '../commands/impl';
import { HeroKilledDragonEvent } from '../events/impl';

const itemId = '0';

@Injectable()
export class HeroesGameSagas {
  @Saga()
  public dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(HeroKilledDragonEvent),
      delay(1000),
      map(event => {
        console.log(clc.redBright('Inside [HeroesGameSagas] Saga'));
        return new DropAncientItemCommand(event.heroId, itemId);
      }),
    );
  }
}
