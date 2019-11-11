import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { SearchHeader } from "../components/SearchHeader/SearchHeader";
import { Grid } from "../../components/utilities/Grid/Grid";
import { Picture } from "../../components/atoms/Picture/Picture";
import { Icon } from "../../components/atoms/Icon/Icon";
import { Icons } from "../../foundations/icons";

interface Props {}

function SearchResults(props: Props) {
  return (
    <FadePresence>
      <SearchHeader />
      <Grid>
        {[...new Array(12)].map((item, key) => (
          <View
            key={key}
            padding={["small", "medium"]}
            justify="space-between"
            align="center"
          >
            <View>
              <Picture
                width={60}
                height={60}
                alt="Music"
                source="http://placehold.it/60x60"
                aspectRatio="square"
              />
            </View>
            <View flex={1} padding={["small", "medium"]}>
              <TextLine text="Tame impala" />
              <TextLine text="Tame impala" color="foregroundSecondary" />
            </View>
            <View>
              <Icon<Icons> type="strokeArrowUp" size="small" />
            </View>
          </View>
        ))}
      </Grid>
    </FadePresence>
  );
}

export { SearchResults, SearchResults as default };
