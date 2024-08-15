import { Brackets } from "typeorm";
import { Login } from "../../../../database/auth/login";
import { Recording } from "../../../../database/recording/recording";
import { createWhereExpression, GraphQLContext } from "../../../utility/graphql";
import { validSearchFields } from "../../../../types/searchFields";

// get all getRecording
export const getRecording = async (
    _: any,
    { search }: { search: string },
    { userId }: GraphQLContext
  ) => {
    const recordingQuery = await Recording.createQueryBuilder("recording")
      .innerJoin(Login, "login", "login.id = recording.userId")
      .where({userId});
    // for searching
    if (search) {
      const brackets = new Brackets((sqb) => {
        validSearchFields.map((field, idx) => {
          const { searchString, params } = createWhereExpression(field, search);
          sqb.orWhere(searchString, params);
        });
      });
      recordingQuery.andWhere(brackets);
    }
  
    const [recordings, totalCount] = await recordingQuery
      .orderBy("recording.createdAt", "DESC")
      .getManyAndCount();
    const recordingNodes = recordings.map(recording => {
      return {
        node: recording,
        cursor: recording.id,
      };
    });
  
    return {
      totalCount,
      edges: recordingNodes,
    };
  };

  // get single record by id
  export const getRecordingById = async (
    _: any,
    { id }: { id: string }
  ) => {
    const recording = await Recording.createQueryBuilder()
      .where("id = :id", { id })
      .getOne();
    return recording;
  };
  