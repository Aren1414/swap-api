export default async function handler(req, res) {
  const { sellToken, buyToken, sellAmount } = req.query;

  const url = `https://monad.api.0x.org/swap/v2/quote?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote." });
  }
}
