import { Ok, Result, Err } from 'oxide.ts';
import { NftEntity } from '../entities/nft.entities';
import { CollectionProviderPort } from '../ports/collection.provider.port';

export class FindMatchingNFT {
  constructor(private readonly collectionProvider: CollectionProviderPort) {}
  async execute(props: { itemId }): Promise<Result<NftEntity[], Error>> {
    if (!props.itemId) return Err(new Error('you must provide an NFT item id'));

    return Ok(await this.collectionProvider.fetchCollection());
  }
}
