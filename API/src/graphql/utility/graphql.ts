
export interface GraphQLContext {
    userId: string;
    email: string;
  }
  
  export const DEFAULT_CACHE_2H = 1000 * 60 * 60 * 2;

  interface WhereExpressionType {
    searchString: string;
    params: { searchText: string };
  }
  // Creates a where expression for a SQL query with case-insensitive matching. 
  export const createWhereExpression = (
    fieldName: string,
    search: string|number
  ): WhereExpressionType => {
    return {
      searchString: `${fieldName} ILIKE :searchText`,
      params: {
        searchText: `%${search}%`,
      },
    };
  };
  