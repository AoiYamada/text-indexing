import { EsClient } from "../../elasticsearch/client";
import docIndex from "../../elasticsearch/indices/doc";
import docMappings from "../../elasticsearch/indices/doc/mappings";
import logger from "../../logger";
import omit from "../../utils/omit";

class EsDocRepository {
  private client: EsClient;
  private index: string;

  constructor(client: EsClient, index: string) {
    this.client = client;
    this.index = index;
  }

  async init() {
    const isIndexExists = await this.client.indices.exists({
      index: this.index,
    });

    if (isIndexExists) {
      logger.info(`Index[${this.index}] exists`);
      return;
    }

    logger.info(`Creating Index[${this.index}]...`);

    await this.client.indices.create({
      index: this.index,
      settings: docIndex,
      mappings: docMappings,
    });

    logger.info(`Index[${this.index}] created`);
  }

  // not work when analyzer conflict
  async sync() {
    logger.info(`Syncing Index[${this.index}] settings...`);

    // Order matters, don't use Promise.all
    await this.client.indices.close({
      index: this.index,
    });

    await this.client.indices.putSettings({
      index: this.index,
      settings: omit(["number_of_shards", "number_of_replicas"], docIndex),
    });

    await this.client.indices.putMapping({
      index: this.index,
      ...docMappings,
    });

    await this.client.indices.open({
      index: this.index,
    });

    logger.info(`Index[${this.index}] synced`);
  }

  async create(document: EsDoc) {
    return this.client.index({
      id: esDocToId(document),
      index: this.index,
      document: esDocToData(document),
    });
  }

  async update(
    document: (Partial<EsDoc> | { sentence: string }) & Pick<EsDoc, "doc_id">
  ) {
    return this.client.update({
      id: esDocToId(document),
      index: this.index,
      ...((document as { sentence: string }).sentence
        ? {
            // script for specific update logic
            script: {
              source: "ctx._source.sentences.add(params.sentence)",
              lang: "painless",
              params: {
                sentence: {
                  content: (document as { sentence: string }).sentence,
                },
              },
            },
          }
        : {
            // doc for partial update
            // https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html
            doc: esDocToData(document),
          }),
    });
  }

  async search(
    query: string
    // pagination: PaginationQueryDto = new PaginationQueryDto(),
    // sort: SortQueryDto = new SortQueryDto()
  ) {
    const { hits } = await this.client.search<EsDoc>({
      index: this.index,
      _source: {
        excludes: ["sentences"],
      },
      query: {
        nested: {
          path: "sentences",
          score_mode: "max",
          query: {
            match: {
              "sentences.content": query,
            },
          },
          inner_hits: {
            _source: {
              includes: ["sentences.content"],
            },
            size: 5,
            highlight: {
              fields: {
                "sentences.content": {
                  // Only want the best match part
                  // https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-request-body.html#highlighting-settings
                  fragment_size: 500,
                  no_match_size: 200,
                  number_of_fragments: 1,
                },
              },
            },
          },
        },
      },
      // ...sort.toQuery(),
      // ...pagination.toQuery(),
    });
    const items = hits.hits
      .filter((hit) => hit._source !== null)
      .map((hit) => {
        const innerHits = hit.inner_hits?.sentences?.hits?.hits;
        let sentences: string[] = [];

        if (innerHits !== undefined) {
          sentences = innerHits
            .map(
              ({
                // _source,
                highlight,
              }): string[] | null =>
                highlight?.["sentences"] ? highlight["sentences"] : null
            )
            .filter((item) => item !== null)
            .flat();
        }

        const item: EsDoc = {
          doc_id: hit._source!.doc_id,
          doc_type: hit._source!.doc_type,
          sentences,
        };

        return item;
      });

    const hitsTotal = hits.total;
    let total;

    if (typeof hitsTotal === "object") {
      total = hitsTotal.value;
    } else {
      total = hitsTotal ?? 0;
    }

    return {
      items,
      total,
    };
  }

  async delete(document: Pick<EsDoc, "doc_id">) {
    await this.client.delete({
      id: esDocToId(document),
      index: this.index,
    });
  }
}

export default EsDocRepository;

function esDocToId(doc: Pick<EsDoc, "doc_id">) {
  return `${doc.doc_id}`;
}

function esDocToData<T extends Partial<EsDoc>>(doc: T): Partial<EsDocData> {
  const data: Partial<EsDocData> = {};

  if (doc.doc_id !== undefined) {
    data.doc_id = doc.doc_id;
  }

  if (doc.doc_type !== undefined) {
    data.doc_type = doc.doc_type;
  }

  if (doc.sentences !== undefined) {
    data.sentences = doc.sentences.map((sentence) => ({ content: sentence }));
  }

  return data;
}

// this is the data structure for view
type EsDoc = {
  doc_id: number;
  doc_type: string;
  sentences: string[];
};

// this is the data structure in elasticsearch
type EsDocData = {
  doc_id: number;
  doc_type: string;
  sentences: {
    content: string;
  }[];
};
