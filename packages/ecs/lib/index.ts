// <autogen>
import Component, {  } from './abstracts/Component';
import Entity, { IOC } from './abstracts/Entity';
import IComponent, {  } from './interfaces/IComponent';
import IComponentMaster, {  } from './interfaces/IComponentMaster';
import IEntity, {  } from './interfaces/IEntity';
import IEntityMaster, {  } from './interfaces/IEntityMaster';
import ISystem, {  } from './interfaces/ISystem';
import ISystemMaster, {  } from './interfaces/ISystemMaster';
import System, {  } from './abstracts/System';
import SystemMaster, {  } from './concretes/SystemMaster';
import hereditary, {  } from './decorators/hereditary';
import { COMPONENTS } from './concretes/ComponentMaster';
import { ENTITIES } from './concretes/EntityMaster';
export { Component, Entity, IOC, System, COMPONENTS, ENTITIES, SystemMaster, hereditary, IComponent, IComponentMaster, IEntity, IEntityMaster, ISystem, ISystemMaster };
// </autogen>
import { ABC, Constructor, Tuple } from '@plasmastrapi/base';
export type Etor<T extends IEntity, TArg> = Constructor<T, TArg>;
export type EntityClass<T extends IEntity> = ABC<T>;
export type Ctor<T extends IComponent<TArg>, TArg extends {}> = Constructor<T, { data: TArg; entity: IEntity }>;
export type ComponentClass<T extends IComponent<TArg>, TArg extends {}> = ABC<T>;
export type Stor = Constructor<ISystem, void>;
export type SystemClass<T extends ISystem> = ABC<T>;
export type ComponentTuple<T extends {}> = Tuple<Ctor<IComponent<T>, T>, T>;