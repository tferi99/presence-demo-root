module.exports = {
  name: 'presence-search-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/presence-search-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
