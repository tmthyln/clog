import {defineStore} from "pinia";
import {numericDate} from "./dates";

export interface Cat {
    id: number,
    name: string,
    birthdate: number,
}

export interface Observation {
    id: number,
    loggedDate: number,
    observedDate: number,
    notes: string,
    catId: number,
}

export const useCatStore = defineStore('cats', {
    state: () => {
        return {
            cats: [] as Cat[],
            observations: [] as Observation[],
            loading: true as boolean,
            currentCat: null as Cat | null,
        }
    },
    getters: {
        currentObservations: (state) => state.observations.filter(obs => obs.catId === state.currentCat?.id),
    },
    actions: {
        async loadCats() {
            this.loading = true;
            await fetch('/api/all', {method: 'POST'});

            const catResponse = await fetch('/api/cats');
            if (catResponse.ok) {
                this.cats.length = 0;
                this.cats.push(...(await catResponse.json() as Cat[]));

                if (this.cats.length > 0) {
                    this.currentCat = this.cats[0];

                    const locallyStoredCatIdString = localStorage.getItem('clogCurrentCatId')
                    if (locallyStoredCatIdString !== null) {
                        const locallyStoredCatId = parseInt(locallyStoredCatIdString)
                        this.switchCat(locallyStoredCatId);
                    }
                }
            }

            const obsResponse = await fetch('/api/observations');
            if (obsResponse.ok) {
                this.observations.length = 0;
                this.observations.push(...(await obsResponse.json() as Observation[]));
            }

            this.loading = false;
        },
        switchCat(catId: number) {
            const foundCat = this.cats.find(cat => cat.id == catId);
            if (foundCat) {
                this.currentCat = foundCat;
                localStorage.setItem('clogCurrentCatId', String(foundCat.id));
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
                const catInfo = await response.json() as Cat;

                const existingCat = this.cats.find(cat => cat.id == catInfo.id);
                if (existingCat) {
                    existingCat.name = catInfo.name;
                    existingCat.birthdate = catInfo.birthdate;
                } else {
                    this.cats.push(catInfo);
                    if (this.cats.length === 1) {
                        this.currentCat = catInfo;
                    }
                }
            }
        },
        async addObservation(catId: number, notes: string, date: string) {
            const response = await fetch('/api/observations', {
                method: 'POST',
                body: JSON.stringify({
                    loggedDate: numericDate(new Date()),
                    observedDate: numericDate(date),
                    notes,
                    catId,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                const index = this.observations.findIndex(obs => obs.id === data.id);
                if (index < 0) {
                    this.observations.push(data)
                }

                return true
            }

            return false
        },
    }
})
