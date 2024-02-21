import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY);

export async function POST(req: Request, res: Response) {
    const { input } = await req.json();
  return new Response("dummy response, {status: 200}");
}
