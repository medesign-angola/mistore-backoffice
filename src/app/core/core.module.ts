import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/in-memory-web-api/in-memory-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class CoreModule { }
