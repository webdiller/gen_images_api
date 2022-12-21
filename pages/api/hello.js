const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function userHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ id, name: `User ${Date.now()}` });
      break;
    case "POST":
      const { prompt, n, size } = req.body;
      try {
        const imageParameters = {
          prompt: "dog",
          n: 1,
          size: "256x256",
        };
        const response = await openai.createImage(imageParameters);
        const urlData = response.data.data[0].url;
        console.log(`-----------------${urlData}-----------------------------`);
        res.status(200).json({ urlData });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
