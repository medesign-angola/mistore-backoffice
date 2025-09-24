import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AlertService, LogStatus } from "@core/services/alert/alert.service";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { environment } from "@env/environment.development";
import { catchError, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenericApi {

    private http = inject(HttpClient);
    private authService = inject(AuthenticationService);
    private alertService = inject(AlertService);

    private headers: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer {token}',
        'ngrok-skip-browser-warning': 'true'
    });

    public get<T>(uri: string,
        options: any = { endpoint: environment.backend }
    ): Observable<T>{

        const hdrs = options.headers ? this.appendHeaders(options.headers) : this.headers;
        console.log("Estes são os headers para o meu endpoint: [GET] " + uri, hdrs);

        return this.http.get<T>(`${options.endpoint }/${ uri }`, { headers: hdrs })
        .pipe(
            catchError(error => {
                if(error.status === 0){
                    this.alertService.add("Impossível manter a comunicação com o servidor", LogStatus.ERROR)
                }
                return of(null as T)
            })
        )
    }

    public post<T>(uri: string, body: any,
        options: any = { endpoint: environment.backend }
    ): Observable<T>{
        let headers: HttpHeaders = this.appendHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'Content-Type': 'text/json',
            ...options.headers
        });

        console.log("Estes são os headers para o meu endpoint: [POST] " + uri, headers);
        return this.http.post<T>(`${ options.endpoint }/${ uri }`, body, { headers })
    }

    public put<T>(uri: string, body: any,
        options: any = { endpoint: environment.backend }
    ): Observable<T>{
        let headers: HttpHeaders = this.appendHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'Content-Type': 'text/json',
            ...options.headers
        });

        console.log("Estes são os headers para o meu endpoint: [PUT] " + uri, headers);
        return this.http.put<T>(`${ options.endpoint }/${ uri }`, body, { headers });
    }

    public patch<T>(uri: string, body: any,
        options: any = { endpoint: environment.backend }
    ): Observable<T>{
        let headers: HttpHeaders = this.appendHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'Content-Type': 'text/json',
            ...options.headers
        });

        console.log("Estes são os headers para o meu endpoint: [PUT] " + uri, headers);
        return this.http.patch<T>(`${ options.endpoint }/${ uri }`, body, { headers });
    }

    public delete<T>(uri: string, options?: {}): Observable<T>{
        return this.http.delete<T>(`${ environment.backend }/${ uri }`, options);
    }

    get getUserShopId(): string {
        return this.authService.getUserShopId();
    }

    private appendHeaders(headers: { [name: string]: string }): HttpHeaders {        
        let hdrs: HttpHeaders = this.headers;
        for(let key in headers){
            hdrs = hdrs.append(key, headers[key]);
        }
        return hdrs;
    }
}