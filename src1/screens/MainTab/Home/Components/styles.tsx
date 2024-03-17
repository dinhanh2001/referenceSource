import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  categoryImage: {
    width: '80%',
    height: '80%',
  },
  allImage: {
    width: 28,
    height: 28,
    tintColor: Colors.main,
  },
  flex025: {
    flex: 1 / 4,
  },
  positionAb: {
    // position: 'absolute',
  },
  itemMenu: {
    backgroundColor: Colors.white,
    shadowColor: Colors.blackShadow04,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});
export default styles;
