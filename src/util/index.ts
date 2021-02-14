export const getHeaderText = (pathname: string): string => {
    const pathSnippets = pathname.split('/').filter(i => i);
    if (pathSnippets.length === 0) {
        return "Fashion"
    }
    let headerText: string = pathSnippets.splice(-1, 1).toString();
    if (headerText === 'default') {
        return "Items"
    }
    return headerText
}