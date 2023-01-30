import {ElasticMappingInterface} from "./elastic.interface";
import {elastic} from "@config/elastic.config";
import {Client} from "@elastic/elasticsearch";


export abstract class AbstractElasticsearch {

    constructor(private client: Client = elastic) {
    }

    abstract indexName: string

    abstract mapping(): ElasticMappingInterface

    abstract analyzer(): object | null

    abstract filter(): object | null

    abstract extraSettings(): object | null

    private getIndexObject() {
        return {
            index: this.indexName,
            settings: {
                ...this.getIndexSetting(),
                ...this.extraSettings()
            },
            mappings: {
                properties: this.getMappingProperties()
            }
        }
    }

    private getIndexSetting() {
        const map = new Map<string, object>();
        if (typeof this.analyzer() === 'object') {
            map.set('analysis', this.analyzer()!)
        }
        if (typeof this.filter === 'object') {
            map.set('filter', this.filter()!);
        }
        return Object.fromEntries(map);
    }

    private getMappingProperties() {
        const map = new Map<string, string | {}>();

        this.mapping().properties.map((property) => {
            const {name, type} = property;
            if (!map.has(name)) map.set(name, {type: type})
        })

        return Object.fromEntries(map);
    }

    async createIndex() {
        return await this.client.indices.create(this.getIndexObject())
    }

    async create(document: object) {
        return await this.client.index({
            index: this.indexName,
            refresh: true,
            document: document
        })
    }

    async update(id: string, document: object) {
        return await this.client.index({
            index: this.indexName,
            refresh: true,
            id: id,
            document: document
        })
    }

    async delete(id: string): Promise<boolean> {
        let status = true;
        await this.client.delete({index: this.indexName, id: id, refresh: true})
            .catch((err) => {
                status = false
            })
        return status;
    }


    async findById(id: string): Promise<unknown | null> {
        const document = await this.client.search({
            index: this.indexName,
            query: {
                match: {
                    _id: id
                }
            }
        })

        const data = document.hits.hits;
        return data.length > 0 ? data[0]._source : null
    }

    async query(queryParams: object, options?: object): Promise<Array<{ count: number, totalCount: number, data: Array<any> }>> {
        const documents = await this.client.search({
            index: this.indexName,
            query: queryParams,
            ...options
        })

        return [
            {
                count: documents.hits.hits.length,
                totalCount: this.getTotalCount(documents.hits.total),
                data: documents.hits.hits
            }
        ]
    }

    private getTotalCount(data: any): number {
        let total;
        if (typeof data === 'object') {
            total = data.value
        } else if (typeof data.total === 'number') {
            total = data.total
        } else {
            total = 0
        }
        return total;
    }
}


