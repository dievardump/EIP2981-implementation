// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy('ERC1155WithRoyalties', {
        from: deployer,
        args: ['ipfs://baseURI'],
        log: true,
    });
};
module.exports.tags = ['ERC1155WithRoyalties'];
