import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type DocumentPropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.DOCUMENT_SCREEN>;
export type DocumentListPropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.DOCUMENT_LIST_SCREEN>;
export type DocumentDetailPropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.DOCUMENT_DETAIL_SCREEN>;

export type DocumentScreenNavigationProps = DocumentPropsType['navigation'];
export type DocumentScreenRouteProps = DocumentPropsType['route'];

export type DocumentListScreenNavigationProps = DocumentListPropsType['navigation'];
export type DocumentListScreenRouteProps = DocumentListPropsType['route'];

export type DocumentDetailScreenNavigationProps = DocumentDetailPropsType['navigation'];
export type DocumentDetailScreenRouteProps = DocumentDetailPropsType['route'];
