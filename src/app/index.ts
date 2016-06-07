import * as Hapi from 'hapi';
import { IPlugin } from './interfaces'

const fs = require('fs');
const path = require('path');

export default (server: Hapi.Server) => {
    
    const pluginsPath = __dirname + '/';
    const plugins = fs.readdirSync(pluginsPath).filter(file => fs.statSync(path.join(pluginsPath, file)).isDirectory());
    plugins.forEach((pluginName: string) => {
        
        console.log('Loading plugin', pluginName);
        let plugin: IPlugin = (require(pluginsPath + pluginName)).default();
        console.log(`Registering plugin ${plugin.info().name} v${plugin.info().version}`);
        plugin.register(server); 
    });  
} 