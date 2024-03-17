import { RouteProp } from '@react-navigation/native';

import { ServiceFeedbacksStatusEnum } from '../../graphql/type.interface';

export type FeedbackTabScreenParam = {
  status: ServiceFeedbacksStatusEnum | undefined;
  refetchBadges?(): Promise<any>;
};

export type FeedbackTabParamList = {
  'feedback/all': FeedbackTabScreenParam;
  'feedback/waiting': FeedbackTabScreenParam;
  'feedback/inprogress': FeedbackTabScreenParam;
  'feedback/done': FeedbackTabScreenParam;
};

export type FeedbackTabRouteProp = RouteProp<FeedbackTabParamList, 'feedback/all'>;
