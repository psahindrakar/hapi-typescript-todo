import * as Sequelize from 'sequelize';

export interface ITaskAttributes {
    title: string;
    description: string;
    status: boolean;
}

export interface ITaskInstance extends Sequelize.Instance<ITaskAttributes> {
    id: number;
    
    title: string;
    description: string;
    status: boolean;
}

export default function defineTask(sequelize: Sequelize.Sequelize, DataTypes) {
    let Task = sequelize.define('Task', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(20)
        },
        description: {
            type: Sequelize.STRING(50)
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    
    Task.sync();
    
    return Task;
}