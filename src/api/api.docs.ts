import Docs from "../lib/docs";

class ApiDocs extends Docs {

  serverUrl: string = process.env.API_PROTOCOL && process.env.API_HOST && process.env.API_PORT
  ? `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`
  : 'http://localhost:3000'

  tags: object[] = [
    { name: 'info', description: `Main info about API` },
    { name: 'health', description: `Everything about API's health` }
  ];

  constructor(){
    super(true)
  }

  doc() {
    return {
      openapi: '3.0.0',
      info: {
        title: process.env.API_NAME || 'no_title',
        description: process.env.API_DESCRIPTION || 'no_description',
        version: process.env.API_VERSION || 'no_version'
      },
      servers: [
        { url: this.serverUrl }
      ],
      tags: this.tags
    };
  }
}

export const Doc = ApiDocs;