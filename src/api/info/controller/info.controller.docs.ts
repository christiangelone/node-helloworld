import Docs from "../../../lib/docs";

class InfoDocs extends Docs {

  constructor(){
    super()
  }

  'get /api/info'() {
    return {
      tags: ['info'],
      summary: 'Return the health status of the API',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  version: {
                    type: 'string',
                    example: '0.0.0'
                  },
                  author: {
                    type: 'string',
                    example: 'John Doe'
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

export const Doc = InfoDocs;