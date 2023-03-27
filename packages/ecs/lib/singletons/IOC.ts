import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';

// Hacked by EntityMaster and ComponentMaster
export const IOC = {
  entities: {
    register: (entity: IEntity): IEntity => entity,
    purge: ({}: IEntity): void => undefined,
  },
  components: {
    register: (component: IComponent<any>): IComponent<any> => component,
    purge: ({}: IComponent<any>): void => undefined,
  },
};
