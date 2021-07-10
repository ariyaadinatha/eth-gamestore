const GameStore = artifacts.require("./GameStore.sol");

module.exports = function (deployer) {
  deployer.deploy(GameStore);
};
