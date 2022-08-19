import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import { getAbsolutePose } from 'foundation/helpers/entities';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import AnimationComponent, { IAnimation } from '../components/AnimationComponent';

export default class AnimationSystem extends System {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
      components.forEvery(AnimationComponent)((animation) => {
          const pose = getAbsolutePose(animation.$entity as IHTML5CanvasElement);
          if (!pose) {
              return;
          }
          const animationData = animation.copy() as (IAnimation & { idur?: number });
          if (animationData.idur === undefined) {
              animationData.idur = 0;
          }
          if (animationData.idur === animationData.duration) {
              animationData.idur = 0;
              if (animationData.isReversed) {
                  animationData.frame--;
              } else {
                  animationData.frame++;
              }
              if (animationData.frame > animationData.images.length - 1) {
                  animationData.frame = 0;
              }
              if (animationData.frame < 0) {
                  animationData.frame = animationData.images.length - 1;
              }
          } else if (!animationData.isPaused) {
              animationData.idur++;
          }
          animation.patch(animationData);
          viewport.drawImage({
              pose,
              image: animationData.images[animationData.frame],
          });
      });
  }
}