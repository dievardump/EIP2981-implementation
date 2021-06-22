// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy('ERC721WithRoyalties', {
        from: deployer,
        args: ['ERC721WithRoyalties', '2981'],
        log: true,
    });
};
module.exports.tags = ['ERC721WithRoyalties'];
