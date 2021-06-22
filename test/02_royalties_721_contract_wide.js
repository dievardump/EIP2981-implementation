const { expect } = require('chai');
const { deployments, ethers } = require('hardhat');

describe('ERC721WithContractWideRoyalties', () => {
    let ERC721WithContractWideRoyalties;
    let deployer;
    let royaltiesRecipient;

    const ADDRESS_ZERO = ethers.constants.AddressZero;

    beforeEach(async () => {
        [deployer, randomAccount, royaltiesRecipient] =
            await ethers.getSigners();

        await deployments.fixture();
        ERC721WithContractWideRoyalties = await deployments.get(
            'ERC721WithContractWideRoyalties',
        );
        erc721WithRoyalties = await ethers.getContractAt(
            'ERC721WithContractWideRoyalties',
            ERC721WithContractWideRoyalties.address,
            deployer,
        );
    });

    describe('Contract wide Royalties', async () => {
        it('has no royalties if not set', async function () {
            await erc721WithRoyalties.mint(deployer.address);

            const info = await erc721WithRoyalties.royaltyInfo(0, 100);
            expect(info[1].toNumber()).to.be.equal(0);
            expect(info[0]).to.be.equal(ADDRESS_ZERO);
        });

        it('throws if royalties more than 100%', async function () {
            const tx = erc721WithRoyalties.setRoyalties(
                royaltiesRecipient.address,
                10001,
            );
            await expect(tx).to.be.revertedWith('ERC2981Royalties: Too high');
        });

        it('has the right royalties for tokenId', async function () {
            await erc721WithRoyalties.setRoyalties(
                royaltiesRecipient.address,
                250,
            );

            await erc721WithRoyalties.mint(deployer.address);

            const info = await erc721WithRoyalties.royaltyInfo(0, 10000);
            expect(info[1].toNumber()).to.be.equal(250);
            expect(info[0]).to.be.equal(royaltiesRecipient.address);
        });

        it('can set address(0) as royalties recipient', async function () {
            await erc721WithRoyalties.setRoyalties(ADDRESS_ZERO, 5000);

            await erc721WithRoyalties.mint(deployer.address);

            const info = await erc721WithRoyalties.royaltyInfo(0, 10000);
            expect(info[1].toNumber()).to.be.equal(5000);
            expect(info[0]).to.be.equal(ADDRESS_ZERO);
        });
    });
});
