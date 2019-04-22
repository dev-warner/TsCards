import { Provider, Injector } from '@angular/core';


export function inject<T>(Inject) {
    const injector = Injector.create([{
        provide: Inject,
        deps: []
    }]);

    return injector.get(Inject);
}
