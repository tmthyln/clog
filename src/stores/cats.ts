import {defineStore} from "pinia";
import {numericDate} from "./dates.ts";

interface Cat {
    id: number,
    name: string,
    birthdate: number,
}

interface Observation {
    id: number,
    loggedDate: number,
    observedDate: number,
    notes: string,
    catId: number,
}

interface CatStoreState {
    cats: Cat[],
    observations: Observation[],
    currentCat: Cat | null,
}

export const useCatStore = defineStore('cats', {
    state(): CatStoreState {
        return {
            cats: [],
            observations: [],
            currentCat: null,
        }
    },
    getters: {
        currentObservations: (state: CatStoreState) => state.observations.filter(obs => obs.catId === state.currentCat?.id),
    },
    actions: {
        async loadCats() {
            await fetch('/api/all', {method: 'POST'});

            const catResponse = await fetch('/api/cats');
            if (catResponse.ok) {
                this.cats.length = 0;
                this.cats.push(...(await catResponse.json()));

                if (this.cats.length > 0) {
                    this.currentCat = this.cats[0];
                }
            }

            const obsResponse = await fetch('/api/observations');
            if (obsResponse.ok) {
                this.observations.length = 0;
                this.observations.push(...(await obsResponse.json()));
            }
        },
        async addCat(name: string, birthdate: string) {
            const response = await fetch('/api/cats', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    birthdate: numericDate(birthdate),
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const catInfo = await response.json();

                let catExisted = false;
                for (const cat of this.cats) {
                    if (cat.id === catInfo) {
                        cat.name = catInfo.name;
                        cat.birthdate = catInfo.birthdate;

                        catExisted = true;
                    }
                }

                if (!catExisted) {
                    this.cats.push(catInfo);
                }
            }
        },
        async addObservation(catId: number, notes: string, date: string) {
            await fetch('/api/observations', {
                method: 'POST',
                body: JSON.stringify({
                    loggedDate: numericDate(new Date()),
                    observedDate: numericDate(date),
                    notes,
                    catId,
                })
            })
        }
    }
})
