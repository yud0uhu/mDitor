module.exports = {
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "yud0uhu",
          name: "mDitor",
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
