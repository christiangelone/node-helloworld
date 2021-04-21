import Docs from "../../../lib/docs";

class HealthDocs extends Docs {

  constructor(){
    super()
  }

  'get /api/health'() {
    return {
      tags: ['health'],
      summary: 'Returns the health status of the API',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'DOWN'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export const Doc = HealthDocs;