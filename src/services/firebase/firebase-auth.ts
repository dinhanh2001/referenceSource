// import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { useMutation, UseMutationOptions } from 'react-query';

// import { FIREBASE_ACCESS_TOKEN } from '../../constants';
// import { FirebaseError } from '../types';

// export type PhoneNumberLoginConfirmationMutationResponse = FirebaseAuthTypes.ConfirmationResult;
// export type PhoneNumberLoginConfirmationMutationVariables = {
//   phone: string;
// };
// export const usePhoneNumberLoginConfirmationMutation = (
//   options?: UseMutationOptions<
//     PhoneNumberLoginConfirmationMutationResponse,
//     FirebaseError,
//     PhoneNumberLoginConfirmationMutationVariables
//   >,
// ) => {
//   return useMutation((payload) => auth().signInWithPhoneNumber(payload.phone), options);
// };

// export type PhoneNumberLoginConfirmCodeMutationResponse = FirebaseAuthTypes.UserCredential | null;
// export type PhoneNumberLoginConfirmCodeMutationVariables = {
//   code: string;
//   confirm: FirebaseAuthTypes.ConfirmationResult;
// };
// export const usePhoneNumberLoginConfirmCodeMutation = (
//   options?: UseMutationOptions<
//     PhoneNumberLoginConfirmCodeMutationResponse,
//     FirebaseError,
//     PhoneNumberLoginConfirmCodeMutationVariables
//   >,
// ) => {
//   return useMutation(({ confirm, code }) => confirm.confirm(code), options);
// };

// export type GetFirebaseIdTokenMutationResponse = string;
// export type GetFirebaseIdTokenMutationVariable = boolean | undefined;
// export const useGetFirebaseIdTokenMutation = (
//   options?: UseMutationOptions<string, unknown, GetFirebaseIdTokenMutationVariable>,
// ) => {
//   return useMutation(async (forceRefresh) => {
//     const { currentUser } = auth();

//     if (!currentUser) {
//       throw new Error('Unauthorized');
//     }

//     const token = await currentUser.getIdToken(forceRefresh);
//     if (token) {
//       AsyncStorage.setItem(FIREBASE_ACCESS_TOKEN, token);
//     }

//     return token;
//   }, options);
// };

// export const useFirebaseLogoutMutation = (options?: UseMutationOptions) => {
//   return useMutation(() => auth().signOut(), options);
// };
