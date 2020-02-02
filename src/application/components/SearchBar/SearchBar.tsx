/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Icons } from "../../../foundations/icons";
import { Layers } from "../../../foundations/Layers";
import { Theme } from "../../../foundations/Theme";

interface SearchBarProps
  extends Pick<React.HTMLProps<HTMLInputElement>, "placeholder" | "onFocus"> {}

interface SearchBarDefaultProps
  extends Required<Pick<SearchBarProps, "placeholder">> {}

const defaultProps: SearchBarDefaultProps = {
  placeholder: "Artists, songs, or podcasts"
};

function SearchBar({
  placeholder,
  onFocus
}: SearchBarProps & SearchBarDefaultProps) {
  const theme = useTheme<Theme>();
  return (
    <View
      justify="center"
      align="center"
      style={{
        position: "relative"
      }}
    >
      <View
        justify="center"
        align="center"
        style={{
          position: "absolute",
          zIndex: Layers.Root + 10,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          pointerEvents: "none"
        }}
      >
        <View margin={["smaller", "small", "none", "none"]}>
          <Icon<Icons>
            type="magnifyingGlassOutline"
            color="absoluteDark"
            size="small"
          />
        </View>
        <TextLine text={placeholder} type="strong" color="absoluteDark" />
      </View>
      <input
        onFocus={onFocus}
        css={{
          border: "none",
          paddingRight: theme.units.large,
          paddingLeft: theme.units.large,
          paddingTop: theme.units.medium,
          paddingBottom: theme.units.medium,
          backgroundColor: theme.colors.absoluteLight,
          borderRadius: theme.constants.borderRadiusSmall,
          width: "100%",
          textAlign: "center",
          zIndex: Layers.Root,
          "&:focus": {
            outline: "transparent"
          }
        }}
      />
    </View>
  );
}

SearchBar.defaultProps = defaultProps;

export { SearchBar };
