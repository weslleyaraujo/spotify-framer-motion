import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { SearchHeader } from "../components/SearchHeader/SearchHeader";
import { Grid } from "../../components/utilities/Grid/Grid";

interface Props {}

function SearchResults(props: Props) {
  return (
    <FadePresence>
      <SearchHeader />
      <Grid>
        {[...new Array(12)].map((item, key) => (
          <View key={key} padding={["large", "medium"]}>
            <TextLine text="Example" />
          </View>
        ))}
      </Grid>
    </FadePresence>
  );
}

export { SearchResults, SearchResults as default };
