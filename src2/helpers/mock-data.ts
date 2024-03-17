import { FileType, OperatingUnitEnum } from '../graphql/type.interface';

export const vehicle_mock = {
  id: '1',
  name: 'Máy xúc đào bánh xích XCMG gầu 0.3 m3 Model: XE75D Máy xúc đào bánh xích XCMG gầu 0.3 m3 Model: XE75D...',
  avatar: {
    createdAt: 'dsad',
    id: 'dsd',
    isDeleted: false,
    name: 'dd',
    originalUrl: 'dsd',
    type: FileType.IMAGE,
    updatedAt: 'dasd',
    fullOriginalUrl:
      'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwY2FyfGVufDB8fDB8fHww&w=1000&q=80',
  },
  vehicleRegistrationPlate: '29gv-23232',
  ordinalNumber: 12,
  vinNumber: 'XCMG',
  yearOfManufacture: 2016,
  createdAt: 'abcd',
  latitude: 12,
  longitude: 12,
  operatingNumber: 12,
  operatingUnit: OperatingUnitEnum.HOURS,
  updatedAt: 'abc',
  userId: '1',
  hidden: true,
};

export const MY_REPAIR_DATA = {
  type_issues: ['Ắc quy', 'Phanh', 'Nhiên liệu', 'xxx', 'yyy', 'ZZ'],
  attachedFiles: [
    {
      type: FileType.VIDEO,
      uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    { type: FileType.IMAGE, uri: 'https://assets.entrepreneur.com/content/3x2/2000/1661888151-DAL500017.jpg' },
    { type: FileType.IMAGE, uri: 'https://assets.entrepreneur.com/content/3x2/2000/1661888151-DAL500017.jpg' },
    { type: FileType.IMAGE, uri: 'https://assets.entrepreneur.com/content/3x2/2000/1661888151-DAL500017.jpg' },
    { type: FileType.IMAGE, uri: 'https://assets.entrepreneur.com/content/3x2/2000/1661888151-DAL500017.jpg' },
    { type: FileType.IMAGE, uri: 'https://assets.entrepreneur.com/content/3x2/2000/1661888151-DAL500017.jpg' },
    { type: FileType.IMAGE, uri: 'https://assets.entrepreneur.com/content/3x2/2000/1661888151-DAL500017.jpg' },
    {
      type: FileType.IMAGE,
      uri: 'https://www.cnet.com/a/img/resize/50e11858414030f7ace1dd3d92f7d24e5f4c5ce8/hub/2023/01/17/91eb6502-7246-430f-aa5f-e99f7cdea3ac/rs-2024-chevrolet-corvette-e-ray-3lz-006.jpg?auto=webp&fit=crop&height=620&width=620',
    },
    { type: FileType.VIDEO, uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
    { uri: 'https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg' },
  ],
};
