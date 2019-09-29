import { Colors } from "../foundations/Theme";
import { Icons } from "../foundations/icons";
import { Media } from "./Media";
import { Required } from "utility-types";

export type ActionProps<T = {}> = {
  as: React.ReactType;
} & T;

export interface Interaction<T extends Object> {
  action: ActionProps<T>;
  icon?: Icons;
  iconColor?: keyof Colors;
  label: string;
}

export interface Interactions<
  Primary extends Object = {},
  Secondary extends Object = {},
  Third extends Object = {},
  Fourth extends Object = {},
  Fifth extends Object = {}
> {
  primary?: Interaction<Primary>;
  secondary?: Interaction<Secondary>;
  third?: Interaction<Third>;
  fourth?: Interaction<Fourth>;
  fifth?: Interaction<Fifth>;
}

export interface Card<
  Payload extends Object = {},
  CardInteractions extends Interactions = Interactions
> {
  /** Payload of card. This will be defined by the card itself. */
  payload?: Payload;

  /** Main media of card */
  media?: Media;

  /** Title of card */
  title?: string;

  /** Subtitle of card */
  subtitle?: string;

  /** Body of card */
  body?: string;

  /** Info of card */
  info?: string;

  /** Interactions inside the card */
  interactions?: CardInteractions;
}

export type CardProps<
  Config extends {
    required: keyof Card;
    actions: { [key in keyof Interactions]?: any | null };
    interactions: keyof Interactions;
  } = {
    required: "interactions";
    actions: {};
    interactions: "primary";
  },
  Payload extends Object = {}
> = Required<
  Card<
    Payload,
    Required<
      Pick<
        Interactions<
          Config["actions"]["primary"],
          Config["actions"]["secondary"],
          Config["actions"]["third"],
          Config["actions"]["fourth"],
          Config["actions"]["fifth"]
        >,
        Config["interactions"]
      >
    >
  >,
  Config["required"]
>;
