import { enums } from "./enums/enums";
import { inputTypes } from "./inputs";
import { Recording } from "./recording";
import { root } from "./root";
import { User } from "./user";
import { connections } from "./connection/connections";
import { edges } from "./edge/edges";
export const typeDefs = [...inputTypes, connections, edges, enums, root, User, Recording];
