/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersPermissionsRegisterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: mutationRegister
// ====================================================

export interface mutationRegister_register {
  __typename: "UsersPermissionsLoginPayload";
  jwt: string | null;
}

export interface mutationRegister {
  register: mutationRegister_register;
}

export interface mutationRegisterVariables {
  input: UsersPermissionsRegisterInput;
}
