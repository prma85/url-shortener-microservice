class Util {
  convertToBoolean(value: string): boolean {
    const textValue = (value || 'false').toLowerCase();

    return textValue === 'true';
  }

  removeUndefinedProps(model: any) {
    const keys = Object.keys(model);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof model[key] === 'undefined') {
        delete model[key];
      }
    }

    return model;
  }

  prepareTopics(topics: Array<{ topic: string; enable: string }> = []): string {
    const result: Array<string> = [];
    for (const item of topics) {
      if (this.convertToBoolean(item.enable)) {
        result.push(item.topic);
      }
    }

    return result.join(',');
  }
}

const util = new Util();
export default util;
