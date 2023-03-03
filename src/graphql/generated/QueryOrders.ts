/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryOrders
// ====================================================

export interface QueryOrders_orders_games_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryOrders_orders_games_developers {
  __typename: "Developer";
  name: string;
}

export interface QueryOrders_orders_games {
  __typename: "Game";
  cover: QueryOrders_orders_games_cover | null;
  id: string;
  name: string;
  slug: string;
  developers: QueryOrders_orders_games_developers[];
  price: number;
}

export interface QueryOrders_orders {
  __typename: "Order";
  id: string;
  card_brand: string | null;
  card_last4: string | null;
  created_at: any;
  games: QueryOrders_orders_games[];
}

export interface QueryOrders {
  orders: QueryOrders_orders[];
}

export interface QueryOrdersVariables {
  identifier: string;
  sort: string;
}
