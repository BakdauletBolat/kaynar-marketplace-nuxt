export function getPrice(price: number | null) {
    if (price === null || price === 0 || !Number.isFinite(price)) {
        return 'Цена по запросу';
    }
    return `${new Intl.NumberFormat('ru-RU').format(price)} ₸`;
}
