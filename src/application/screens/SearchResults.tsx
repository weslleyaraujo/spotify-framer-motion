/**  @jsx jsx */
import { useLazyQuery } from "@apollo/react-hooks";
import { jsx } from "@emotion/core";
import { gql } from "apollo-boost";
import { Icon } from "../../components/atoms/Icon/Icon";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { Grid } from "../../components/utilities/Grid/Grid";
import { Icons } from "../../foundations/icons";
import { SearchInput } from "../components/SearchInput/SearchInput";
import debounce from "lodash.debounce";
import {
  GQLGetSearchResultsQuery,
  GQLGetSearchResultsQueryVariables,
  GQLSearchResultType
} from "../../graphql/generated";
import {
  useCallback,
  FormEventHandler,
  ChangeEvent,
  Fragment,
  useEffect
} from "react";

interface Props {}

function SearchResults(props: Props) {
  const [search, { data, loading, error }] = useLazyQuery<
    GQLGetSearchResultsQuery,
    GQLGetSearchResultsQueryVariables
  >(
    gql`
      query GetSearchResults($term: String!) {
        search(term: $term) @client {
          type
          name
          id
          cover
        }
      }
    `
  );

  const onChange = useCallback(
    debounce((term: string) => search({ variables: { term } }), 500),
    [search]
  );

  useEffect(() => {
    search({ variables: { term: "" } });
  }, [search]);

  return (
    <FadePresence>
      <SearchInput onChange={onChange} />
      <Grid>
        {data?.search.map((item, key) => {
          switch (item.type) {
            case GQLSearchResultType.Album: {
              return (
                <View
                  padding={["small", "medium"]}
                  justify="space-between"
                  align="center"
                  key={item.id}
                >
                  <View>
                    <Picture
                      width={60}
                      height={60}
                      alt="Music"
                      source={item.cover}
                      aspectRatio="square"
                    />
                  </View>
                  <View flex={1} padding={["small", "medium"]}>
                    <TextLine text="Currents" />
                    <TextLine text={item.name} color="foregroundSecondary" />
                  </View>
                  <View>
                    <Icon<Icons> type="strokeArrowUp" size="small" />
                  </View>
                </View>
              );
            }
            case GQLSearchResultType.Artist: {
              return (
                <View
                  padding={["small", "medium"]}
                  justify="space-between"
                  align="center"
                  key={item.id}
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
                        source={item.cover}
                        aspectRatio="square"
                      />
                    </div>
                  </View>
                  <View flex={1} padding={["small", "medium"]}>
                    <TextLine text={item.name} />
                  </View>
                  <View>
                    <Icon<Icons> type="strokeArrowUp" size="small" />
                  </View>
                </View>
              );
            }
          }
        })}
      </Grid>
    </FadePresence>
  );
}

export { SearchResults, SearchResults as default };
