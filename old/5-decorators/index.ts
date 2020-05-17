import { Debounce, LogEventValue, SentToSentry } from './utils';

class Search {
    constructor(
        private readonly inputElement: HTMLInputElement
    ) {
        this.inputElement.addEventListener('input', this.onSearch.bind(this))
    }

    @Debounce(300)
    @LogEventValue
    @SentToSentry
    private onSearch(_e: Event): void {
        throw new Error('Custom error')
    }

}

const el: HTMLInputElement = document.querySelector('input') as HTMLInputElement;
new Search(el);
