import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getUserDetails?: Maybe<User>;
  bye: Scalars['String'];
  geAllItemsIds: ItemIdsResponse;
  getItemDetailsById: ItemResponse;
  getInventoryLevelByInventoryId: Scalars['Float'];
  getCartDetailsByCartId: CartResponse;
  getCartDetailsByUserId: CartResponse;
};


export type QueryGetItemDetailsByIdArgs = {
  itemId: Scalars['String'];
};


export type QueryGetInventoryLevelByInventoryIdArgs = {
  inventoryId: Scalars['String'];
};


export type QueryGetCartDetailsByCartIdArgs = {
  cartId: Scalars['String'];
};


export type QueryGetCartDetailsByUserIdArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  userId: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  cart: CartResponse;
};

export type CartResponse = {
  __typename?: 'CartResponse';
  cartId: Scalars['String'];
  items: Array<CartItem>;
  count?: Maybe<Scalars['Int']>;
};

export type CartItem = {
  __typename?: 'CartItem';
  itemId: Scalars['String'];
  quantity: Scalars['Int'];
};

export type ItemIdsResponse = {
  __typename?: 'ItemIdsResponse';
  itemIds: Array<Scalars['String']>;
  count: Scalars['Int'];
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  itemId: Scalars['String'];
  url: Scalars['String'];
  name: Scalars['String'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  inventory: Inentory;
};

export type Inentory = {
  __typename?: 'inentory';
  inventoryId: Scalars['String'];
  available: Scalars['Int'];
  price: Scalars['Int'];
  discount?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  revokeRefreshTokensForUser: Scalars['Boolean'];
  loginUser: LoginResponse;
  registerUser: Scalars['String'];
  logoutUser: Scalars['Boolean'];
  addItem: Scalars['String'];
  updatedInventoryByInventoryId: Scalars['Boolean'];
  incrementInventoryByInventoryId: Scalars['Boolean'];
  decrementInventoryByInventoryId: Scalars['Boolean'];
  AddToCart: Scalars['Boolean'];
  adjustItemQyantity: Scalars['Boolean'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
};


export type MutationAddItemArgs = {
  url: Scalars['String'];
  name: Scalars['String'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  inventoryInfo: InventoryInput;
};


export type MutationUpdatedInventoryByInventoryIdArgs = {
  quantity: Scalars['Float'];
  inventoryId: Scalars['String'];
};


export type MutationIncrementInventoryByInventoryIdArgs = {
  quantity: Scalars['Float'];
  inventoryId: Scalars['String'];
};


export type MutationDecrementInventoryByInventoryIdArgs = {
  quantity: Scalars['Float'];
  inventoryId: Scalars['String'];
};


export type MutationAddToCartArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};


export type MutationAdjustItemQyantityArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type InventoryInput = {
  available: Scalars['Int'];
  price: Scalars['Int'];
  discount?: Maybe<Scalars['Int']>;
};

export type AddItemMutationVariables = Exact<{
  url: Scalars['String'];
  name: Scalars['String'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  inventoryInfo: InventoryInput;
}>;


export type AddItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addItem'>
);

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'userId' | 'email' | 'firstName' | 'lastName'>
      & { cart: (
        { __typename?: 'CartResponse' }
        & Pick<CartResponse, 'cartId' | 'count'>
      ) }
    ) }
  ) }
);

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutUser'>
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'registerUser'>
);

export type UserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailsQuery = (
  { __typename?: 'Query' }
  & { getUserDetails?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'email' | 'firstName' | 'lastName'>
    & { cart: (
      { __typename?: 'CartResponse' }
      & Pick<CartResponse, 'cartId' | 'count'>
    ) }
  )> }
);


export const AddItemDocument = gql`
    mutation addItem($url: String!, $name: String!, $category: String!, $subCategory: String!, $inventoryInfo: inventoryInput!) {
  addItem(
    url: $url
    name: $name
    category: $category
    subCategory: $subCategory
    inventoryInfo: $inventoryInfo
  )
}
    `;
export type AddItemMutationFn = Apollo.MutationFunction<AddItemMutation, AddItemMutationVariables>;

/**
 * __useAddItemMutation__
 *
 * To run a mutation, you first call `useAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemMutation, { data, loading, error }] = useAddItemMutation({
 *   variables: {
 *      url: // value for 'url'
 *      name: // value for 'name'
 *      category: // value for 'category'
 *      subCategory: // value for 'subCategory'
 *      inventoryInfo: // value for 'inventoryInfo'
 *   },
 * });
 */
export function useAddItemMutation(baseOptions?: Apollo.MutationHookOptions<AddItemMutation, AddItemMutationVariables>) {
        return Apollo.useMutation<AddItemMutation, AddItemMutationVariables>(AddItemDocument, baseOptions);
      }
export type AddItemMutationHookResult = ReturnType<typeof useAddItemMutation>;
export type AddItemMutationResult = Apollo.MutationResult<AddItemMutation>;
export type AddItemMutationOptions = Apollo.BaseMutationOptions<AddItemMutation, AddItemMutationVariables>;
export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: Apollo.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    accessToken
    user {
      userId
      email
      firstName
      lastName
      cart {
        cartId
        count
      }
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, baseOptions);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $firstName: String!, $lastName: String) {
  registerUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
  )
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const UserDetailsDocument = gql`
    query UserDetails {
  getUserDetails {
    userId
    email
    firstName
    lastName
    cart {
      cartId
      count
    }
  }
}
    `;

/**
 * __useUserDetailsQuery__
 *
 * To run a query within a React component, call `useUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDetailsQuery(baseOptions?: Apollo.QueryHookOptions<UserDetailsQuery, UserDetailsQueryVariables>) {
        return Apollo.useQuery<UserDetailsQuery, UserDetailsQueryVariables>(UserDetailsDocument, baseOptions);
      }
export function useUserDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetailsQuery, UserDetailsQueryVariables>) {
          return Apollo.useLazyQuery<UserDetailsQuery, UserDetailsQueryVariables>(UserDetailsDocument, baseOptions);
        }
export type UserDetailsQueryHookResult = ReturnType<typeof useUserDetailsQuery>;
export type UserDetailsLazyQueryHookResult = ReturnType<typeof useUserDetailsLazyQuery>;
export type UserDetailsQueryResult = Apollo.QueryResult<UserDetailsQuery, UserDetailsQueryVariables>;