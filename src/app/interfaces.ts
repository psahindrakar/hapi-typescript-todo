import * as Hapi from 'hapi';

export interface IHapiPlugin {
    registerPlugin(server: Hapi.Server): void;
    register(server:any, options:any, next:any);
    attributes?: any;
}