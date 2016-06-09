import * as Hapi from 'hapi';

export interface IHapiPlugin {
    (server:any, options:any, next:any): void;
    attributes?: any;
}