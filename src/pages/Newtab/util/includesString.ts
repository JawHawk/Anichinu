function includesString(mainString: string, includedString: string): boolean {
    const mainWords = mainString.toLowerCase().split(' ');
    const includedWords = includedString.toLowerCase().split(' ');
    return includedWords.some(word => mainWords.includes(word));
}
export default includesString