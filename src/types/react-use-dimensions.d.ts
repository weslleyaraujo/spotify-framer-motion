declare module "react-use-dimensions" {
  interface DimensionObject {
    width: number;
    height: number;
    top: number;
    left: number;
    x: number;
    y: number;
    right: number;
    bottom: number;
  }

  type UseDimensionsHook = [
    (node: HTMLElement | null) => void,
    DimensionObject,
    HTMLElement | null
  ];

  interface UseDimensionsArgs {
    liveMeasure?: boolean;
  }

  function useDimensions({
    liveMeasure
  }?: UseDimensionsArgs): UseDimensionsHook;

  export = useDimensions;
}
