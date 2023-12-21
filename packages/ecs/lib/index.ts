// <autogen>
import Component from './abstracts/Component';
import Engine from './Engine';
import Entity from './abstracts/Entity';
import Hereditary from './decorators/Hereditary';
import IComponent from './interfaces/IComponent';
import IComponentMaster from './interfaces/IComponentMaster';
import IEngine from './interfaces/IEngine';
import IEntity from './interfaces/IEntity';
import IEntityMaster from './interfaces/IEntityMaster';
import IRenderingSystem from './interfaces/IRenderingSystem';
import ISystem from './interfaces/ISystem';
import ISystemMaster from './interfaces/ISystemMaster';
import RenderingSystem from './abstracts/RenderingSystem';
import System from './abstracts/System';
import { COMPONENTS } from './singletons/ComponentMaster';
import { ENTITIES } from './singletons/EntityMaster';
import { SYSTEMS } from './singletons/SystemMaster';
export {
  Component,
  Entity,
  RenderingSystem,
  System,
  Hereditary,
  IComponent,
  IComponentMaster,
  IEngine,
  IEntity,
  IEntityMaster,
  IRenderingSystem,
  ISystem,
  ISystemMaster,
  COMPONENTS,
  ENTITIES,
  SYSTEMS,
  Engine,
};
// </autogen>
import { ABC, Constructor } from '@plasmastrapi/base';
export type Etor<T extends IEntity, TArg = {}> = Constructor<T, TArg> | ABC<T>;
export type Ctor<T extends IComponent<TArg>, TArg extends {}> = Constructor<T, { data: TArg; entity: IEntity }>;
export type Stor = Constructor<ISystem, void>;
