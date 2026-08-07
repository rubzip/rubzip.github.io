import { getCollection, type CollectionKey } from 'astro:content';

/**
 * Safely fetches a content collection without throwing errors if the collection is empty or uninitialized.
 */
export async function safeGetCollection<C extends CollectionKey>(collection: C): Promise<any[]> {
    try {
        return await getCollection(collection);
    } catch (error) {
        return [];
    }
}
