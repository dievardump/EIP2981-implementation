const { expect } = require('chai');
const { deployments, ethers } = require('hardhat');

describe('ERC1155WithRoyalties', () => {
    let ERC1155WithRoyalties;
    let deployer;
    let randomAccount;
    let royaltiesRecipient;

    const ADDRESS_ZERO = ethers.constants.AddressZero;

    beforeEach(async () => {
        [deployer, randomAccount, royaltiesRecipient] =
            await ethers.getSigners();

        await deployments.fixture();
        ERC1155WithRoyalties = await deployments.get('ERC1155WithRoyalties');
        erc1155WithRoyalties = await ethers.getContractAt(
            'ERC1155WithRoyalties',
            ERC1155WithRoyalties.address,
            deployer,
        );
    });

    describe('Royalties', async () => {
        it('throws if royalties more than 100%', async function () {
            const tx = erc1155WithRoyalties.mint(
                deployer.address,
                0,
                10,
                royaltiesRecipient.address,
                10001, // 100.01%
            );

            await expect(tx).to.be.revertedWith('ERC2981Royalties: Too high');
        });

        it('has the right royalties for tokenId', async function () {
            await erc1155WithRoyalties.mint(
                deployer.address,
                0,
                10,
                royaltiesRecipient.address,
                1000, // 10%
            );

            const info = await erc1155WithRoyalties.royaltyInfo(0, 100);
            expect(info[1].toNumber()).to.be.equal(10);
            expect(info[0]).to.be.equal(royaltiesRecipient.address);
        });

        it('can set address(0) as royalties recipient', async function () {
            await erc1155WithRoyalties.mint(
                deployer.address,
                0,
                10,
                ADDRESS_ZERO,
                1000,
            );

            const info = await erc1155WithRoyalties.royaltyInfo(0, 100);
            expect(info[1].toNumber()).to.be.equal(10);
            expect(info[0]).to.be.equal(ADDRESS_ZERO);
        });

        it('has no royalties if not set', async function () {
            await erc1155WithRoyalties.mint(
                deployer.address,
                0,
                10,
                royaltiesRecipient.address,
                0,
            );

            const info = await erc1155WithRoyalties.royaltyInfo(0, 100);
            expect(info[1].toNumber()).to.be.equal(0);
            expect(info[0]).to.be.equal(ADDRESS_ZERO);
        });

        it('each token has the right royalties when minting batch', async function () {
            const ids = [0, 1, 2, 3];
            const amounts = [10, 10, 10, 10];
            const royaltyRecipients = [
                randomAccount.address,
                deployer.address,
                ADDRESS_ZERO,
                deployer.address,
            ];
            const royaltyValues = [1000, 800, 5000, 0];

            await erc1155WithRoyalties.mintBatch(
                deployer.address,
                ids,
                amounts,
                royaltyRecipients,
                royaltyValues,
            );

            for (const [index, id] of ids.entries()) {
                const info = await erc1155WithRoyalties.royaltyInfo(id, 100);

                expect(info[1].toNumber()).to.be.equal(
                    royaltyValues[index] / 100,
                );
                if (info[1].toNumber() !== 0) {
                    expect(info[0]).to.be.equal(royaltyRecipients[index]);
                }
            }
        });
    });
});
