import { forwardRef } from "react";
import { cn } from "~/lib/utils";

type VerticalDivProps = React.HTMLAttributes<HTMLDivElement> & {
  xSpacing?: "left" | "center" | "right" | "space-between" | "space-around";
  ySpacing?: "top" | "middle" | "bottom" | "stretch" | "baseline";
  gap?: number;
  centered?: boolean;
};

export const VStack = forwardRef<HTMLDivElement, VerticalDivProps>(
  (
    {
      children,
      className,
      gap = 4,
      centered = false,
      xSpacing,
      ySpacing,
      ...props
    },
    ref,
  ) => {
    VStack.displayName = "VStack";
    const _xSpacing = centered ? "center" : (xSpacing ?? "left");
    const _ySpacing = centered ? "middle" : (ySpacing ?? "top");
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className, {
          "items-start": _xSpacing === "left",
          "items-center": _xSpacing === "center",
          "items-end": _xSpacing === "right",
          "items-stretch": _xSpacing === "space-between",
          "items-baseline": _xSpacing === "space-around",
          "justify-start": _ySpacing === "top",
          "justify-center": _ySpacing === "middle",
          "justify-end": _ySpacing === "bottom",
          "justify-between": _ySpacing === "stretch",
          "justify-around": _ySpacing === "baseline",
        })}
        style={{ gap: `${gap / 4}rem` }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

type HorizontalDivProps = React.HTMLAttributes<HTMLDivElement> & {
  xSpacing?: "left" | "center" | "right" | "between" | "around";
  ySpacing?: "top" | "middle" | "bottom" | "stretch" | "baseline";
  gap?: number;
  centered?: boolean;
};

export const HStack = forwardRef<HTMLDivElement, HorizontalDivProps>(
  (
    {
      children,
      className,
      gap = 4,
      centered = false,
      xSpacing,
      ySpacing,
      ...props
    },
    ref,
  ) => {
    HStack.displayName = "HStack";
    const _xSpacing = centered ? "center" : (xSpacing ?? "left");
    const _ySpacing = centered ? "middle" : (ySpacing ?? "top");

    return (
      <div
        ref={ref}
        className={cn("flex flex-row", className, {
          "justify-start": _xSpacing === "left",
          "justify-center": _xSpacing === "center",
          "justify-end": _xSpacing === "right",
          "justify-between": _xSpacing === "between",
          "justify-around": _xSpacing === "around",
          "items-start": _ySpacing === "top",
          "items-center": _ySpacing === "middle",
          "items-end": _ySpacing === "bottom",
          "items-stretch": _ySpacing === "stretch",
          "items-baseline": _ySpacing === "baseline",
        })}
        style={{ gap: `${gap / 4}rem` }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export const Wrap = forwardRef<
  HTMLDivElement,
  HorizontalDivProps & { maxCols?: number }
>(
  (
    {
      children,
      className,
      gap = 4,
      centered = false,
      xSpacing,
      ySpacing,
      maxCols,
      ...props
    },
    ref,
  ) => {
    Wrap.displayName = "Wrap";
    const _xSpacing = centered ? "center" : (xSpacing ?? "left");
    const _ySpacing = centered ? "middle" : (ySpacing ?? "top");
    return (
      <div
        ref={ref}
        className={cn("flex flex-row flex-wrap", className, {
          "flex-wrap": maxCols !== -1,
          "justify-start": _xSpacing === "left",
          "justify-center": _xSpacing === "center",
          "justify-end": _xSpacing === "right",
          "justify-between": _xSpacing === "between",
          "justify-around": _xSpacing === "around",
          "items-start": _ySpacing === "top",
          "items-center": _ySpacing === "middle",
          "items-end": _ySpacing === "bottom",
          "items-stretch": _ySpacing === "stretch",
          "items-baseline": _ySpacing === "baseline",
        })}
        style={{ gap: `${gap / 4}rem` }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  maxCols?: number;
  xGap?: number;
  yGap?: number;
  direction?: "row" | "column";
  xSpacing?:
    | "center"
    | "left"
    | "right"
    | "space-between"
    | "space-around"
    | "space-evenly";
  ySpacing?:
    | "middle"
    | "top"
    | "bottom"
    | "space-between"
    | "space-around"
    | "space-evenly";
};
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className,
      maxCols = -1,
      xGap = 4,
      yGap = 4,
      direction = "row",
      xSpacing = "left",
      ySpacing = "top",
      ...props
    },
    ref,
  ) => {
    Grid.displayName = "Grid";
    return (
      <div
        ref={ref}
        className={cn("grid", className, {
          "grid-cols-1": direction === "column",
          "grid-cols-2": direction === "row",
          "items-center": xSpacing === "center",
          "items-left": xSpacing === "left",
          "items-right": xSpacing === "right",
          "justify-center": ySpacing === "middle",
          "justify-start": ySpacing === "top",
          "justify-end": ySpacing === "bottom",
          "justify-between": ySpacing === "space-between",
          "justify-around": ySpacing === "space-around",
        })}
        style={{
          gap: `${yGap / 4}rem ${xGap / 4}rem`,
          gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
