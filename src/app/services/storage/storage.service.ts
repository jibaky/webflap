import { Injectable } from '@angular/core';
import { Automaton } from 'src/app/models/finite-automaton.model';
import { Grammar, GrammarRule } from 'src/app/models/grammar.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() { }

  /**
   * Salva todas as gramáticas enviadas como parâmetro
   * @param grammars lista de gramáticas a serem salvas
   */
  public saveGrammars(grammars: Grammar[]): void {
    localStorage.setItem('webflap:grammars', JSON.stringify(grammars));
  }

  /**
   * Salva todos os autômatos enviadas como parâmetro
   * @param automatons lista de automatos a serem salvos
   */
  public saveAutomatons(automatons: Automaton[]): void {
    localStorage.setItem('webflap:automatons', JSON.stringify(automatons));
  }

  /** Carrega todas as gramáticas salvas no armazenamento interno */
  public loadGrammars(): Grammar[] {
      let grammars: any = localStorage.getItem('webflap:grammars');
      if (!grammars || grammars === '') {
        return [];
      }
      grammars = JSON.parse(grammars);
      const parsedGrammars = [];
      while (grammars.length > 0) {
        const grammar = grammars.pop();
        parsedGrammars.unshift(new Grammar().deserialize(grammar));
      }

      console.log('grammars loaded are', parsedGrammars);
      return parsedGrammars;
  }

  /** Carrega todos os autômatos salvos no armazenamento interno */
  public loadAutomatons(): Automaton[] {
      let automatons: any = localStorage.getItem('webflap:automatons');
      if (!automatons || automatons === '') {
        return [];
      }
      automatons = JSON.parse(automatons);
      const parsedAutomatons = [];
      while (automatons.length > 0) {
        const automaton = automatons.pop();
        parsedAutomatons.unshift(new Automaton().deserialize(automaton));
      }

      console.log('automatons loaded are', parsedAutomatons);
      return parsedAutomatons;
  }
}
