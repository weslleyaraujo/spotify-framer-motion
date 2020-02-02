/**  @jsx jsx */
import { useLazyQuery } from "@apollo/react-hooks";
import { jsx } from "@emotion/core";
import { gql } from "apollo-boost";
import debounce from "lodash.debounce";
import { useCallback, useEffect, Fragment } from "react";
import { Icon } from "../../components/atoms/Icon/Icon";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
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
import { useScrollTopOnce } from "../../hooks/use-scroll-top-once";
import { Line } from "../components/Line/Line";
import { Ring } from "../components/Ring/Ring";
import { SearchInput } from "../components/SearchInput/SearchInput";

interface SearchResultsProps {}

function SearchResults(props: SearchResultsProps) {
  useScrollTopOnce();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <FadePresence>
      <SearchInput onChange={onChange} />
      <Grid>
        {data?.search.map((item, key) => {
          const defaultProps: Pick<
            React.ComponentProps<typeof Line>,
            "head" | "tail" | "children"
          > = {
            children: (
              <Fragment>
                <TextLine numberOfLines={1}>{item.name}</TextLine>
                <TextLine text={item.body} color="foregroundSecondary" />
              </Fragment>
            ),
            tail: <Icon<Icons> type="strokeArrowUp" size="small" />,
            head: (
              <Picture
                width={60}
                height={60}
                alt="Music"
                source={item.cover}
                aspectRatio="square"
              />
            )
          };

          switch (item.type) {
            case GQLSearchResultType.Track: {
              return (
                <Line
                  {...defaultProps}
                  key={`search-result-${item.id}`}
                  // TODO: Navigate track or play it?
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
                  {...defaultProps}
                  key={`search-result-${item.id}`}
                  interaction={createInteraction(INTERACTIONS.NAVIGATE_ALBUM, {
                    id: item.id,
                    label: `Go to ${item.name}`
                  })}
                />
              );
            }
            case GQLSearchResultType.Artist: {
              return (
                <Line
                  {...defaultProps}
                  key={`search-result-${item.id}`}
                  interaction={createInteraction(INTERACTIONS.NAVIGATE_ARTIST, {
                    id: item.id,
                    label: `Go to ${item.name}`
                  })}
                  head={
                    <Ring width={60} height={60}>
                      <Picture
                        width={60}
                        height={60}
                        alt="Music"
                        source={item.cover}
                        aspectRatio="square"
                      />
                    </Ring>
                  }
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
