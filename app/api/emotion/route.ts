import { HfInference, TextClassificationOutput } from "@huggingface/inference";

let hf: HfInference;

export async function POST(req: Request, res: Response) {
    const { input } = await req.json();
    const inferenceResponse: TextClassificationOutput = await runInference(
      input
    );
    //console.log(inferenceResponse);
    const filteredResponse = filterResponse([...inferenceResponse])
  return new Response(JSON.stringify({inferenceResponse, filteredResponse}), {status: 200});
}

async function runInference(input: string) {
    if(!hf){
        hf = new HfInference(process.env.HF_API_KEY);
    }

    const modelName = 'SamLowe/roberta-base-go_emotions';
    const inferenceRes = await hf.textClassification({
        model: modelName,
        inputs: input
    })
    return inferenceRes;
}

function filterResponse(emotions: TextClassificationOutput){
    //loop over the emotions
    const filtered = []
    const emotion0 = emotions.shift();
    filtered.push(emotion0);
    let score = emotion0?.score;
    for (let emotion of emotions){
        if(emotion.score > score!){
            filtered.push(emotion);
            score = emotion.score;
        }
    }
    return filtered;
}
