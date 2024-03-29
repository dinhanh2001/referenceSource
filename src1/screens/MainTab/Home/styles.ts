import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    borderWidth: 0.2,
    borderColor: Colors.main,
    width: '100%',
    shadowColor: Colors.blackShadow02,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bgHead: {
    backgroundColor: Colors.white,
  },
  boxDriver: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
  },
  boxLogo: {
    width: 65,
    height: 65,
  },
  badget: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    top: -7,
    right: 7,
  },
  mr17: { marginRight: 17 },
  centItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  endItemvh: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  rowItem: {
    flexDirection: 'row',
  },
  spaceArroundItem: {
    justifyContent: 'space-around',
  },
  w100: {
    width: '100%',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  bgStatus: {
    backgroundColor: Colors.statusColor,
  },
  image: {
    height: 52,
    width: 52,
    borderRadius: 31,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: Colors.white,
  },
});
