import R from 'ramda';
import YAML from 'json2yaml';

export default class Docs {

  isMeta: boolean = false;

  constructor(isMeta = false){
    this.isMeta = isMeta;
  }

  private getDefinitions() {
    const prototype = Object.getPrototypeOf(this);
    const definitions = Object.getOwnPropertyNames(prototype)
    return definitions.filter(def => {
      return def !== 'constructor'
    });
  }
  
  private buildSpecs(definitions){
    const specsDefinitions = definitions.map(def => [
      def.split(' ')[1],
      { [def.split(' ')[0]]: this[def]() }
    ]);
    const groupedBySpecs = R.groupBy(s => s[0])(specsDefinitions);
    const specs = R.mapObjIndexed((value, key) => {
      return value.map(spec => spec[1]).reduce((s1, s2) => ({ ...s1, ...s2 }));
    }, groupedBySpecs);
    return specs;
  }
  
  private buildMeta(metas){
    return metas.map(meta => {
      return this[meta]()
    }).reduce((m1, m2) => ({ ...m1, ...m2 }));
  }

  getRepr(){
    const definitions = this.getDefinitions()
    return this.isMeta
      ? this.buildMeta(definitions)
      : this.buildSpecs(definitions);
  }

  static toJson(reprs){
    return JSON.stringify(reprs, null, 2)
  }

  static toYaml(reprs){
    return YAML.stringify(reprs, 4);
  }
}