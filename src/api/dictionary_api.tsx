async function getWordDefinition(word: string) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    return data;
}

function parseWordDefinition(wordDefinition: any) {
    const firstDefinition = wordDefinition[0].meanings[0].definitions[0].definition;
    return firstDefinition;
}

export { getWordDefinition, parseWordDefinition };