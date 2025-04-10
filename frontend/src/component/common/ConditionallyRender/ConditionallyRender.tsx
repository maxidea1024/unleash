// import type { ReactNode } from 'react';

// type TargetElement =
//   | JSX.Element
//   | JSX.Element[]
//   | RenderFunc
//   | ReactNode
//   | null;

// type RenderFunc = () => JSX.Element;

// type ConditionallyRenderProps = {
//   condition: boolean;
//   show: TargetElement;
//   elseShow?: TargetElement;
// };

// export const ConditionallyRender = ({
//   condition,
//   show,
//   elseShow,
// }: ConditionallyRenderProps): JSX.Element | null => {
//   const handleFunction = (renderFunc: RenderFunc): JSX.Element | null => {
//     const result = renderFunc();
//     if (!result) {
//       /* eslint-disable-next-line */
//       console.warn(
//         'Nothing was returned from your render function. Verify that you are returning a valid react component',
//       );
//       return null;
//     }

//     return result;
//   };

//   const isFunc = (param: TargetElement): boolean => {
//     return typeof param === 'function';
//   };

//   if (condition) {
//     if (isFunc(show)) {
//       return handleFunction(show as RenderFunc);
//     }

//     return show as JSX.Element;
//   }

//   if (!condition && elseShow) {
//     if (isFunc(elseShow)) {
//       return handleFunction(elseShow as RenderFunc);
//     }

//     return elseShow as JSX.Element;
//   }

//   return null;
// };
