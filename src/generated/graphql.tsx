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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getUserDetails?: Maybe<User>;
  bye: Scalars['String'];
  geAllItemsIds: ItemIdsResponse;
  getItemDetailsById: ItemResponse;
  getAllCategoryAndSubCategoryName: Array<CategoryAndSubCategory>;
  getAllSubCategoriesWithCategory: Array<SubCategoryWithCategoryResponse>;
  getAllItemIdsBySubCategory: ItemIdsResponse;
  getInventoryLevelByInventoryId: Scalars['Float'];
  getCartDetailsByCartId: CartResponse;
  getCartDetailsByUserId: CartResponse;
  getLatestOffers: Offers;
};


export type QueryGetItemDetailsByIdArgs = {
  itemId: Scalars['String'];
};


export type QueryGetAllItemIdsBySubCategoryArgs = {
  subCategory: Scalars['String'];
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
  brand: Scalars['String'];
  isStared: Scalars['Boolean'];
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

export type CategoryAndSubCategory = {
  __typename?: 'CategoryAndSubCategory';
  category: Scalars['String'];
  subCategory: Array<Scalars['String']>;
};

export type SubCategoryWithCategoryResponse = {
  __typename?: 'SubCategoryWithCategoryResponse';
  category: Scalars['String'];
  subCategory: Scalars['String'];
  image: Scalars['String'];
};

export type Offers = {
  __typename?: 'offers';
  offers: Array<OffersItem>;
  count?: Maybe<Scalars['Int']>;
};

export type OffersItem = {
  __typename?: 'offersItem';
  image: Scalars['String'];
  title: Scalars['String'];
  startAt: Scalars['DateTime'];
  endAt: Scalars['DateTime'];
  offerId: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  revokeRefreshTokensForUser: Scalars['Boolean'];
  loginUser: LoginResponse;
  registerUser: RegisterUserResponse;
  logoutUser: Scalars['Boolean'];
  addItem: Scalars['String'];
  addRemoveItemToWishlist: Scalars['Boolean'];
  updatedInventoryByInventoryId: Scalars['Boolean'];
  incrementInventoryByInventoryId: Scalars['Boolean'];
  decrementInventoryByInventoryId: Scalars['Boolean'];
  AddToCart: Scalars['Boolean'];
  adjustItemQyantity: Scalars['Boolean'];
  addOffer: Scalars['String'];
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


export type MutationAddRemoveItemToWishlistArgs = {
  itemId: Scalars['String'];
  action: AddOrRemove;
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


export type MutationAddOfferArgs = {
  image: Scalars['String'];
  title: Scalars['String'];
  startAt: Scalars['DateTime'];
  endAt: Scalars['DateTime'];
};

export type LoginResponse = EamilNotExistsError | PasswordNotMatchError | LoginSuccess;

export type EamilNotExistsError = IError & {
  __typename?: 'EamilNotExistsError';
  message: Scalars['String'];
  errorCode: Scalars['String'];
  isEmailExists: Scalars['Boolean'];
};

export type IError = {
  message: Scalars['String'];
  errorCode: Scalars['String'];
};

export type PasswordNotMatchError = IError & {
  __typename?: 'PasswordNotMatchError';
  message: Scalars['String'];
  errorCode: Scalars['String'];
  isPasswordMatched: Scalars['Boolean'];
};

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  accessToken: Scalars['String'];
  user: User;
};

export type RegisterUserResponse = AllreadyExistsError | HashedPassowdError | SomethingWentWrongError | RegisterSuccess;

export type AllreadyExistsError = IError & {
  __typename?: 'AllreadyExistsError';
  message: Scalars['String'];
  errorCode: Scalars['String'];
  isUserExists: Scalars['Boolean'];
};

export type HashedPassowdError = IError & {
  __typename?: 'HashedPassowdError';
  message: Scalars['String'];
  errorCode: Scalars['String'];
  uanbleToHash: Scalars['Boolean'];
};

export type SomethingWentWrongError = IError & {
  __typename?: 'SomethingWentWrongError';
  message: Scalars['String'];
  errorCode: Scalars['String'];
  isSomethingWorng: Scalars['Boolean'];
};

export type RegisterSuccess = {
  __typename?: 'RegisterSuccess';
  userId: Scalars['String'];
};

export type InventoryInput = {
  available: Scalars['Int'];
  price: Scalars['Int'];
  discount?: Maybe<Scalars['Int']>;
};

/** add or remove item form wishlist */
export enum AddOrRemove {
  Add = 'ADD',
  Remove = 'REMOVE'
}

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

export type AddRemoveItemToWishlistMutationVariables = Exact<{
  itemId: Scalars['String'];
  action: AddOrRemove;
}>;


export type AddRemoveItemToWishlistMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addRemoveItemToWishlist'>
);

export type GetAllItemIdsBySubCategoryQueryVariables = Exact<{
  subCategory: Scalars['String'];
}>;


export type GetAllItemIdsBySubCategoryQuery = (
  { __typename?: 'Query' }
  & { getAllItemIdsBySubCategory: (
    { __typename?: 'ItemIdsResponse' }
    & Pick<ItemIdsResponse, 'itemIds' | 'count'>
  ) }
);

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type GetAllCategoryAndSubCategoryNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoryAndSubCategoryNameQuery = (
  { __typename?: 'Query' }
  & { getAllCategoryAndSubCategoryName: Array<(
    { __typename?: 'CategoryAndSubCategory' }
    & Pick<CategoryAndSubCategory, 'category' | 'subCategory'>
  )> }
);

export type GetItemDetailsByIdQueryVariables = Exact<{
  itemId: Scalars['String'];
}>;


export type GetItemDetailsByIdQuery = (
  { __typename?: 'Query' }
  & { getItemDetailsById: (
    { __typename?: 'ItemResponse' }
    & Pick<ItemResponse, 'itemId' | 'url' | 'name' | 'brand' | 'category' | 'isStared' | 'subCategory'>
    & { inventory: (
      { __typename?: 'inentory' }
      & Pick<Inentory, 'inventoryId' | 'available' | 'price' | 'discount'>
    ) }
  ) }
);

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename: 'EamilNotExistsError' }
    & Pick<EamilNotExistsError, 'message' | 'errorCode' | 'isEmailExists'>
  ) | (
    { __typename: 'PasswordNotMatchError' }
    & Pick<PasswordNotMatchError, 'message' | 'errorCode' | 'isPasswordMatched'>
  ) | (
    { __typename: 'LoginSuccess' }
    & Pick<LoginSuccess, 'accessToken'>
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

export type GetLAtestOffersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLAtestOffersQuery = (
  { __typename?: 'Query' }
  & { getLatestOffers: (
    { __typename?: 'offers' }
    & Pick<Offers, 'count'>
    & { offers: Array<(
      { __typename?: 'offersItem' }
      & Pick<OffersItem, 'offerId' | 'image' | 'title' | 'startAt' | 'endAt'>
    )> }
  ) }
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename: 'AllreadyExistsError' }
    & Pick<AllreadyExistsError, 'message' | 'errorCode' | 'isUserExists'>
  ) | (
    { __typename: 'HashedPassowdError' }
    & Pick<HashedPassowdError, 'message' | 'errorCode'>
  ) | (
    { __typename: 'SomethingWentWrongError' }
    & Pick<SomethingWentWrongError, 'message' | 'errorCode'>
  ) | (
    { __typename: 'RegisterSuccess' }
    & Pick<RegisterSuccess, 'userId'>
  ) }
);

export type GetAllSubCategoriesWithCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSubCategoriesWithCategoryQuery = (
  { __typename?: 'Query' }
  & { getAllSubCategoriesWithCategory: Array<(
    { __typename?: 'SubCategoryWithCategoryResponse' }
    & Pick<SubCategoryWithCategoryResponse, 'category' | 'subCategory' | 'image'>
  )> }
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
export const AddRemoveItemToWishlistDocument = gql`
    mutation AddRemoveItemToWishlist($itemId: String!, $action: AddOrRemove!) {
  addRemoveItemToWishlist(itemId: $itemId, action: $action)
}
    `;
export type AddRemoveItemToWishlistMutationFn = Apollo.MutationFunction<AddRemoveItemToWishlistMutation, AddRemoveItemToWishlistMutationVariables>;

/**
 * __useAddRemoveItemToWishlistMutation__
 *
 * To run a mutation, you first call `useAddRemoveItemToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRemoveItemToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRemoveItemToWishlistMutation, { data, loading, error }] = useAddRemoveItemToWishlistMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useAddRemoveItemToWishlistMutation(baseOptions?: Apollo.MutationHookOptions<AddRemoveItemToWishlistMutation, AddRemoveItemToWishlistMutationVariables>) {
        return Apollo.useMutation<AddRemoveItemToWishlistMutation, AddRemoveItemToWishlistMutationVariables>(AddRemoveItemToWishlistDocument, baseOptions);
      }
export type AddRemoveItemToWishlistMutationHookResult = ReturnType<typeof useAddRemoveItemToWishlistMutation>;
export type AddRemoveItemToWishlistMutationResult = Apollo.MutationResult<AddRemoveItemToWishlistMutation>;
export type AddRemoveItemToWishlistMutationOptions = Apollo.BaseMutationOptions<AddRemoveItemToWishlistMutation, AddRemoveItemToWishlistMutationVariables>;
export const GetAllItemIdsBySubCategoryDocument = gql`
    query GetAllItemIdsBySubCategory($subCategory: String!) {
  getAllItemIdsBySubCategory(subCategory: $subCategory) {
    itemIds
    count
  }
}
    `;

/**
 * __useGetAllItemIdsBySubCategoryQuery__
 *
 * To run a query within a React component, call `useGetAllItemIdsBySubCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllItemIdsBySubCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllItemIdsBySubCategoryQuery({
 *   variables: {
 *      subCategory: // value for 'subCategory'
 *   },
 * });
 */
export function useGetAllItemIdsBySubCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetAllItemIdsBySubCategoryQuery, GetAllItemIdsBySubCategoryQueryVariables>) {
        return Apollo.useQuery<GetAllItemIdsBySubCategoryQuery, GetAllItemIdsBySubCategoryQueryVariables>(GetAllItemIdsBySubCategoryDocument, baseOptions);
      }
export function useGetAllItemIdsBySubCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllItemIdsBySubCategoryQuery, GetAllItemIdsBySubCategoryQueryVariables>) {
          return Apollo.useLazyQuery<GetAllItemIdsBySubCategoryQuery, GetAllItemIdsBySubCategoryQueryVariables>(GetAllItemIdsBySubCategoryDocument, baseOptions);
        }
export type GetAllItemIdsBySubCategoryQueryHookResult = ReturnType<typeof useGetAllItemIdsBySubCategoryQuery>;
export type GetAllItemIdsBySubCategoryLazyQueryHookResult = ReturnType<typeof useGetAllItemIdsBySubCategoryLazyQuery>;
export type GetAllItemIdsBySubCategoryQueryResult = Apollo.QueryResult<GetAllItemIdsBySubCategoryQuery, GetAllItemIdsBySubCategoryQueryVariables>;
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
export const GetAllCategoryAndSubCategoryNameDocument = gql`
    query GetAllCategoryAndSubCategoryName {
  getAllCategoryAndSubCategoryName {
    category
    subCategory
  }
}
    `;

/**
 * __useGetAllCategoryAndSubCategoryNameQuery__
 *
 * To run a query within a React component, call `useGetAllCategoryAndSubCategoryNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoryAndSubCategoryNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoryAndSubCategoryNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoryAndSubCategoryNameQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoryAndSubCategoryNameQuery, GetAllCategoryAndSubCategoryNameQueryVariables>) {
        return Apollo.useQuery<GetAllCategoryAndSubCategoryNameQuery, GetAllCategoryAndSubCategoryNameQueryVariables>(GetAllCategoryAndSubCategoryNameDocument, baseOptions);
      }
export function useGetAllCategoryAndSubCategoryNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoryAndSubCategoryNameQuery, GetAllCategoryAndSubCategoryNameQueryVariables>) {
          return Apollo.useLazyQuery<GetAllCategoryAndSubCategoryNameQuery, GetAllCategoryAndSubCategoryNameQueryVariables>(GetAllCategoryAndSubCategoryNameDocument, baseOptions);
        }
export type GetAllCategoryAndSubCategoryNameQueryHookResult = ReturnType<typeof useGetAllCategoryAndSubCategoryNameQuery>;
export type GetAllCategoryAndSubCategoryNameLazyQueryHookResult = ReturnType<typeof useGetAllCategoryAndSubCategoryNameLazyQuery>;
export type GetAllCategoryAndSubCategoryNameQueryResult = Apollo.QueryResult<GetAllCategoryAndSubCategoryNameQuery, GetAllCategoryAndSubCategoryNameQueryVariables>;
export const GetItemDetailsByIdDocument = gql`
    query GetItemDetailsById($itemId: String!) {
  getItemDetailsById(itemId: $itemId) {
    itemId
    url
    name
    brand
    category
    isStared
    subCategory
    inventory {
      inventoryId
      available
      price
      discount
    }
  }
}
    `;

/**
 * __useGetItemDetailsByIdQuery__
 *
 * To run a query within a React component, call `useGetItemDetailsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemDetailsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemDetailsByIdQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useGetItemDetailsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetItemDetailsByIdQuery, GetItemDetailsByIdQueryVariables>) {
        return Apollo.useQuery<GetItemDetailsByIdQuery, GetItemDetailsByIdQueryVariables>(GetItemDetailsByIdDocument, baseOptions);
      }
export function useGetItemDetailsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemDetailsByIdQuery, GetItemDetailsByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetItemDetailsByIdQuery, GetItemDetailsByIdQueryVariables>(GetItemDetailsByIdDocument, baseOptions);
        }
export type GetItemDetailsByIdQueryHookResult = ReturnType<typeof useGetItemDetailsByIdQuery>;
export type GetItemDetailsByIdLazyQueryHookResult = ReturnType<typeof useGetItemDetailsByIdLazyQuery>;
export type GetItemDetailsByIdQueryResult = Apollo.QueryResult<GetItemDetailsByIdQuery, GetItemDetailsByIdQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    __typename
    ... on IError {
      message
      errorCode
    }
    ... on EamilNotExistsError {
      isEmailExists
    }
    ... on PasswordNotMatchError {
      isPasswordMatched
    }
    ... on LoginSuccess {
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
export const GetLAtestOffersDocument = gql`
    query GetLAtestOffers {
  getLatestOffers {
    offers {
      offerId
      image
      title
      startAt
      endAt
    }
    count
  }
}
    `;

/**
 * __useGetLAtestOffersQuery__
 *
 * To run a query within a React component, call `useGetLAtestOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLAtestOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLAtestOffersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLAtestOffersQuery(baseOptions?: Apollo.QueryHookOptions<GetLAtestOffersQuery, GetLAtestOffersQueryVariables>) {
        return Apollo.useQuery<GetLAtestOffersQuery, GetLAtestOffersQueryVariables>(GetLAtestOffersDocument, baseOptions);
      }
export function useGetLAtestOffersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLAtestOffersQuery, GetLAtestOffersQueryVariables>) {
          return Apollo.useLazyQuery<GetLAtestOffersQuery, GetLAtestOffersQueryVariables>(GetLAtestOffersDocument, baseOptions);
        }
export type GetLAtestOffersQueryHookResult = ReturnType<typeof useGetLAtestOffersQuery>;
export type GetLAtestOffersLazyQueryHookResult = ReturnType<typeof useGetLAtestOffersLazyQuery>;
export type GetLAtestOffersQueryResult = Apollo.QueryResult<GetLAtestOffersQuery, GetLAtestOffersQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $firstName: String!, $lastName: String) {
  registerUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
  ) {
    __typename
    ... on IError {
      message
      errorCode
    }
    ... on AllreadyExistsError {
      isUserExists
    }
    ... on RegisterSuccess {
      userId
    }
  }
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
export const GetAllSubCategoriesWithCategoryDocument = gql`
    query getAllSubCategoriesWithCategory {
  getAllSubCategoriesWithCategory {
    category
    subCategory
    image
  }
}
    `;

/**
 * __useGetAllSubCategoriesWithCategoryQuery__
 *
 * To run a query within a React component, call `useGetAllSubCategoriesWithCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSubCategoriesWithCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSubCategoriesWithCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSubCategoriesWithCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSubCategoriesWithCategoryQuery, GetAllSubCategoriesWithCategoryQueryVariables>) {
        return Apollo.useQuery<GetAllSubCategoriesWithCategoryQuery, GetAllSubCategoriesWithCategoryQueryVariables>(GetAllSubCategoriesWithCategoryDocument, baseOptions);
      }
export function useGetAllSubCategoriesWithCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSubCategoriesWithCategoryQuery, GetAllSubCategoriesWithCategoryQueryVariables>) {
          return Apollo.useLazyQuery<GetAllSubCategoriesWithCategoryQuery, GetAllSubCategoriesWithCategoryQueryVariables>(GetAllSubCategoriesWithCategoryDocument, baseOptions);
        }
export type GetAllSubCategoriesWithCategoryQueryHookResult = ReturnType<typeof useGetAllSubCategoriesWithCategoryQuery>;
export type GetAllSubCategoriesWithCategoryLazyQueryHookResult = ReturnType<typeof useGetAllSubCategoriesWithCategoryLazyQuery>;
export type GetAllSubCategoriesWithCategoryQueryResult = Apollo.QueryResult<GetAllSubCategoriesWithCategoryQuery, GetAllSubCategoriesWithCategoryQueryVariables>;
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