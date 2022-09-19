module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "mDitor",
        mac: {
          target: "dmg",
          icon: "assets/icon_512.png",
        },
        win: {
          target: "nsis",
          icon: "assets/icon.png",
        },
      },
    },
  },
};
