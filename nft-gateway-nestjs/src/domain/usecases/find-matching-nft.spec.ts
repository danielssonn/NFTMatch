import { NftEntity } from '../entities/nft.entities';
import { InMemoryCollectionProvider } from '../stubs/inmemory-collection.provider';
import { FindMatchingNFT } from './find-matching-nft';
import * as boredApesClubCollection from '../stubs/bored-apes-collection.json';

describe('FindMatchingNFT', () => {
  it('should be defined', () => expect(FindMatchingNFT).toBeDefined());
  it('should return an error if not called with an itemId argument', async () => {
    const inMemoryProviderCollection = new InMemoryCollectionProvider([]);
    const findMatchingNFT = new FindMatchingNFT(inMemoryProviderCollection);
    const res = await findMatchingNFT.execute({ itemId: null });

    expect(res.isErr).toBeTruthy();
    expect(res.unwrapErr()).toStrictEqual(
      new Error('you must provide an NFT item id'),
    );
  });
  it('should return the bored apes list with 10 000 NFT', async () => {
    const itemId = '1';
    const boredApesClubCollectionEntities = (boredApesClubCollection as []).map(
      ({ id }) => NftEntity.create({ itemId: id }),
    );
    const inMemoryProviderCollection = new InMemoryCollectionProvider(
      boredApesClubCollectionEntities,
    );
    const findMatchingNFT = new FindMatchingNFT(inMemoryProviderCollection);
    const res = await findMatchingNFT.execute({ itemId });

    expect(res.isOk).toBeTruthy();
    expect(res.unwrap()).toHaveLength(10000);
  });
});
