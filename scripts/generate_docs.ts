import path from 'path';
import fs from 'fs';
import Docs from '../src/lib/docs';

const findFilesWithExtension = (dir, extension, fileList: string[] = []) => {
  const files = fs.readdirSync(dir);
  for(const file of files) {
    if (fs.statSync(dir + '/' + file).isDirectory())
      fileList = findFilesWithExtension(dir + '/' + file, extension, fileList);
    else if (new RegExp(`${extension}$`).test(file))
      fileList.push(`${dir}/${file}`);
  }
  return fileList;
};

const getDocs = (docFiles: string[]) => {
  return docFiles.map((docFile: string) => {
    return import(docFile).then(doc => new doc.Doc())
  })
}

const docsDestination = path.resolve('src/api/docs');
const yamlFile = 'swagger.yaml';

const docFiles = findFilesWithExtension(path.resolve('src/api'), '.docs.ts');
Promise.all(getDocs(docFiles)).then(docs => {
  
  const metaDocsReprs = docs.filter(doc => doc.isMeta)
                            .map(doc => doc.getRepr())
                            .reduce((r1, r2) => ({ ...r1, ...r2 }));

  const specDocsReprs = docs.filter(doc => !doc.isMeta)
                            .map(doc => doc.getRepr())
                            .reduce((r1, r2) => ({ ...r1, ...r2 }));

  const docObj = { ...metaDocsReprs, ...{ paths: specDocsReprs } }

  if (!fs.existsSync(docsDestination)){
    fs.mkdirSync(docsDestination);
  }

  fs.writeFile(
    `${docsDestination}/${yamlFile}`,
    Docs.toYaml(docObj),
    (err) => { if(err) throw err }
  );
});