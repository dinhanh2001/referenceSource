import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  w100: {
    width: '100%',
  },
  posAbsolute: {
    position: 'absolute',
    zIndex: 90,
  },
  bo8: {
    borderRadius: 8,
  },

  selected: {
    backgroundColor: '#FFAFAF',
  },

  divider: {
    borderStyle: 'dashed',
    borderColor: Colors.greyEE,
    borderWidth: 1,
  },
  boxShadow: {
    shadowOpacity: 0.35,
    shadowRadius: 48,
  },
  btnDetail: {
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStatus: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyEE,
  },
  backIconRecent: {
    width: 47,
    height: 47,
    backgroundColor: Colors.white,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerRecent: {
    paddingTop: 24,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRecent: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
export default styles;
