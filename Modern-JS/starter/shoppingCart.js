console.log('Exporting Module');

export const cart = [];
export default function (product, quantity) {
    cart.push({ product, quantity });
}