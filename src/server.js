import "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`PayFlow server running on port ${PORT}`);
});
