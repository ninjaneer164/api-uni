export namespace Utils {
  export const removeProperties = (obj: any, props: string[] = ['id']) => {
    return Object.entries(obj).reduce((o, [key, value]) => {
      return props.includes(key) ? o : { ...o, [key]: value };
    }, {});
  };
}
