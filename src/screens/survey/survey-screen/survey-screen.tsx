import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, QuestionSurvey, tw } from '../../../components';
import { useOverlay } from '../../../contexts';
import { usePartnerSubmitSurveyMutation } from '../../../graphql/mutations/partnerSubmitSurvey.generated';
import { usePartnerGetSurveyQuery } from '../../../graphql/queries/partnerGetSurvey.generated';
import { AnswerType, QuestionEntity, SurveyResult } from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { useRefreshByUser } from '../../../hooks';
import { Sent } from '../../../svg';

import { SurveyNavigationProps, SurveyRouteProps } from './type';

export const SurveyScreen = () => {
  const { showDialog } = useOverlay();
  const navigation = useNavigation<SurveyNavigationProps>();
  const {
    params: { surveyId },
  } = useRoute<SurveyRouteProps>();

  const { data, loading, refetch } = usePartnerGetSurveyQuery({ variables: { id: surveyId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const [submitSurvey, { loading: loadingSubmit }] = usePartnerSubmitSurveyMutation({
    onError: showFlashMessageError,
    onCompleted: async () => {
      await refetch();
      const res = await showDialog({
        icon: <Sent />,
        title: 'Chia sẻ phản hồi thành công!',
        message:
          'Mọi sự đóng góp của bạn đều đáng quý, CALL ME xin ghi nhận và làm tốt hơn trong thời gian tới. Xin trân trọng cảm ơn!',
        type: 'ALERT',
        confirmText: 'Đóng',
      });
      if (res) {
        navigation.goBack();
      }
    },
  });

  const [form, setForm] = useState<any>();
  const { partnerIsSubmitSurvey, partnerResultSurvey, questions } = data?.partnerGetSurvey || {};
  const resultSurvey = useMemo(() => {
    if (partnerResultSurvey?.results) {
      return partnerResultSurvey?.results?.reduce((acc: any, cur: SurveyResult) => {
        const type = questions?.find?.((item) => item?.id === cur?.questionId)?.answerType;

        return {
          ...acc,
          [cur?.questionId]: (type === AnswerType.CHECKBOX ? cur?.answer : cur?.answer?.[0]) || '',
        };
      }, {});
    }
    return {};
  }, [partnerResultSurvey?.results, questions]);

  const inValid = useMemo(() => {
    if (!form) {
      return true;
    }
    return questions?.some?.((item) => {
      const value = form?.[item?.id];
      if (!item?.isRequired) {
        return false;
      }

      if (item?.answerType === AnswerType.CHECKBOX) {
        return !value?.length;
      }
      return !value;
    });
  }, [questions, form]);

  useEffect(() => {
    if (!!questions?.length && !form) {
      setForm(
        questions?.reduce((acc: any, cur: QuestionEntity) => {
          acc[cur.id] = cur.answerType === AnswerType.CHECKBOX ? [] : '';
          return acc;
        }, {}),
      );
    }
  }, [questions, form]);

  const onChangeForm = useCallback(
    (id: string) => (val: string | string[]) => {
      setForm((prev: any) => ({ ...prev, [id]: val }));
    },
    [],
  );

  const onSubmit = useCallback(() => {
    const results = Object.keys(form).map((questionId: string) => ({
      questionId,
      answer: typeof form[questionId] === 'string' ? [form[questionId]] : form[questionId],
    }));

    submitSurvey({
      variables: {
        input: {
          surveyId,
          results,
        },
      },
    });
  }, [form, submitSurvey, surveyId]);

  const renderQuestions = useCallback(
    (item: QuestionEntity, index: number) => {
      return (
        <QuestionSurvey
          key={item?.id}
          item={item}
          index={index + 1}
          value={partnerIsSubmitSurvey ? resultSurvey?.[item?.id] : form?.[item?.id]}
          disabled={partnerIsSubmitSurvey}
          onChange={onChangeForm(item?.id)}
        />
      );
    },
    [form, onChangeForm, partnerIsSubmitSurvey, resultSurvey],
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title={data?.partnerGetSurvey?.name} numberOfLines={1} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        {data?.partnerGetSurvey?.questions?.map?.(renderQuestions)}
      </ScrollView>
      <Button
        title={'Gửi kết quả'}
        containerStyle={tw`mx-4 mt-2 mb-4`}
        onPress={onSubmit}
        disabled={inValid || partnerIsSubmitSurvey}
        loading={loadingSubmit}
      />
    </SafeAreaView>
  );
};
