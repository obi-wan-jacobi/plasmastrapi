// <autogen>
import Component from './abstracts/Component';
import Entity from './abstracts/Entity';
import IComponent from './interfaces/IComponent';
import IComponentMaster from './interfaces/IComponentMaster';
import IEntity from './interfaces/IEntity';
import IEntityMaster from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import ISystemMaster from './interfaces/ISystemMaster';
import ImageComponent from './components/ImageComponent';
import LabelComponent from './components/LabelComponent';
import LineComponent from './components/LineComponent';
import PixelComponent from './components/PixelComponent';
import PixelMapComponent from './components/PixelMapComponent';
import PoseComponent from './components/PoseComponent';
import ShapeComponent from './components/ShapeComponent';
import StyleComponent from './components/StyleComponent';
import System from './abstracts/System';
import hereditary from './decorators/hereditary';
import { COMPONENTS } from './singletons/ComponentMaster';
import { ENTITIES } from './singletons/EntityMaster';
import { IOC } from './singletons/IOC';
import { SYSTEMS } from './singletons/SystemMaster';
export {
  Component,
  Entity,
  System,
  ImageComponent,
  LabelComponent,
  LineComponent,
  PixelComponent,
  PixelMapComponent,
  PoseComponent,
  ShapeComponent,
  StyleComponent,
  hereditary,
  IComponent,
  IComponentMaster,
  IEntity,
  IEntityMaster,
  ISystem,
  ISystemMaster,
  COMPONENTS,
  ENTITIES,
  IOC,
  SYSTEMS,
};
// </autogen>
import { ABC, Constructor } from '@plasmastrapi/base';
export type Etor<T extends IEntity, TArg = {}> = Constructor<T, TArg> | ABC<T>;
export type Ctor<T extends IComponent<TArg>, TArg extends {}> = Constructor<T, { data: TArg; entity: IEntity }>;
export type Stor = Constructor<ISystem, void>;
