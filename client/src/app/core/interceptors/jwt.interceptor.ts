import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class JwtInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //throw new Error("Method not implemented.");
        const token = localStorage.getItem('token');

        if(token){
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}`}
            });
        }

        return next.handle(req);
    }

}