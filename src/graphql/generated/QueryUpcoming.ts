/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTPAGEHIGHLIGHT_ALIGNMENT } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryUpcoming
// ====================================================

export interface QueryUpcoming_upcommingGames_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryUpcoming_upcommingGames_developers {
  __typename: "Developer";
  name: string;
}

export interface QueryUpcoming_upcommingGames {
  __typename: "Game";
  cover: QueryUpcoming_upcommingGames_cover | null;
  id: string;
  name: string;
  slug: string;
  developers: QueryUpcoming_upcommingGames_developers[];
  price: number;
}

export interface QueryUpcoming_showcase_upcoming_highlight_background {
  __typename: "UploadFile";
  url: string;
}

export interface QueryUpcoming_showcase_upcoming_highlight_floatImage {
  __typename: "UploadFile";
  url: string;
}

export interface QueryUpcoming_showcase_upcoming_highlight {
  __typename: "ComponentPageHighlight";
  title: string;
  subtitle: string;
  background: QueryUpcoming_showcase_upcoming_highlight_background | null;
  floatImage: QueryUpcoming_showcase_upcoming_highlight_floatImage | null;
  buttonLabel: string;
  buttonLink: string;
  alignment: ENUM_COMPONENTPAGEHIGHLIGHT_ALIGNMENT | null;
}

export interface QueryUpcoming_showcase_upcoming {
  __typename: "ComponentPageSection";
  title: string | null;
  highlight: QueryUpcoming_showcase_upcoming_highlight | null;
}

export interface QueryUpcoming_showcase {
  __typename: "Home";
  upcoming: QueryUpcoming_showcase_upcoming | null;
}

export interface QueryUpcoming {
  upcommingGames: QueryUpcoming_upcommingGames[];
  showcase: QueryUpcoming_showcase | null;
}

export interface QueryUpcomingVariables {
  date: any;
  limit: number;
}
