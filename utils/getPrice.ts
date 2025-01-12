export function getPrice(price: number | null) {
    if (price == 0) {
        return 'Цену уточняйте';
    }
    return `${price} ₸`;
}