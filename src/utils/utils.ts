export namespace Utils {
  export const isNullOrEmpty = (value: string): boolean => {
    return !value || value.trim().length < 1;
  };

  export const removeProperties = (obj: any, props: string[] = ['id']) => {
    return Object.entries(obj).reduce((o, [key, value]) => {
      return props.includes(key) ? o : { ...o, [key]: value };
    }, {});
  };

  export const validateStringValues = (obj: any, props: string[]): string[] => {
    return props.reduce((errors: string[], prop: string) => {
      if (Utils.isNullOrEmpty(obj[prop])) {
        return [...errors, prop];
      }
      return errors;
    }, []);
  };
}
