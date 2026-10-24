// All network logic lives here: no component imports fetch directly.
const BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 20;

export class NotFoundError extends Error { }

const imageUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const extractId = (url) => Number(url.split('/').filter(Boolean).pop());

async function request(path) {
    // CONCEPTO: fetch + async/await. Un fallo en la red provoca que fetch lance una excepción.
    const response = await fetch(`${BASE_URL}${path}`);
    // CONCEPTO: comprobar response.ok ANTES de response.json() (un 404 devuelve texto plano)
    if (response.status === 404) throw new NotFoundError();
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export async function getPokemonPage(offset) {
    const data = await request(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
    return {
        hasMore: data.next !== null,
        results: data.results.map((item) => {
            const id = extractId(item.url);
            return { id, name: item.name, image: imageUrl(id) };
        }),
    };
}

export async function getPokemonByQuery(query) {
  const data = await request(`/pokemon/${encodeURIComponent(query)}`);
  return { id: data.id, name: data.name, image: imageUrl(data.id) };
}

