export class ElasticAnalyzerInterface {
    analyzer: string | {}
    type?: string
    tokenizer?: string
    filter?: Array<{ name: string }>
}

export class ElasticMappingInterface {
        properties : Array<{
            name: string,
            type : string,
            properties?: {},
            analyzer?: string,
            search_analyzer?: string,
            search_quote_analyzer?: string
        }>
}

