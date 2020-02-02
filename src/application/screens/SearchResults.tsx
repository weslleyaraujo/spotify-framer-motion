/**  @jsx jsx */
import { useLazyQuery } from "@apollo/react-hooks";
import { jsx } from "@emotion/core";
import { gql } from "apollo-boost";
import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";
import { Icon } from "../../components/atoms/Icon/Icon";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { Grid } from "../../components/utilities/Grid/Grid";
import { Icons } from "../../foundations/icons";
import {
  GQLGetSearchResultsQuery,
  GQLGetSearchResultsQueryVariables,
  GQLSearchResultType
} from "../../graphql/generated";
import {
  INTERACTIONS,
  useLazyInteractions
} from "../../hooks/use-interactions";
import { Line } from "../components/Line/Line";
import { SearchInput } from "../components/SearchInput/SearchInput";

interface SearchResultsProps {}

function SearchResults(props: SearchResultsProps) {
  const createInteraction = useLazyInteractions();
  const [search, { data }] = useLazyQuery<
    GQLGetSearchResultsQuery,
    GQLGetSearchResultsQueryVariables
  >(
    gql`
      query GetSearchResults($term: String!) {
        search(term: $term) @client {
          type
          name
          body
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
            case GQLSearchResultType.Track: {
              return (
                <Line
                  key={`search-result-${item.id}`}
                  body={
                    <View supportsTruncation>
                      <TextLine numberOfLines={1}>{item.name}</TextLine>
                      <TextLine text={item.body} color="foregroundSecondary" />
                    </View>
                  }
                  head={
                    <Picture
                      width={60}
                      height={60}
                      alt="Music"
                      source={item.cover}
                      aspectRatio="square"
                    />
                  }
                  interaction={createInteraction(INTERACTIONS.NAVIGATE_ALBUM, {
                    id: item.id,
                    label: `Go to ${item.name}`
                  })}
                />
              );
            }
            case GQLSearchResultType.Album: {
              return (
                <Line
                  key={`search-result-${item.id}`}
                  interaction={createInteraction(INTERACTIONS.NAVIGATE_ALBUM, {
                    id: item.id,
                    label: `Go to ${item.name}`
                  })}
                  head={
                    <Picture
                      width={60}
                      height={60}
                      alt="Music"
                      source={item.cover}
                      aspectRatio="square"
                    />
                  }
                  body={
                    <View supportsTruncation>
                      <TextLine numberOfLines={1}>{item.name}</TextLine>
                      <TextLine text={item.body} color="foregroundSecondary" />
                    </View>
                  }
                  tail={<Icon<Icons> type="strokeArrowUp" size="small" />}
                />
              );
            }
            case GQLSearchResultType.Artist: {
              return (
                <Line
                  key={`search-result-${item.id}`}
                  interaction={createInteraction(INTERACTIONS.NAVIGATE_ARTIST, {
                    id: item.id,
                    label: `Go to ${item.name}`
                  })}
                  head={
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
                  }
                  body={
                    <View supportsTruncation>
                      <TextLine numberOfLines={1}>{item.name}</TextLine>
                      <TextLine text={item.body} color="foregroundSecondary" />
                    </View>
                  }
                  tail={<Icon<Icons> type="strokeArrowUp" size="small" />}
                />
              );
            }
          }
        })}
      </Grid>
    </FadePresence>
  );
}

export { SearchResults, SearchResults as default };
