import { ActionProps } from "../../../interfaces/Card";
import React from "react";

function Action<T>({ as: ActionElement, ...props }: ActionProps<T>) {
  return <ActionElement {...props} />;
}

export { Action };
