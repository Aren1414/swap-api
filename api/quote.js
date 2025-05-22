export default async function handler(request, response) {
  const { sellToken, buyToken, amount } = request.query;

  const apiKey = process.env.ZEROX_API_KEY;

  const url = `https://api.0x.org/v2/swap?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${amount}`;

  try {
    const res = await fetch(url, {
      headers: {
        '0x-api-key': apiKey
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      return response.status(res.status).json(errorData);
    }

    const data = await res.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
