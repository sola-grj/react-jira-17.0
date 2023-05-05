import { type } from "@testing-library/user-event/dist/type";
import React, { ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

// 从原始的DroppableProps中删除children属性，并自行规定children属性的类型为ReactNode
type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        // if (React.isValidElement(children)) {
        //   return React.cloneElement(children, {
        //     ...provided.droppableProps,
        //     ref: provided.innerRef,
        //     provided,
        //   });
        // }
        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

// 自定义组件想让用户可以使用ref那么就需要使用以下方式
type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => {
    return (
      <div style={{}} className="hello-world" ref={ref}>
        {children}
        {props.provided?.placeholder}
      </div>
    );
  }
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };

export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        // if (React.isValidElement(children)) {
        //   return React.cloneElement(children, {
        //     ...provided.draggableProps,
        //     ...provided.dragHandleProps,
        //     // ref:provided.innerRef
        //   });
        // }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {children}
          </div>
        );
      }}
    </Draggable>
  );
};
