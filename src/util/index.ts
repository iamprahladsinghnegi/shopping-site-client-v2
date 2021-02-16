export const getHeaderText = (pathname: string): string => {
    const pathSnippets = pathname.split('/').filter(i => i);
    if (pathSnippets.length === 0) {
        return "Fashion"
    }
    let headerText: string = pathSnippets.splice(-1, 1).toString();
    if (headerText.startsWith('0x')) {
        headerText = headerText.split('$')[1].split(' ')[0]
    }
    if (headerText === 'default') {
        return "Items"
    }
    return headerText
}