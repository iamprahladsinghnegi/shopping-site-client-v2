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
  getItemDetails: ItemDetailsResponse;
  getAllCategoryAndSubCategoryName: Array<CategoryAndSubCategory>;
  getAllSubCategoriesWithCategory: Array<SubCategoryWithCategoryResponse>;
  getAllItemIdsBySubCategory: ItemIdsResponse;
  getAllItemIdsBySubCategoryWithFilter: ItemIdsResponse;
  allSubCategoriesWithItem: Array<SubCatWithItemIdsResponse>;
  getAllItemsByIds: Array<ItemArrayElement>;
  getInventoryLevelByInventoryId: Array<AvailableObject>;
  getCartDetailsByCartId: CartResponse;
  getCartDetails: CartResponse;
  getLatestOffers: Offers;
};


export type QueryGetItemDetailsByIdArgs = {
  itemId: Scalars['String'];
};


export type QueryGetItemDetailsArgs = {
  itemId: Scalars['String'];
};


export type QueryGetAllItemIdsBySubCategoryArgs = {
  subCategory: Scalars['String'];
};


export type QueryGetAllItemIdsBySubCategoryWithFilterArgs = {
  subCategory: Scalars['String'];
  filterOptions: FilterOptions;
};


export type QueryGetAllItemsByIdsArgs = {
  itemIds: Array<Scalars['String']>;
};


export type QueryGetInventoryLevelByInventoryIdArgs = {
  inventoryId: Scalars['String'];
};


export type QueryGetCartDetailsByCartIdArgs = {
  cartId: Scalars['String'];
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
  size: Scalars['String'];
  quantity: Scalars['Int'];
  price: Scalars['Int'];
  discount?: Maybe<Scalars['Int']>;
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
  available: Array<AvailableObject>;
  price: Scalars['Int'];
  discount?: Maybe<Scalars['Int']>;
};

export type AvailableObject = {
  __typename?: 'availableObject';
  name: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

export type ItemDetailsResponse = {
  __typename?: 'ItemDetailsResponse';
  itemId: Scalars['String'];
  name: Scalars['String'];
  brand: Scalars['String'];
  isStared: Scalars['Boolean'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  inventory: Inentory;
  images: Array<Scalars['String']>;
  description: DescriptionObject;
};

export type DescriptionObject = {
  __typename?: 'DescriptionObject';
  details: Scalars['String'];
  size: Scalars['String'];
  fit: Scalars['String'];
  materials: Scalars['String'];
  care: Scalars['String'];
  specifications?: Maybe<Array<SpecificationsObject>>;
  extra?: Maybe<Scalars['String']>;
};

export type SpecificationsObject = {
  __typename?: 'SpecificationsObject';
  key: Scalars['String'];
  value: Scalars['String'];
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

export type FilterOptions = {
  sort: SortFilter;
  color: Array<Scalars['String']>;
  price: Array<Scalars['String']>;
  category: Array<Scalars['String']>;
  discount: Array<Scalars['String']>;
};

/** For Sort the itemIds */
export enum SortFilter {
  New = 'NEW',
  Popularity = 'POPULARITY',
  Discount = 'DISCOUNT',
  Costly = 'COSTLY',
  Budget = 'BUDGET'
}

export type SubCatWithItemIdsResponse = {
  __typename?: 'SubCatWithItemIdsResponse';
  subCategory: Scalars['String'];
  itemIds: Array<Scalars['String']>;
};

export type ItemArrayElement = {
  __typename?: 'ItemArrayElement';
  itemId: Scalars['String'];
  url: Scalars['String'];
  name: Scalars['String'];
  brand: Scalars['String'];
  price: Scalars['Int'];
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
  adjustItemQyantity: Scalars['Float'];
  adjustItemSize: Scalars['String'];
  removeItemFromCart: Scalars['String'];
  createCartWithItem: Scalars['Boolean'];
  addToCart: Scalars['Boolean'];
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
  name: Scalars['String'];
  brand: Scalars['String'];
  categoryInfo: NameWithImageInput;
  subCategoryInfo: NameWithImageInput;
  images: Array<Scalars['String']>;
  inventoryInfo: InventoryInput;
  description: DescriptionInput;
};


export type MutationAddRemoveItemToWishlistArgs = {
  itemId: Scalars['String'];
  action: AddOrRemove;
};


export type MutationUpdatedInventoryByInventoryIdArgs = {
  quantity: Scalars['Float'];
  name: Scalars['String'];
  inventoryId: Scalars['String'];
};


export type MutationIncrementInventoryByInventoryIdArgs = {
  quantity: Scalars['Float'];
  name: Scalars['String'];
  inventoryId: Scalars['String'];
};


export type MutationDecrementInventoryByInventoryIdArgs = {
  quantity: Scalars['Float'];
  name: Scalars['String'];
  inventoryId: Scalars['String'];
};


export type MutationAdjustItemQyantityArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};


export type MutationAdjustItemSizeArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  size: Scalars['String'];
};


export type MutationRemoveItemFromCartArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
};


export type MutationCreateCartWithItemArgs = {
  quantity: Scalars['String'];
  itemId: Scalars['String'];
};


export type MutationAddToCartArgs = {
  quantity?: Maybe<Scalars['Float']>;
  size: Scalars['String'];
  itemId: Scalars['String'];
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

export type NameWithImageInput = {
  name: Scalars['String'];
  image: Scalars['String'];
};

export type InventoryInput = {
  available: Array<AvailableInput>;
  price: Scalars['Int'];
  discount?: Maybe<Scalars['Int']>;
};

export type AvailableInput = {
  name: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

export type DescriptionInput = {
  details: Scalars['String'];
  size: Scalars['String'];
  fit: Scalars['String'];
  materials: Scalars['String'];
  care: Scalars['String'];
  specifications?: Maybe<Array<SpecificationsInput>>;
  extra?: Maybe<Scalars['String']>;
};

export type SpecificationsInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

/** add or remove item form wishlist */
export enum AddOrRemove {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type AddItemMutationVariables = Exact<{
  name: Scalars['String'];
  brand: Scalars['String'];
  category: NameWithImageInput;
  subCategory: NameWithImageInput;
  images: Array<Scalars['String']> | Scalars['String'];
  description: DescriptionInput;
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

export type AddToCartMutationVariables = Exact<{
  itemId: Scalars['String'];
  quantity: Scalars['Float'];
  size: Scalars['String'];
}>;


export type AddToCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToCart'>
);

export type AdjustItemQyantityMutationVariables = Exact<{
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
}>;


export type AdjustItemQyantityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'adjustItemQyantity'>
);

export type AdjustItemSizeMutationVariables = Exact<{
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  size: Scalars['String'];
}>;


export type AdjustItemSizeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'adjustItemSize'>
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

export type AllSubCategoriesWithItemQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSubCategoriesWithItemQuery = (
  { __typename?: 'Query' }
  & { allSubCategoriesWithItem: Array<(
    { __typename?: 'SubCatWithItemIdsResponse' }
    & Pick<SubCatWithItemIdsResponse, 'subCategory' | 'itemIds'>
  )> }
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

export type GetAllItemsByIdsQueryVariables = Exact<{
  itemIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetAllItemsByIdsQuery = (
  { __typename?: 'Query' }
  & { getAllItemsByIds: Array<(
    { __typename?: 'ItemArrayElement' }
    & Pick<ItemArrayElement, 'itemId' | 'url' | 'name' | 'brand' | 'price'>
  )> }
);

export type GetAllItemIdsBySubCategoryWithFilterQueryVariables = Exact<{
  subCategory: Scalars['String'];
  filterOptions: FilterOptions;
}>;


export type GetAllItemIdsBySubCategoryWithFilterQuery = (
  { __typename?: 'Query' }
  & { getAllItemIdsBySubCategoryWithFilter: (
    { __typename?: 'ItemIdsResponse' }
    & Pick<ItemIdsResponse, 'itemIds' | 'count'>
  ) }
);

export type GetCartDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartDetailsQuery = (
  { __typename?: 'Query' }
  & { getCartDetails: (
    { __typename?: 'CartResponse' }
    & Pick<CartResponse, 'cartId' | 'count'>
    & { items: Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, 'itemId' | 'size' | 'quantity' | 'price' | 'discount'>
    )> }
  ) }
);

export type GetItemDetailsQueryVariables = Exact<{
  itemId: Scalars['String'];
}>;


export type GetItemDetailsQuery = (
  { __typename?: 'Query' }
  & { getItemDetails: (
    { __typename?: 'ItemDetailsResponse' }
    & Pick<ItemDetailsResponse, 'itemId' | 'name' | 'brand' | 'isStared' | 'category' | 'subCategory' | 'images'>
    & { inventory: (
      { __typename?: 'inentory' }
      & Pick<Inentory, 'inventoryId' | 'discount' | 'price'>
      & { available: Array<(
        { __typename?: 'availableObject' }
        & Pick<AvailableObject, 'name' | 'quantity'>
      )> }
    ), description: (
      { __typename?: 'DescriptionObject' }
      & Pick<DescriptionObject, 'details' | 'size' | 'fit' | 'materials' | 'care' | 'extra'>
      & { specifications?: Maybe<Array<(
        { __typename?: 'SpecificationsObject' }
        & Pick<SpecificationsObject, 'key' | 'value'>
      )>> }
    ) }
  ) }
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
      & Pick<Inentory, 'inventoryId' | 'price' | 'discount'>
    ) }
  ) }
);

export type GetItemDetailsForCartQueryVariables = Exact<{
  itemId: Scalars['String'];
}>;


export type GetItemDetailsForCartQuery = (
  { __typename?: 'Query' }
  & { getItemDetails: (
    { __typename?: 'ItemDetailsResponse' }
    & Pick<ItemDetailsResponse, 'itemId' | 'name' | 'brand' | 'isStared' | 'images'>
    & { inventory: (
      { __typename?: 'inentory' }
      & Pick<Inentory, 'inventoryId' | 'discount' | 'price'>
      & { available: Array<(
        { __typename?: 'availableObject' }
        & Pick<AvailableObject, 'name' | 'quantity'>
      )> }
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

export type RemoveItemFromCartMutationVariables = Exact<{
  cartId: Scalars['String'];
  itemId: Scalars['String'];
}>;


export type RemoveItemFromCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeItemFromCart'>
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
    mutation addItem($name: String!, $brand: String!, $category: NameWithImageInput!, $subCategory: NameWithImageInput!, $images: [String!]!, $description: DescriptionInput!, $inventoryInfo: inventoryInput!) {
  addItem(
    name: $name
    brand: $brand
    categoryInfo: $category
    subCategoryInfo: $subCategory
    images: $images
    description: $description
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
 *      name: // value for 'name'
 *      brand: // value for 'brand'
 *      category: // value for 'category'
 *      subCategory: // value for 'subCategory'
 *      images: // value for 'images'
 *      description: // value for 'description'
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
export const AddToCartDocument = gql`
    mutation AddToCart($itemId: String!, $quantity: Float!, $size: String!) {
  addToCart(itemId: $itemId, quantity: $quantity, size: $size)
}
    `;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      quantity: // value for 'quantity'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, baseOptions);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const AdjustItemQyantityDocument = gql`
    mutation AdjustItemQyantity($cartId: String!, $itemId: String!, $quantity: Int) {
  adjustItemQyantity(cartId: $cartId, itemId: $itemId, quantity: $quantity)
}
    `;
export type AdjustItemQyantityMutationFn = Apollo.MutationFunction<AdjustItemQyantityMutation, AdjustItemQyantityMutationVariables>;

/**
 * __useAdjustItemQyantityMutation__
 *
 * To run a mutation, you first call `useAdjustItemQyantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdjustItemQyantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adjustItemQyantityMutation, { data, loading, error }] = useAdjustItemQyantityMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      itemId: // value for 'itemId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAdjustItemQyantityMutation(baseOptions?: Apollo.MutationHookOptions<AdjustItemQyantityMutation, AdjustItemQyantityMutationVariables>) {
        return Apollo.useMutation<AdjustItemQyantityMutation, AdjustItemQyantityMutationVariables>(AdjustItemQyantityDocument, baseOptions);
      }
export type AdjustItemQyantityMutationHookResult = ReturnType<typeof useAdjustItemQyantityMutation>;
export type AdjustItemQyantityMutationResult = Apollo.MutationResult<AdjustItemQyantityMutation>;
export type AdjustItemQyantityMutationOptions = Apollo.BaseMutationOptions<AdjustItemQyantityMutation, AdjustItemQyantityMutationVariables>;
export const AdjustItemSizeDocument = gql`
    mutation AdjustItemSize($cartId: String!, $itemId: String!, $size: String!) {
  adjustItemSize(cartId: $cartId, itemId: $itemId, size: $size)
}
    `;
export type AdjustItemSizeMutationFn = Apollo.MutationFunction<AdjustItemSizeMutation, AdjustItemSizeMutationVariables>;

/**
 * __useAdjustItemSizeMutation__
 *
 * To run a mutation, you first call `useAdjustItemSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdjustItemSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adjustItemSizeMutation, { data, loading, error }] = useAdjustItemSizeMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      itemId: // value for 'itemId'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useAdjustItemSizeMutation(baseOptions?: Apollo.MutationHookOptions<AdjustItemSizeMutation, AdjustItemSizeMutationVariables>) {
        return Apollo.useMutation<AdjustItemSizeMutation, AdjustItemSizeMutationVariables>(AdjustItemSizeDocument, baseOptions);
      }
export type AdjustItemSizeMutationHookResult = ReturnType<typeof useAdjustItemSizeMutation>;
export type AdjustItemSizeMutationResult = Apollo.MutationResult<AdjustItemSizeMutation>;
export type AdjustItemSizeMutationOptions = Apollo.BaseMutationOptions<AdjustItemSizeMutation, AdjustItemSizeMutationVariables>;
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
export const AllSubCategoriesWithItemDocument = gql`
    query AllSubCategoriesWithItem {
  allSubCategoriesWithItem {
    subCategory
    itemIds
  }
}
    `;

/**
 * __useAllSubCategoriesWithItemQuery__
 *
 * To run a query within a React component, call `useAllSubCategoriesWithItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSubCategoriesWithItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSubCategoriesWithItemQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSubCategoriesWithItemQuery(baseOptions?: Apollo.QueryHookOptions<AllSubCategoriesWithItemQuery, AllSubCategoriesWithItemQueryVariables>) {
        return Apollo.useQuery<AllSubCategoriesWithItemQuery, AllSubCategoriesWithItemQueryVariables>(AllSubCategoriesWithItemDocument, baseOptions);
      }
export function useAllSubCategoriesWithItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSubCategoriesWithItemQuery, AllSubCategoriesWithItemQueryVariables>) {
          return Apollo.useLazyQuery<AllSubCategoriesWithItemQuery, AllSubCategoriesWithItemQueryVariables>(AllSubCategoriesWithItemDocument, baseOptions);
        }
export type AllSubCategoriesWithItemQueryHookResult = ReturnType<typeof useAllSubCategoriesWithItemQuery>;
export type AllSubCategoriesWithItemLazyQueryHookResult = ReturnType<typeof useAllSubCategoriesWithItemLazyQuery>;
export type AllSubCategoriesWithItemQueryResult = Apollo.QueryResult<AllSubCategoriesWithItemQuery, AllSubCategoriesWithItemQueryVariables>;
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
export const GetAllItemsByIdsDocument = gql`
    query GetAllItemsByIds($itemIds: [String!]!) {
  getAllItemsByIds(itemIds: $itemIds) {
    itemId
    url
    name
    brand
    price
  }
}
    `;

/**
 * __useGetAllItemsByIdsQuery__
 *
 * To run a query within a React component, call `useGetAllItemsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllItemsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllItemsByIdsQuery({
 *   variables: {
 *      itemIds: // value for 'itemIds'
 *   },
 * });
 */
export function useGetAllItemsByIdsQuery(baseOptions: Apollo.QueryHookOptions<GetAllItemsByIdsQuery, GetAllItemsByIdsQueryVariables>) {
        return Apollo.useQuery<GetAllItemsByIdsQuery, GetAllItemsByIdsQueryVariables>(GetAllItemsByIdsDocument, baseOptions);
      }
export function useGetAllItemsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllItemsByIdsQuery, GetAllItemsByIdsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllItemsByIdsQuery, GetAllItemsByIdsQueryVariables>(GetAllItemsByIdsDocument, baseOptions);
        }
export type GetAllItemsByIdsQueryHookResult = ReturnType<typeof useGetAllItemsByIdsQuery>;
export type GetAllItemsByIdsLazyQueryHookResult = ReturnType<typeof useGetAllItemsByIdsLazyQuery>;
export type GetAllItemsByIdsQueryResult = Apollo.QueryResult<GetAllItemsByIdsQuery, GetAllItemsByIdsQueryVariables>;
export const GetAllItemIdsBySubCategoryWithFilterDocument = gql`
    query GetAllItemIdsBySubCategoryWithFilter($subCategory: String!, $filterOptions: FilterOptions!) {
  getAllItemIdsBySubCategoryWithFilter(
    subCategory: $subCategory
    filterOptions: $filterOptions
  ) {
    itemIds
    count
  }
}
    `;

/**
 * __useGetAllItemIdsBySubCategoryWithFilterQuery__
 *
 * To run a query within a React component, call `useGetAllItemIdsBySubCategoryWithFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllItemIdsBySubCategoryWithFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllItemIdsBySubCategoryWithFilterQuery({
 *   variables: {
 *      subCategory: // value for 'subCategory'
 *      filterOptions: // value for 'filterOptions'
 *   },
 * });
 */
export function useGetAllItemIdsBySubCategoryWithFilterQuery(baseOptions: Apollo.QueryHookOptions<GetAllItemIdsBySubCategoryWithFilterQuery, GetAllItemIdsBySubCategoryWithFilterQueryVariables>) {
        return Apollo.useQuery<GetAllItemIdsBySubCategoryWithFilterQuery, GetAllItemIdsBySubCategoryWithFilterQueryVariables>(GetAllItemIdsBySubCategoryWithFilterDocument, baseOptions);
      }
export function useGetAllItemIdsBySubCategoryWithFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllItemIdsBySubCategoryWithFilterQuery, GetAllItemIdsBySubCategoryWithFilterQueryVariables>) {
          return Apollo.useLazyQuery<GetAllItemIdsBySubCategoryWithFilterQuery, GetAllItemIdsBySubCategoryWithFilterQueryVariables>(GetAllItemIdsBySubCategoryWithFilterDocument, baseOptions);
        }
export type GetAllItemIdsBySubCategoryWithFilterQueryHookResult = ReturnType<typeof useGetAllItemIdsBySubCategoryWithFilterQuery>;
export type GetAllItemIdsBySubCategoryWithFilterLazyQueryHookResult = ReturnType<typeof useGetAllItemIdsBySubCategoryWithFilterLazyQuery>;
export type GetAllItemIdsBySubCategoryWithFilterQueryResult = Apollo.QueryResult<GetAllItemIdsBySubCategoryWithFilterQuery, GetAllItemIdsBySubCategoryWithFilterQueryVariables>;
export const GetCartDetailsDocument = gql`
    query GetCartDetails {
  getCartDetails {
    cartId
    items {
      itemId
      size
      quantity
      price
      discount
    }
    count
  }
}
    `;

/**
 * __useGetCartDetailsQuery__
 *
 * To run a query within a React component, call `useGetCartDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetCartDetailsQuery, GetCartDetailsQueryVariables>) {
        return Apollo.useQuery<GetCartDetailsQuery, GetCartDetailsQueryVariables>(GetCartDetailsDocument, baseOptions);
      }
export function useGetCartDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartDetailsQuery, GetCartDetailsQueryVariables>) {
          return Apollo.useLazyQuery<GetCartDetailsQuery, GetCartDetailsQueryVariables>(GetCartDetailsDocument, baseOptions);
        }
export type GetCartDetailsQueryHookResult = ReturnType<typeof useGetCartDetailsQuery>;
export type GetCartDetailsLazyQueryHookResult = ReturnType<typeof useGetCartDetailsLazyQuery>;
export type GetCartDetailsQueryResult = Apollo.QueryResult<GetCartDetailsQuery, GetCartDetailsQueryVariables>;
export const GetItemDetailsDocument = gql`
    query GetItemDetails($itemId: String!) {
  getItemDetails(itemId: $itemId) {
    itemId
    name
    brand
    isStared
    category
    subCategory
    inventory {
      inventoryId
      available {
        name
        quantity
      }
      discount
      price
    }
    images
    description {
      details
      size
      fit
      materials
      care
      extra
      specifications {
        key
        value
      }
    }
  }
}
    `;

/**
 * __useGetItemDetailsQuery__
 *
 * To run a query within a React component, call `useGetItemDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemDetailsQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useGetItemDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetItemDetailsQuery, GetItemDetailsQueryVariables>) {
        return Apollo.useQuery<GetItemDetailsQuery, GetItemDetailsQueryVariables>(GetItemDetailsDocument, baseOptions);
      }
export function useGetItemDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemDetailsQuery, GetItemDetailsQueryVariables>) {
          return Apollo.useLazyQuery<GetItemDetailsQuery, GetItemDetailsQueryVariables>(GetItemDetailsDocument, baseOptions);
        }
export type GetItemDetailsQueryHookResult = ReturnType<typeof useGetItemDetailsQuery>;
export type GetItemDetailsLazyQueryHookResult = ReturnType<typeof useGetItemDetailsLazyQuery>;
export type GetItemDetailsQueryResult = Apollo.QueryResult<GetItemDetailsQuery, GetItemDetailsQueryVariables>;
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
export const GetItemDetailsForCartDocument = gql`
    query GetItemDetailsForCart($itemId: String!) {
  getItemDetails(itemId: $itemId) {
    itemId
    name
    brand
    isStared
    inventory {
      inventoryId
      available {
        name
        quantity
      }
      discount
      price
    }
    images
  }
}
    `;

/**
 * __useGetItemDetailsForCartQuery__
 *
 * To run a query within a React component, call `useGetItemDetailsForCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemDetailsForCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemDetailsForCartQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useGetItemDetailsForCartQuery(baseOptions: Apollo.QueryHookOptions<GetItemDetailsForCartQuery, GetItemDetailsForCartQueryVariables>) {
        return Apollo.useQuery<GetItemDetailsForCartQuery, GetItemDetailsForCartQueryVariables>(GetItemDetailsForCartDocument, baseOptions);
      }
export function useGetItemDetailsForCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemDetailsForCartQuery, GetItemDetailsForCartQueryVariables>) {
          return Apollo.useLazyQuery<GetItemDetailsForCartQuery, GetItemDetailsForCartQueryVariables>(GetItemDetailsForCartDocument, baseOptions);
        }
export type GetItemDetailsForCartQueryHookResult = ReturnType<typeof useGetItemDetailsForCartQuery>;
export type GetItemDetailsForCartLazyQueryHookResult = ReturnType<typeof useGetItemDetailsForCartLazyQuery>;
export type GetItemDetailsForCartQueryResult = Apollo.QueryResult<GetItemDetailsForCartQuery, GetItemDetailsForCartQueryVariables>;
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
export const RemoveItemFromCartDocument = gql`
    mutation RemoveItemFromCart($cartId: String!, $itemId: String!) {
  removeItemFromCart(cartId: $cartId, itemId: $itemId)
}
    `;
export type RemoveItemFromCartMutationFn = Apollo.MutationFunction<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;

/**
 * __useRemoveItemFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveItemFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeItemFromCartMutation, { data, loading, error }] = useRemoveItemFromCartMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useRemoveItemFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>) {
        return Apollo.useMutation<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>(RemoveItemFromCartDocument, baseOptions);
      }
export type RemoveItemFromCartMutationHookResult = ReturnType<typeof useRemoveItemFromCartMutation>;
export type RemoveItemFromCartMutationResult = Apollo.MutationResult<RemoveItemFromCartMutation>;
export type RemoveItemFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;
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