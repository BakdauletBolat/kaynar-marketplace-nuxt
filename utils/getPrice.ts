export function getPrice(price: number | null) {
    if (price == 0) {
        return 'Цена по запросу';
    }
    return `${price} ₸`;
}