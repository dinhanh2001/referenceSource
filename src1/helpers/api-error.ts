import { ApolloError } from '@apollo/client';
import { showMessage } from 'react-native-flash-message';

export const extractGraphQLErrorMessage = (errors: ApolloError) => {
  let message = 'Lỗi không xác định';

  console.log('errors: ', { ...errors });

  if ((errors as any)?.[0]?.message) {
    message = (errors as any)?.[0]?.message;
  } else {
    const { graphQLErrors } = errors;
    if (graphQLErrors.length > 0) {
      if (graphQLErrors[0].extensions?.errorMessage || graphQLErrors[0].extensions?.response) {
        message =
          (graphQLErrors[0].extensions?.errorMessage as string) ??
          (graphQLErrors[0].extensions?.response as any)?.message?.[0];
      } else {
        const errorKeys = Object.keys(graphQLErrors[0].extensions);

        const formFieldErrorKey = errorKeys.find((it) => it !== 'code' && it !== 'exception' && it !== 'statusCode');

        if (formFieldErrorKey != null) {
          message = Object.values(graphQLErrors[0].extensions[formFieldErrorKey] as any)?.[0] as string;
        } else if (graphQLErrors[0].message) {
          message = graphQLErrors[0].message;
        } else {
          const data = (graphQLErrors[0].extensions?.exception as any)[
            Object.keys(graphQLErrors[0].extensions?.exception as any)[0]
          ];

          message = Object.values(data)?.[0] as string;
        }
      }
    }
  }

  return message?.replace('Error: ', '');
};

export const showFlashMessageError = (errors: ApolloError) => {
  const message = extractGraphQLErrorMessage(errors);

  showMessage({
    message,
    type: 'danger',
  });
};
