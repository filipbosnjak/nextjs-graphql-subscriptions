import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.ts",
  documents: "client-ops/*.ts",
  require: ["ts-node/register"],
  generates: {
    "src/gql/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    }
  }
};

export default config;
