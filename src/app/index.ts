import * as Hapi from 'hapi';
import { IHapiPlugin } from './interfaces'

const fs = require('fs');
const path = require('path');

export default (server: Hapi.Server) => {
    const pluginsPath = __dirname + '/';
    const plugins = fs.readdirSync(pluginsPath).filter(file => fs.statSync(path.join(pluginsPath, file)).isDirectory());
    plugins.forEach((pluginName: string) => {
        
        console.log('Loading plugin', pluginsPath + pluginName);
        let plugin: IHapiPlugin = new (require(pluginsPath + pluginName)).default(server);
        console.log('Plugin ', plugin);
        plugin.registerPlugin(server);
    });  
}