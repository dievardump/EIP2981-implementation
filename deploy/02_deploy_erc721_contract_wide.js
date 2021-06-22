// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy('ERC721WithContractWideRoyalties', {
        from: deployer,
        args: ['ERC721WithContractWideRoyalties', '2981'],
        log: true,
    });
};
module.exports.tags = ['ERC721WithContractWideRoyalties'];
