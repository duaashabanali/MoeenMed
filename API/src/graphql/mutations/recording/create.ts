import { Recording } from "../../../database/recording/recording";
import { RecordingInput } from "../../../types/user";
import { generateSoap, generateSummary } from "../../utility/commonMethod";
import { GraphQLContext } from "../../utility/graphql";

// save recording
export const createRecording = async (
    _: null,
     {input}: {input: RecordingInput},
    { userId }: GraphQLContext
  ) => {
    const summary=await generateSummary(input.transcription)
    const soap = await generateSoap(summary)
    const recording  = await Recording.createQueryBuilder()
      .insert()
      .values({...input,summary,soap, userId})
      .output("*")
      .execute()
      .then((response) => {
        if (!Array.isArray(response.raw) || response.raw.length === 0) {
          throw new Error("Failed to save recording");
        }
        return response.raw[0];
      });

    return recording;
  };
  