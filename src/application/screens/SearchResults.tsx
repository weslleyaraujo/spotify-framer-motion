/**  @jsx jsx */
import { jsx } from "@emotion/core";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { SearchHeader } from "../components/SearchHeader/SearchHeader";
import { Grid } from "../../components/utilities/Grid/Grid";
import { Picture } from "../../components/atoms/Picture/Picture";
import { Icon } from "../../components/atoms/Icon/Icon";
import { Icons } from "../../foundations/icons";

import sourceAlbum from "../../assets/images/tame-impala-currents.jpeg";
import source from "../../assets/images/tame-impala.jpeg";

interface Props {}

function SearchResults(props: Props) {
  return (
    <FadePresence>
      <SearchHeader />
      <Grid>
        <View
          padding={["small", "medium"]}
          justify="space-between"
          align="center"
        >
          <View>
            <div
              css={{
                width: 60,
                height: 60,
                borderRadius: "4000px",
                overflow: "hidden"
              }}
            >
              <Picture
                width={60}
                height={60}
                alt="Music"
                source={source}
                aspectRatio="square"
              />
            </div>
          </View>
          <View flex={1} padding={["small", "medium"]}>
            <TextLine text="Tame impala" />
          </View>
          <View>
            <Icon<Icons> type="strokeArrowUp" size="small" />
          </View>
        </View>
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
                source={sourceAlbum}
                aspectRatio="square"
              />
            </View>
            <View flex={1} padding={["small", "medium"]}>
              <TextLine text="Currents" />
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
