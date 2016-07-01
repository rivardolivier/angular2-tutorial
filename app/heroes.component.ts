    import { Component } from '@angular/core';
    import { OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';

    import { Hero } from './hero';
    import { HeroDetailComponent } from './hero-detail.component';
    import { HeroService } from './hero.service';

    @Component({
      selector: 'my-heroes',
        templateUrl: 'app/heroes.component.html',
        styleUrls: ['app/heroes.component.css'],
        directives: [HeroDetailComponent]
    })



    export class HeroesComponent implements OnInit {

        title = 'Tour of Heroes';
        heroes:Hero[];
        selectedHero: Hero;
        error: any;
        addingHero = false;

        onSelect(hero: Hero) { this.selectedHero = hero; }

        ngOnInit() {
            this.getHeroes();
        }

        constructor(
            private router: ActivatedRoute,
            private heroService: HeroService) {
        }

        addHero() {
            this.addingHero = true;
            this.selectedHero = null;
        }

        close(savedHero: Hero) {
            this.addingHero = false;
            if (savedHero) { this.getHeroes(); }
        }

        deleteHero(hero: Hero, event: any) {
            event.stopPropagation();
            this.heroService
                .delete(hero)
                .then(res => {
                    this.heroes = this.heroes.filter(h => h !== hero);
                    if (this.selectedHero === hero) { this.selectedHero = null; }
                })
                .catch(error => this.error = error);
        }



        getHeroes() {
            this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        }

        gotoDetail() {
            this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
        }

    }

