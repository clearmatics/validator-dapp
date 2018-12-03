const glienicke = artifacts.require("Glienicke");

module.exports = async (deployer) => {
  try {
      deployer.deploy(glienicke)
      .then(() => glienicke.deployed)
  } catch(err) {
    console.log('ERROR on deploy:',err);
  }
};
