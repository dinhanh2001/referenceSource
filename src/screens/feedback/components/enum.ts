import { ServiceFeedbackTypeEnum, ServiceFeedbacksStatusEnum } from '../../../graphql/type.interface';

export const convertServiceFeedbackTypeEnum = (type: ServiceFeedbackTypeEnum) => {
  switch (type) {
    case ServiceFeedbackTypeEnum.COMPLAIN:
      return 'Phàn nàn';
    case ServiceFeedbackTypeEnum.SUPPORT:
      return 'Yêu cầu hỗ trợ';
    default:
      return 'Thắc mắc';
  }
};

export const convertServiceFeedbacksStatusEnum = (status: ServiceFeedbacksStatusEnum) => {
  switch (status) {
    case ServiceFeedbacksStatusEnum.DONE:
      return 'Đã xử lý';
    case ServiceFeedbacksStatusEnum.IN_PROGRESS:
      return 'Đang xử lý';
    default:
      return 'Chờ xử lý';
  }
};
