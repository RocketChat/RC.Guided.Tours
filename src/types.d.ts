export type ITours = {
    $schema: 'https://aka.ms/codetour-schema',
    title: string,
    description?: string,
    ref?: string,
    isPrimary?: boolean,
    nextTour?: string,
    when?: string,
    steps: ISteps[]
}

export type ISteps = {
    description: string,
    file?: string,
    directory?: string,
    uri?: string,
    line?: number,
    pattern?: string,
    title: string,
    commands?: string[],
    view?: string,
    searchString?: string,
    offset?: number
}